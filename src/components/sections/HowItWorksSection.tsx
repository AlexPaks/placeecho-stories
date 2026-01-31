import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Eye, Sparkles, Volume2, BookOpen } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { t } = useLanguage();

  const icons = [MapPin, Eye, Sparkles, Volume2, BookOpen];

  return (
    <section id="how-it-works" className="py-20 md:py-28 section-alt">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.howItWorks.title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {t.howItWorks.steps.map((step, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={step.number}
                className="step-card bg-card rounded-xl p-6 shadow-md border border-border/50 text-center group"
              >
                {/* Step number */}
                <div className="step-number w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 font-semibold text-muted-foreground transition-colors">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>

                {/* Connector line (hidden on last) */}
                {idx < t.howItWorks.steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
