import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

export const DemoSection: React.FC = () => {
  const { t } = useLanguage();
  const [location, setLocation] = useState('');
  const [length, setLength] = useState(t.demo.lengths[0]);
  const [style, setStyle] = useState(t.demo.styles[0]);
  const [language, setLanguage] = useState(t.demo.languages[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mockStories: Record<string, string> = {
    'Historical': "The ancient stones beneath your feet have witnessed centuries of human endeavor. From Roman merchants to modern travelers, each footstep adds to the endless narrative of this remarkable place. The walls here hold secrets that echo through time, waiting to be discovered by those who pause to listen.",
    'Poetic': "Here, where light dances upon weathered stones, time itself seems to pause and breathe. Whispers of forgotten dreams drift on the breeze, painting invisible stories across the canvas of memory. Each shadow holds a verse, each corner a stanza in nature's endless poem.",
    'Documentary': "This location serves as a significant cultural landmark. Established in the early 20th century, it has been a gathering point for communities and a witness to major historical events. Archaeological findings suggest human activity dating back several centuries.",
    'Personal': "I remember the first time I stood here. The sounds, the smells, the way the light fell just so. It reminded me of stories my grandfather used to tell, of places that lived more in memory than in maps. Some places just feel like home, even when you've never been before.",
    'Adventure': "The path ahead winds into mystery. Every traveler who has stood here faced the same choice: the safety of the known, or the thrill of discovery. Legend speaks of hidden treasures and ancient secrets waiting just beyond the next horizon. Your adventure begins now.",
  };

  const handleGenerate = () => {
    if (!location) return;
    
    setIsGenerating(true);
    setGeneratedStory(null);
    
    // Simulate API call
    setTimeout(() => {
      setGeneratedStory(mockStories[style] || mockStories['Historical']);
      setIsGenerating(false);
    }, 2000);
  };

  const handleUseMyLocation = () => {
    setLocation('Current Location (Mock)');
  };

  return (
    <section id="demo" className="py-20 md:py-28 bg-gradient-to-b from-background to-teal-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.demo.title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden">
            {/* Input Section */}
            <div className="p-6 md:p-8 space-y-6 border-b border-border">
              {/* Location input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Location</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t.demo.locationPlaceholder}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleUseMyLocation}
                    className="whitespace-nowrap"
                  >
                    {t.demo.useMyLocation}
                  </Button>
                </div>
              </div>

              {/* Preferences */}
              <div className="grid sm:grid-cols-3 gap-4">
                {/* Length */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t.demo.lengthLabel}</label>
                  <div className="flex gap-1">
                    {t.demo.lengths.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLength(l)}
                        className={`flex-1 py-2 px-3 text-sm rounded-lg transition-colors ${
                          length === l
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t.demo.styleLabel}</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-input bg-background text-foreground text-sm"
                  >
                    {t.demo.styles.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t.demo.languageLabel}</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-input bg-background text-foreground text-sm"
                  >
                    {t.demo.languages.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Generate button */}
              <Button
                onClick={handleGenerate}
                disabled={!location || isGenerating}
                className="w-full btn-brand-glow"
                size="lg"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating...
                  </span>
                ) : (
                  t.demo.generateButton
                )}
              </Button>
            </div>

            {/* Output Section */}
            {generatedStory && (
              <div className="p-6 md:p-8 space-y-6 bg-muted/30 animate-fade-in">
                {/* Story */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-secondary/10 text-secondary">{style}</span>
                    <span className="text-xs text-muted-foreground">{location}</span>
                  </div>
                  <p className="text-foreground leading-relaxed">{generatedStory}</p>
                </div>

                {/* Audio player mock */}
                <div className="audio-player space-y-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-brand transition-transform hover:scale-105"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" fill="currentColor" />}
                    </button>
                    
                    {/* Progress bar */}
                    <div className="flex-1 space-y-1">
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: isPlaying ? '45%' : '0%' }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{isPlaying ? '0:23' : '0:00'}</span>
                        <span>0:52</span>
                      </div>
                    </div>

                    <button className="p-2 text-muted-foreground hover:text-foreground">
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-foreground">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
