import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Play, Shuffle, MapPin } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { t } = useLanguage();
  const [displayedStories, setDisplayedStories] = useState(t.gallery.stories.slice(0, 3));
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const shuffleStories = () => {
    const shuffled = [...t.gallery.stories].sort(() => Math.random() - 0.5);
    setDisplayedStories(shuffled.slice(0, 3));
    setExpandedStory(null);
  };

  return (
    <section id="gallery" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.gallery.title}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6" />
          <Button
            variant="outline"
            onClick={shuffleStories}
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            {t.gallery.randomButton}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayedStories.map((story) => (
            <div
              key={story.id}
              className="card-hover bg-card rounded-xl overflow-hidden shadow-md border border-border/50"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-muted to-brand-muted p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span className="font-medium text-foreground">{story.place}</span>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded bg-primary/20 text-primary">
                  {story.tone}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {expandedStory === story.id ? story.fullStory : story.snippet}
                </p>
                
                {expandedStory !== story.id && (
                  <button
                    onClick={() => setExpandedStory(story.id)}
                    className="text-secondary text-sm font-medium hover:underline"
                  >
                    Read more...
                  </button>
                )}

                {/* Play button */}
                <button className="w-full flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg py-3 font-medium transition-all">
                  <Play className="w-4 h-4" fill="currentColor" />
                  <span>{t.gallery.playButton}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
