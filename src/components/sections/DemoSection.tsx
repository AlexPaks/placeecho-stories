import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Play, Pause, RotateCcw, Volume2, Wand2, Sparkles } from 'lucide-react';

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
    <section id="demo" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.demo.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
            {/* Input Section */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Location input */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  Location
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t.demo.locationPlaceholder}
                      className="h-12 rounded-xl pl-4 pr-4 bg-muted/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleUseMyLocation}
                    className="h-12 whitespace-nowrap rounded-xl border-secondary/50 text-secondary hover:bg-secondary/10"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {t.demo.useMyLocation}
                  </Button>
                </div>
              </div>

              {/* Preferences */}
              <div className="grid sm:grid-cols-3 gap-4">
                {/* Length */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">{t.demo.lengthLabel}</label>
                  <div className="flex gap-1 p-1 bg-muted/50 rounded-xl">
                    {t.demo.lengths.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLength(l)}
                        className={`flex-1 py-2.5 px-3 text-sm rounded-lg transition-all duration-300 font-medium ${
                          length === l
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">{t.demo.styleLabel}</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl border border-border/50 bg-muted/50 text-foreground text-sm font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    {t.demo.styles.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Language */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">{t.demo.languageLabel}</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl border border-border/50 bg-muted/50 text-foreground text-sm font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
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
                className="w-full h-14 btn-brand-glow rounded-xl text-base font-semibold"
                size="lg"
              >
                {isGenerating ? (
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

            {/* Output Section */}
            {generatedStory && (
              <div className="p-6 md:p-8 space-y-6 bg-gradient-to-b from-muted/30 to-muted/50 border-t border-border/50 animate-fade-in">
                {/* Story */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-secondary/10 text-secondary">{style}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {location}
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed text-lg">{generatedStory}</p>
                </div>

                {/* Audio player mock */}
                <div className="bg-card rounded-2xl p-5 shadow-md border border-border/50">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isPlaying 
                          ? 'bg-secondary text-secondary-foreground shadow-teal' 
                          : 'bg-primary text-primary-foreground shadow-brand hover:scale-105'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" fill="currentColor" />}
                    </button>
                    
                    {/* Progress bar */}
                    <div className="flex-1 space-y-2">
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${isPlaying ? 'bg-secondary' : 'bg-primary'}`}
                          style={{ width: isPlaying ? '45%' : '0%' }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground font-medium">
                        <span>{isPlaying ? '0:23' : '0:00'}</span>
                        <span>0:52</span>
                      </div>
                    </div>

                    <button className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
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
