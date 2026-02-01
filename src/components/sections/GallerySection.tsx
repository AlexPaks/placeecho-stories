import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Play, Shuffle, MapPin, Headphones, BookOpen } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { t } = useLanguage();
  const [displayedStories, setDisplayedStories] = useState(t.gallery.stories.slice(0, 3));
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  const [playingStory, setPlayingStory] = useState<string | null>(null);

  const shuffleStories = () => {
    const shuffled = [...t.gallery.stories].sort(() => Math.random() - 0.5);
    setDisplayedStories(shuffled.slice(0, 3));
    setExpandedStory(null);
    setPlayingStory(null);
  };

  const toneColors: Record<string, string> = {
    Historical: 'from-amber-500/20 to-amber-600/10 text-amber-700',
    Poetic: 'from-purple-500/20 to-purple-600/10 text-purple-700',
    Adventure: 'from-emerald-500/20 to-emerald-600/10 text-emerald-700',
    Documentary: 'from-blue-500/20 to-blue-600/10 text-blue-700',
    Personal: 'from-rose-500/20 to-rose-600/10 text-rose-700',
  };

  return (
    <section id="gallery" className="py-20 md:py-28 section-teal relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-secondary bg-secondary/10 px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Story Examples</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.gallery.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full mb-8" />
          <Button
            variant="outline"
            onClick={shuffleStories}
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground group"
          >
            <Shuffle className="w-4 h-4 mr-2 transition-transform group-hover:rotate-180 duration-500" />
            {t.gallery.randomButton}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayedStories.map((story, idx) => {
            const toneStyle = toneColors[story.tone] || toneColors.Historical;
            
            return (
              <div
                key={story.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Header with gradient */}
                <div className={`relative p-6 bg-gradient-to-br ${toneStyle.split(' ').slice(0, 2).join(' ')}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="font-semibold text-foreground">{story.place}</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm ${toneStyle.split(' ').slice(2).join(' ')}`}>
                    {story.tone}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="min-h-[100px]">
                    <p className="text-muted-foreground leading-relaxed">
                      {expandedStory === story.id ? story.fullStory : story.snippet}
                    </p>
                  </div>
                  
                  {expandedStory !== story.id && (
                    <button
                      onClick={() => setExpandedStory(story.id)}
                      className="text-secondary text-sm font-medium hover:underline underline-offset-2"
                    >
                      Read more...
                    </button>
                  )}

                  {/* Play button */}
                  <button 
                    onClick={() => setPlayingStory(playingStory === story.id ? null : story.id)}
                    className={`w-full flex items-center justify-center gap-3 rounded-xl py-4 font-medium transition-all duration-300 ${
                      playingStory === story.id 
                        ? 'bg-primary text-primary-foreground shadow-brand' 
                        : 'bg-muted hover:bg-primary/10 text-foreground group-hover:bg-primary/10'
                    }`}
                  >
                    {playingStory === story.id ? (
                      <>
                        <Headphones className="w-5 h-5 animate-pulse" />
                        <span>Playing...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" fill="currentColor" />
                        <span>{t.gallery.playButton}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
