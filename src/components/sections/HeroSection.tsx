import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MapPin, Languages, Volume2, ArrowRight, Play } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bullets = [
    { icon: MapPin, text: t.hero.bullets.local },
    { icon: Languages, text: t.hero.bullets.multilingual },
    { icon: Volume2, text: t.hero.bullets.audio },
  ];

  return (
    <section className="hero-gradient min-h-screen flex items-center pt-16">
      <div className="container py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              {t.hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              {t.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('demo')}
                className="btn-brand-glow text-base px-8"
              >
                {t.hero.ctaTryDemo}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="text-base px-8 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                {t.hero.ctaContact}
              </Button>
            </div>

            {/* Bullets */}
            <div className="flex flex-wrap gap-6 pt-4">
              {bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-muted-foreground animate-fade-in-delay-1"
                  style={{ animationDelay: `${idx * 0.1 + 0.3}s` }}
                >
                  <bullet.icon className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium">{bullet.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mock Product Card */}
          <div className="relative animate-fade-in-delay-2">
            <div className="bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden">
              {/* Mock map area */}
              <div className="h-48 bg-gradient-to-br from-teal-muted to-brand-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-brand animate-pulse-soft">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Flow indicator */}
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground bg-muted rounded-lg py-3 px-4">
                  <span className="text-secondary">GPS</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-foreground">Story</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-primary">Play Audio</span>
                </div>

                {/* Mock story preview */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-secondary/10 text-secondary">Historical</span>
                    <span className="text-xs text-muted-foreground">Tel Aviv Beach</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Where the Mediterranean whispers secrets to the sand, generations of dreamers have walked these shores...
                  </p>
                </div>

                {/* Play button */}
                <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-3 font-medium transition-all hover:opacity-90">
                  <Play className="w-4 h-4" fill="currentColor" />
                  <span>{t.hero.mockFlow}</span>
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-4 -right-4 w-full h-full bg-secondary/10 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
