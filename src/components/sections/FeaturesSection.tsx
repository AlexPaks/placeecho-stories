import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wand2, Volume2, Brain, Check } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const icons = [Wand2, Volume2, Brain];
  const colors = ['primary', 'secondary', 'teal'] as const;

  return (
    <section id="features" className="py-20 md:py-28 section-alt">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.features.title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.features.groups.map((group, idx) => {
            const Icon = icons[idx];
            const color = colors[idx];
            return (
              <div
                key={group.title}
                className="feature-group"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    color === 'primary' ? 'bg-primary/10' : 
                    color === 'secondary' ? 'bg-secondary/10' : 'bg-teal/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      color === 'primary' ? 'text-primary' : 
                      color === 'secondary' ? 'text-secondary' : 'text-teal'
                    }`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{group.title}</h3>
                </div>

                {/* Features list */}
                <ul className="space-y-3">
                  {group.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        color === 'primary' ? 'text-primary' : 
                        color === 'secondary' ? 'text-secondary' : 'text-teal'
                      }`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
