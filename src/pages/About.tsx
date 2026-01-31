import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, Target, Users } from 'lucide-react';

const About: React.FC = () => {
  const { language } = useLanguage();
  const isHe = language === 'he';

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            {isHe ? 'אודות PlaceEcho' : 'About PlaceEcho'}
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-12">
            {/* The Problem */}
            <section className="bg-card rounded-xl p-8 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground m-0">
                  {isHe ? 'הבעיה' : 'The Problem'}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isHe 
                  ? 'אנשים מבקרים במקומות מדהימים כל יום, אבל לעתים רחוקות מבינים את הסיפורים שמאחוריהם. המידע ההיסטורי והתרבותי קבור בספרים, מדריכים, או פשוט לא נגיש. הקשר האנושי למקום - מה שהופך ביקור לחוויה - לרוב חסר.'
                  : "People visit amazing places every day, yet rarely understand the stories behind them. Historical and cultural information is buried in books, guides, or simply inaccessible. The human connection to a place - what transforms a visit into an experience - is often missing."
                }
              </p>
            </section>

            {/* Our Solution */}
            <section className="bg-card rounded-xl p-8 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground m-0">
                  {isHe ? 'הפתרון שלנו' : 'Our Solution'}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isHe
                  ? 'PlaceEcho הופך כל מיקום לסיפור מותאם אישית. באמצעות GPS או תמונה, אנחנו יוצרים נרטיבים ייחודיים בשפה ובסגנון שאתם בוחרים. לא עוד קריאה של טקסטים ארוכים - פשוט הקשיבו לסיפור תוך כדי התבוננות במקום.'
                  : "PlaceEcho transforms any location into a personalized story. Using GPS or a photo, we create unique narratives in your chosen language and style. No more reading long texts - simply listen to the story while experiencing the place."
                }
              </p>
            </section>

            {/* Why We Built This */}
            <section className="bg-card rounded-xl p-8 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-teal" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground m-0">
                  {isHe ? 'למה בנינו את זה' : 'Why We Built This'}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isHe
                  ? 'אנחנו מאמינים שכל מקום מחזיק סיפור שמחכה להיסופר. בין אם אתם מטיילים לבד, יוצאים עם המשפחה, או מנהלים סיורים - הסיפור הנכון יכול להפוך רגע רגיל למשהו בלתי נשכח. PlaceEcho נולד מהתשוקה הזו לחבר אנשים למקומות דרך כוחו של הסיפור.'
                  : "We believe every place holds a story waiting to be told. Whether you're traveling solo, exploring with family, or leading tours - the right story can transform an ordinary moment into something unforgettable. PlaceEcho was born from this passion to connect people with places through the power of narrative."
                }
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
