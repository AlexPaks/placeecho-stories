import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Eye, Sparkles, Volume2, BookOpen, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const icons = [MapPin, Eye, Sparkles, Volume2, BookOpen];
  const colors = ['primary', 'secondary', 'primary', 'secondary', 'primary'];

  return (
    <section id="how-it-works" className="py-20 md:py-28 section-alt relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(38 92% 50% / 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, hsl(174 84% 26% / 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, hsl(38 92% 50% / 0.08) 0%, transparent 40%)`
        }} />
      </div>

      <div className="container relative">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.howItWorks.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        {/* Steps container */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-secondary/40 to-primary/20" />
          
          <div className="grid md:grid-cols-5 gap-6 lg:gap-4">
            {t.howItWorks.steps.map((step, idx) => {
              const Icon = icons[idx];
              const colorClass = colors[idx];
              const isOdd = idx % 2 === 0;
              
              return (
                <div
                  key={step.number}
                  className="step-card relative bg-card rounded-2xl p-6 shadow-lg border border-border/50 text-center group hover:shadow-xl transition-all duration-300"
                >
                  {/* Step number badge */}
                  <div className={`step-number absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isOdd 
                      ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground' 
                      : 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground'
                  }`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    isOdd 
                      ? 'bg-primary/10 group-hover:bg-primary/20' 
                      : 'bg-secondary/10 group-hover:bg-secondary/20'
                  }`}>
                    <Icon className={`w-8 h-8 transition-transform duration-300 group-hover:scale-110 ${
                      isOdd ? 'text-primary' : 'text-secondary'
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>

                  {/* Arrow connector (mobile/tablet) */}
                  {idx < t.howItWorks.steps.length - 1 && (
                    <div className="md:hidden flex justify-center mt-4">
                      <ArrowRight className="w-5 h-5 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
