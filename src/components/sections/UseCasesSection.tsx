import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plane, Users, Map, Building, Landmark, PenTool } from 'lucide-react';

export const UseCasesSection: React.FC = () => {
  const { t } = useLanguage();

  const iconMap: Record<string, React.ElementType> = {
    plane: Plane,
    users: Users,
    map: Map,
    building: Building,
    landmark: Landmark,
    pen: PenTool,
  };

  return (
    <section id="use-cases" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.useCases.title}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.useCases.cases.map((useCase, idx) => {
            const Icon = iconMap[useCase.icon] || Map;
            return (
              <div
                key={useCase.id}
                className="card-hover bg-card rounded-xl p-6 shadow-md border border-border/50 group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground">{useCase.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
