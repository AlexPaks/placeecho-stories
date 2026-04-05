const readRequiredEnv = (name: keyof ImportMetaEnv) => {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');
const ensureLeadingSlash = (value: string) => (value.startsWith('/') ? value : `/${value}`);
const readBooleanEnv = (name: keyof ImportMetaEnv) => readRequiredEnv(name).toLowerCase() === 'true';
const readNumberEnv = (name: keyof ImportMetaEnv) => {
  const value = Number(readRequiredEnv(name));

  if (Number.isNaN(value)) {
    throw new Error(`Environment variable ${name} must be a number.`);
  }

  return value;
};

const backendOrigin = trimTrailingSlash(readRequiredEnv('VITE_BACKEND_ORIGIN'));
const publicApiPrefix = ensureLeadingSlash(trimTrailingSlash(readRequiredEnv('VITE_PUBLIC_API_PREFIX')));

export const APP_CONFIG = {
  backendOrigin,
  publicApiPrefix,
  publicApiBase: `${backendOrigin}${publicApiPrefix}`,
  waitlistSource: readRequiredEnv('VITE_WAITLIST_SOURCE'),
  tts: {
    provider: readRequiredEnv('VITE_TTS_PROVIDER'),
    voiceProfile: readRequiredEnv('VITE_TTS_VOICE_PROFILE'),
    format: readRequiredEnv('VITE_TTS_FORMAT'),
  },
  storyDefaults: {
    style: readRequiredEnv('VITE_STORY_DEFAULT_STYLE'),
    type: readRequiredEnv('VITE_STORY_DEFAULT_TYPE'),
    perspective: readRequiredEnv('VITE_STORY_DEFAULT_PERSPECTIVE'),
    realism: readNumberEnv('VITE_STORY_DEFAULT_REALISM'),
    voiceEnabled: readBooleanEnv('VITE_STORY_VOICE_ENABLED'),
    voiceSpeed: readNumberEnv('VITE_STORY_VOICE_SPEED'),
    voiceType: readRequiredEnv('VITE_STORY_VOICE_TYPE'),
    voiceStyle: readRequiredEnv('VITE_STORY_VOICE_STYLE'),
    voicePitch: readRequiredEnv('VITE_STORY_VOICE_PITCH'),
    narrationEmotion: readRequiredEnv('VITE_STORY_NARRATION_EMOTION'),
    autoPlayStoryAudio: readBooleanEnv('VITE_STORY_AUTOPLAY_AUDIO'),
    downloadAudioAfterGeneration: readBooleanEnv('VITE_STORY_DOWNLOAD_AUDIO_AFTER_GENERATION'),
  },
} as const;
