import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wand2, Volume2, Brain, Check, Sparkles } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const icons = [Wand2, Volume2, Brain];
  const gradients = [
    'from-primary/20 to-primary/5',
    'from-secondary/20 to-secondary/5',
    'from-teal/20 to-teal/5'
  ];
  const accents = ['primary', 'secondary', 'teal'] as const;

  return (
    <section id="features" className="py-20 md:py-28 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.features.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.features.groups.map((group, idx) => {
            const Icon = icons[idx];
            const accent = accents[idx];
            const gradient = gradients[idx];
            
            return (
              <div
                key={group.title}
                className={`relative bg-card rounded-2xl p-8 shadow-lg border border-border/50 overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Decorative circle */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${
                  accent === 'primary' ? 'bg-primary' : 
                  accent === 'secondary' ? 'bg-secondary' : 'bg-teal'
                }`} />
                
                {/* Header */}
                <div className="relative flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    accent === 'primary' ? 'bg-primary/10 group-hover:bg-primary/20' : 
                    accent === 'secondary' ? 'bg-secondary/10 group-hover:bg-secondary/20' : 'bg-teal/10 group-hover:bg-teal/20'
                  }`}>
                    <Icon className={`w-7 h-7 ${
                      accent === 'primary' ? 'text-primary' : 
                      accent === 'secondary' ? 'text-secondary' : 'text-teal'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{group.title}</h3>
                </div>

                {/* Features list */}
                <ul className="relative space-y-4">
                  {group.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        accent === 'primary' ? 'bg-primary/10' : 
                        accent === 'secondary' ? 'bg-secondary/10' : 'bg-teal/10'
                      }`}>
                        <Check className={`w-3 h-3 ${
                          accent === 'primary' ? 'text-primary' : 
                          accent === 'secondary' ? 'text-secondary' : 'text-teal'
                        }`} />
                      </div>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
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
