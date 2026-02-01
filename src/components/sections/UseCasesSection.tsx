import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plane, Users, Map, Building, Landmark, PenTool } from 'lucide-react';

// Import images
import travelersImg from '@/assets/usecase-travelers.jpg';
import familyImg from '@/assets/usecase-family.jpg';
import guideImg from '@/assets/usecase-guide.jpg';
import heritageImg from '@/assets/usecase-heritage.jpg';
import museumImg from '@/assets/usecase-museum.jpg';
import creatorImg from '@/assets/usecase-creator.jpg';

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

  const imageMap: Record<string, string> = {
    plane: travelersImg,
    users: familyImg,
    map: guideImg,
    building: heritageImg,
    landmark: museumImg,
    pen: creatorImg,
  };

  return (
    <section id="use-cases" className="py-20 md:py-28 section-mesh relative overflow-hidden">
      {/* Decorative elements */}
      <div className="blob-shape blob-secondary w-72 h-72 top-20 -left-20 opacity-20" />
      <div className="blob-shape blob-primary w-64 h-64 bottom-20 -right-20 opacity-20" />
      
      <div className="container relative">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-secondary bg-secondary/10 px-4 py-2 rounded-full mb-4">
            Perfect For
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.useCases.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.useCases.cases.map((useCase, idx) => {
            const Icon = iconMap[useCase.icon] || Map;
            const image = imageMap[useCase.icon];
            return (
              <div
                key={useCase.id}
                className="group relative bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={image} 
                    alt={useCase.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>

                {/* Icon badge */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Content */}
                <div className="p-6 pt-2 relative">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
