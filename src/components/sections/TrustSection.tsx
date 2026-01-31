import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Trash2, Zap } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const { t } = useLanguage();

  const iconMap: Record<string, React.ElementType> = {
    shield: Shield,
    trash: Trash2,
    zap: Zap,
  };

  return (
    <section id="trust" className="py-20 md:py-28 section-alt">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.trust.title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {t.trust.items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Shield;
            return (
              <div
                key={idx}
                className="text-center"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-secondary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Partners placeholder */}
        <div className="mt-16 pt-12 border-t border-border">
          <p className="text-center text-muted-foreground text-sm mb-6">Trusted by beta testers & partners</p>
          <div className="flex justify-center gap-8 opacity-40">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-8 bg-muted-foreground/20 rounded" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
