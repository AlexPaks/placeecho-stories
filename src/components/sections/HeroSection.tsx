import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MapPin, Languages, Volume2, ArrowRight, Play } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

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
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/70" />
      
      {/* Decorative blobs */}
      <div className="blob-shape blob-primary w-96 h-96 -top-20 -left-20 animate-float" />
      <div className="blob-shape blob-secondary w-80 h-80 top-40 right-10 animate-float" style={{ animationDelay: '2s' }} />
      <div className="blob-shape blob-primary w-64 h-64 bottom-20 left-1/4 animate-float" style={{ animationDelay: '4s' }} />
      
      <div className="container relative py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>AI-Powered Storytelling</span>
            </div>
            
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
                className="btn-brand-glow text-base px-8 group"
              >
                {t.hero.ctaTryDemo}
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="text-base px-8 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground backdrop-blur-sm"
              >
                {t.hero.ctaContact}
              </Button>
            </div>

            {/* Bullets */}
            <div className="flex flex-wrap gap-6 pt-4">
              {bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-muted-foreground animate-fade-in-delay-1 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full"
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
            <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-xl border border-border/50 overflow-hidden">
              {/* Mock map area */}
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={heroBg} 
                  alt="Map visualization" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-brand animate-pulse-soft">
                    <MapPin className="w-7 h-7 text-primary-foreground" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Flow indicator */}
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 rounded-lg py-3 px-4">
                  <span className="text-secondary font-semibold">GPS</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-foreground font-semibold">Story</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-primary font-semibold">Play Audio</span>
                </div>

                {/* Mock story preview */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">Historical</span>
                    <span className="text-xs text-muted-foreground">Tel Aviv Beach</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Where the Mediterranean whispers secrets to the sand, generations of dreamers have walked these shores...
                  </p>
                </div>

                {/* Play button */}
                <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-3 font-medium transition-all hover:opacity-90 hover:shadow-brand">
                  <Play className="w-4 h-4" fill="currentColor" />
                  <span>{t.hero.mockFlow}</span>
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-4 -right-4 w-full h-full bg-secondary/20 rounded-2xl blur-sm" />
            <div className="absolute -z-20 top-8 -right-8 w-full h-full bg-primary/10 rounded-2xl blur-md" />
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill" />
        </svg>
      </div>
    </section>
  );
};
