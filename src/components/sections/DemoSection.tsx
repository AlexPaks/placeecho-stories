import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { MapPin, Pause, Play, RotateCcw, Volume2, VolumeX, Wand2, Sparkles } from 'lucide-react';

import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCurrentPosition } from '@/hooks/use-current-position';
import { generateStory, generateTts } from '@/lib/api';
import { getGenerateErrorMessage } from '@/lib/api-errors';
import { FromGpsResponse, GenerateStoryRequest, GenerateStoryResponse, GenerateTtsResponse } from '@/lib/api-types';
import { APP_CONFIG } from '@/lib/config';
import { normalizeLocationLabel } from '@/lib/location';

const lengthMap: Record<string, string> = {
  Short: 'short',
  Medium: 'medium',
  Long: 'long',
};

const storyLanguageMap: Record<string, string> = {
  English: 'en',
  Hebrew: 'he',
  Russian: 'ru',
};

const ttsLanguageMap: Record<string, string> = {
  en: 'en-US',
  he: 'he-IL',
  ru: 'ru-RU',
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) {
    return '0:00';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
};

type StoryMutationResult = {
  storyResponse: GenerateStoryResponse;
  ttsResponse: GenerateTtsResponse | null;
  ttsError: string | null;
};

const buildGpsDerivedContext = (gpsContext: FromGpsResponse | null) => {
  const placeName = gpsContext?.placeName?.trim();

  if (!placeName) {
    return undefined;
  }

  return {
    place_name: placeName,
    ...(gpsContext?.city ? { city: gpsContext.city } : {}),
    ...(gpsContext?.country ? { country: gpsContext.country } : {}),
    ...(gpsContext?.poi ? { poi: gpsContext.poi } : {}),
    ...(gpsContext?.rawAddress ? { raw_address: gpsContext.rawAddress } : {}),
    ...(gpsContext?.placeKind ? { place_kind: gpsContext.placeKind } : {}),
    ...(gpsContext?.streetName ? { street_name: gpsContext.streetName } : {}),
    ...(gpsContext?.streetNumber ? { street_number: gpsContext.streetNumber } : {}),
    ...(gpsContext?.neighborhood ? { neighborhood: gpsContext.neighborhood } : {}),
    ...(gpsContext?.region ? { region: gpsContext.region } : {}),
    ...(typeof gpsContext?.confidence === 'number' ? { confidence: gpsContext.confidence } : {}),
    ...(gpsContext?.source ? { source: gpsContext.source } : {}),
  };
};

export const DemoSection: React.FC = () => {
  const { t, language: siteLanguage } = useLanguage();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [locationInput, setLocationInput] = useState('');
  const [locationSource, setLocationSource] = useState<'manual' | 'gps'>('manual');
  const [length, setLength] = useState(t.demo.lengths[0]);
  const [style, setStyle] = useState(t.demo.styles[0]);
  const [language, setLanguage] = useState(t.demo.languages[0]);
  const [storyResult, setStoryResult] = useState<GenerateStoryResponse['story'] | null>(null);
  const [storyLocationLabel, setStoryLocationLabel] = useState('');
  const [storyError, setStoryError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [gpsContext, setGpsContext] = useState<FromGpsResponse | null>(null);

  const {
    coords: gpsCoords,
    resolvedLabel: gpsResolvedLabel,
    resolvedContext,
    isLocating,
    locationError,
    requestLocation,
  } = useCurrentPosition(siteLanguage);

  const storyMutation = useMutation({
    mutationFn: async (payload: GenerateStoryRequest): Promise<StoryMutationResult> => {
      const storyResponse = await generateStory(payload);
      let ttsResponse: GenerateTtsResponse | null = null;
      let ttsError: string | null = null;

      try {
        ttsResponse = await generateTts({
          text: storyResponse.story.text,
          language: ttsLanguageMap[storyResponse.story.language] ?? 'en-US',
          voiceProfile: APP_CONFIG.tts.voiceProfile,
          format: APP_CONFIG.tts.format,
          provider: APP_CONFIG.tts.provider,
          voice_enabled: APP_CONFIG.storyDefaults.voiceEnabled,
          voice_speed: APP_CONFIG.storyDefaults.voiceSpeed,
          voice_type: APP_CONFIG.storyDefaults.voiceType,
          voice_style: APP_CONFIG.storyDefaults.voiceStyle,
          voice_pitch: APP_CONFIG.storyDefaults.voicePitch,
          narration_emotion: APP_CONFIG.storyDefaults.narrationEmotion,
        });
      } catch (_error) {
        ttsError = 'Audio is unavailable right now, but your story is ready.';
      }

      return {
        storyResponse,
        ttsResponse,
        ttsError,
      };
    },
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    audio.muted = false;
    setIsPlaying(false);
    setIsMuted(false);
    setCurrentTime(0);
    setDuration(0);
  }, [audioUrl]);

  const handleLocationChange = (value: string) => {
    setLocationInput(value);
    if (gpsCoords) {
      setLocationSource('manual');
    }
  };

  const handleUseMyLocation = async () => {
    try {
      const { resolvedLabel, resolvedContext } = await requestLocation();
      setLocationInput(resolvedLabel);
      setLocationSource('gps');
      setGpsContext(resolvedContext);
      setStoryError(null);
    } catch (_error) {
      setLocationSource('manual');
    }
  };

  const handleGenerate = async () => {
    const trimmedLocation = locationInput.trim();
    const canGenerate = trimmedLocation || gpsCoords;

    if (!canGenerate) {
      return;
    }

    const storyLanguage = storyLanguageMap[language] ?? 'en';
    const gpsContextMatch =
      !!gpsContext &&
      !!trimmedLocation &&
      normalizeLocationLabel(trimmedLocation) === normalizeLocationLabel(gpsResolvedLabel ?? '');
    const manualOnly =
      !!trimmedLocation &&
      (!gpsContext || normalizeLocationLabel(trimmedLocation) !== normalizeLocationLabel(gpsResolvedLabel ?? ''));
    const gpsOnlyFallback = !trimmedLocation && !!gpsCoords;
    const gpsDerivedContext = gpsContextMatch ? buildGpsDerivedContext(gpsContext) : undefined;

    const payload: GenerateStoryRequest = {
      preferences: {
        length: lengthMap[length] ?? 'short',
        style: APP_CONFIG.storyDefaults.style,
        type: APP_CONFIG.storyDefaults.type,
        perspective: APP_CONFIG.storyDefaults.perspective,
        realism: APP_CONFIG.storyDefaults.realism,
        story_language: storyLanguage,
        system_language: storyLanguage,
        poi: [],
        voice_enabled: APP_CONFIG.storyDefaults.voiceEnabled,
        voice_speed: APP_CONFIG.storyDefaults.voiceSpeed,
        voice_type: APP_CONFIG.storyDefaults.voiceType,
        voice_style: APP_CONFIG.storyDefaults.voiceStyle,
        voice_pitch: APP_CONFIG.storyDefaults.voicePitch,
        narration_emotion: APP_CONFIG.storyDefaults.narrationEmotion,
        autoPlayStoryAudio: APP_CONFIG.storyDefaults.autoPlayStoryAudio,
        downloadAudioAfterGeneration: APP_CONFIG.storyDefaults.downloadAudioAfterGeneration,
      },
      user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      another_story: false,
    };

    if (manualOnly) {
      payload.context = {
        place_name: trimmedLocation,
      };
    } else if (gpsContextMatch && gpsDerivedContext) {
      payload.context = gpsDerivedContext;
      if (gpsCoords) {
        payload.gps = gpsCoords;
      }
    } else if (gpsOnlyFallback && gpsCoords) {
      payload.gps = gpsCoords;
    }

    setStoryResult(null);
    setStoryError(null);
    setStoryLocationLabel('');
    setAudioUrl(null);
    setAudioError(null);

    try {
      const { storyResponse, ttsResponse, ttsError } = await storyMutation.mutateAsync(payload);

      setStoryResult(storyResponse.story);
      setStoryLocationLabel(storyResponse.context?.placeName ?? trimmedLocation);
      setAudioUrl(ttsResponse?.audioUrl ?? storyResponse.story.audio_url ?? null);
      setAudioError(ttsResponse?.audioUrl || storyResponse.story.audio_url ? ttsError : ttsError ?? 'Audio is unavailable right now.');
    } catch (error) {
      setStoryError(getGenerateErrorMessage(error));
    }
  };

  const handleToggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio || !audioUrl) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (_error) {
        setAudioError('Audio playback is unavailable right now.');
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const handleReplayAudio = async () => {
    const audio = audioRef.current;

    if (!audio || !audioUrl) {
      return;
    }

    audio.currentTime = 0;
    setCurrentTime(0);

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (_error) {
      setAudioError('Audio playback is unavailable right now.');
    }
  };

  const handleMuteToggle = () => {
    const audio = audioRef.current;

    if (!audio || !audioUrl) {
      return;
    }

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const progressWidth = duration > 0 ? `${(currentTime / duration) * 100}%` : '0%';
  const canGenerate = !!locationInput.trim() || !!gpsCoords;
  const hasManualLocationOverride =
    !!locationInput.trim() &&
    !!gpsCoords &&
    normalizeLocationLabel(locationInput.trim()) !== normalizeLocationLabel(gpsResolvedLabel ?? '');

  return (
    <section id="demo" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-primary/5" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Wand2 className="w-4 h-4" />
            <span>Try It Now</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.demo.title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  Location
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Input
                      value={locationInput}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      placeholder={t.demo.locationPlaceholder}
                      className="h-12 rounded-xl pl-4 pr-4 bg-muted/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleUseMyLocation}
                    disabled={isLocating}
                    className="h-12 whitespace-nowrap rounded-xl border-secondary/50 text-secondary hover:bg-secondary/10"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {isLocating ? 'Locating...' : t.demo.useMyLocation}
                  </Button>
                </div>
                {locationError && <p className="text-sm text-destructive">{locationError}</p>}
                {gpsCoords && (
                  <p className="text-xs text-muted-foreground">
                    {hasManualLocationOverride
                      ? 'GPS is active, but your edited location name will be used to generate the story.'
                      : locationSource === 'gps' && resolvedContext
                        ? 'GPS active. Story will use coordinates and backend-resolved location context.'
                        : 'GPS active. Story will use coordinates only.'}
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">{t.demo.lengthLabel}</label>
                  <div className="flex gap-1 p-1 bg-muted/50 rounded-xl">
                    {t.demo.lengths.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLength(l)}
                        className={`flex-1 py-2.5 px-3 text-sm rounded-lg transition-all duration-300 font-medium ${
                          length === l ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">{t.demo.styleLabel}</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl border border-border/50 bg-muted/50 text-foreground text-sm font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    {t.demo.styles.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">{t.demo.languageLabel}</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl border border-border/50 bg-muted/50 text-foreground text-sm font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    {t.demo.languages.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!canGenerate || storyMutation.isPending}
                className="w-full h-14 btn-brand-glow rounded-xl text-base font-semibold"
                size="lg"
              >
                {storyMutation.isPending ? (
                  <span className="flex items-center gap-3">
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating your story...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {t.demo.generateButton}
                  </span>
                )}
              </Button>
            </div>

            {(storyResult || storyError) && (
              <div className="p-6 md:p-8 space-y-6 bg-gradient-to-b from-muted/30 to-muted/50 border-t border-border/50 animate-fade-in">
                {storyError ? (
                  <p className="text-destructive font-medium">{storyError}</p>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-secondary/10 text-secondary">{style}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {storyLocationLabel}
                        </span>
                      </div>
                      <p className="text-foreground leading-relaxed text-lg">{storyResult?.text}</p>
                    </div>

                    <div className="bg-card rounded-2xl p-5 shadow-md border border-border/50 space-y-3">
                      <audio
                        key={audioUrl ?? 'no-audio'}
                        ref={audioRef}
                        src={audioUrl ?? undefined}
                        preload="metadata"
                        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                        onEnded={() => setIsPlaying(false)}
                        className="hidden"
                      />

                      <div className="flex items-center gap-4">
                        <button
                          onClick={handleToggleAudio}
                          disabled={!audioUrl}
                          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isPlaying ? 'bg-secondary text-secondary-foreground shadow-teal' : 'bg-primary text-primary-foreground shadow-brand hover:scale-105'
                          } disabled:opacity-50 disabled:hover:scale-100`}
                        >
                          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" fill="currentColor" />}
                        </button>

                        <div className="flex-1 space-y-2">
                          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${isPlaying ? 'bg-secondary' : 'bg-primary'}`}
                              style={{ width: progressWidth }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground font-medium">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                          </div>
                        </div>

                        <button
                          onClick={handleReplayAudio}
                          disabled={!audioUrl}
                          className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
                        >
                          <RotateCcw className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleMuteToggle}
                          disabled={!audioUrl}
                          className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                      </div>

                      {audioError && <p className="text-sm text-muted-foreground">{audioError}</p>}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
