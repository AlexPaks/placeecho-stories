import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Trash2, Zap, CheckCircle2 } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const { t } = useLanguage();

  const iconMap: Record<string, React.ElementType> = {
    shield: Shield,
    trash: Trash2,
    zap: Zap,
  };

  const bgColors = [
    'from-primary/10 to-primary/5',
    'from-secondary/10 to-secondary/5',
    'from-teal/10 to-teal/5'
  ];

  return (
    <section id="trust" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Shield className="w-4 h-4" />
            <span>Your Trust Matters</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.trust.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.trust.items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Shield;
            return (
              <div
                key={idx}
                className={`relative text-center p-8 rounded-2xl bg-gradient-to-br ${bgColors[idx]} border border-border/50 group hover:shadow-lg transition-all duration-300`}
              >
                {/* Icon */}
                <div className="relative w-20 h-20 rounded-2xl bg-card flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <Icon className="w-10 h-10 text-secondary" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Partners placeholder */}
        <div className="mt-20 pt-12 border-t border-border/50">
          <p className="text-center text-muted-foreground text-sm mb-8 font-medium">Trusted by beta testers & partners</p>
          <div className="flex justify-center items-center gap-12 flex-wrap opacity-50 grayscale hover:grayscale-0 hover:opacity-70 transition-all duration-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-28 h-10 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">Partner {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
