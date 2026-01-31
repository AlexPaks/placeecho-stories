import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const isHe = language === 'he';

  const faqs = isHe ? [
    {
      q: 'כמה עולה השירות?',
      a: 'PlaceEcho כרגע בגרסת בטא. בתוכניות העתידיות שלנו: גרסה חינמית עם מספר סיפורים מוגבל, ותוכנית פרימיום לשימוש בלתי מוגבל.',
    },
    {
      q: 'באילו שפות נתמך?',
      a: 'כרגע אנחנו תומכים בעברית, אנגלית ורוסית. שפות נוספות בדרך!',
    },
    {
      q: 'איפה נשמר המיקום שלי?',
      a: 'המיקום שלך נשמר רק אם אתה בוחר לשמור את הסיפור. אנחנו לא עוקבים אחרי המיקום שלך ברקע. הנתונים מאוחסנים בשרתים מאובטחים ואתה יכול למחוק אותם בכל עת.',
    },
    {
      q: 'מי הבעלים של הסיפורים שנוצרים?',
      a: 'הסיפורים שנוצרים עבורך הם שלך. אתה יכול לשתף, לשמור או למחוק אותם כרצונך.',
    },
    {
      q: 'איך עובד האודיו?',
      a: 'אנחנו משתמשים בטכנולוגיית text-to-speech מתקדמת כדי ליצור נרטיבים קוליים טבעיים. האודיו נוצר בזמן אמת ומתאים לשפה שבחרת.',
    },
    {
      q: 'האם אפשר להשתמש בזה אופליין?',
      a: 'כרגע נדרש חיבור לאינטרנט ליצירת סיפורים חדשים. סיפורים שנשמרו יכולים להיות נגישים אופליין בגרסאות עתידיות.',
    },
  ] : [
    {
      q: 'How much does the service cost?',
      a: 'PlaceEcho is currently in beta. Our future plans include a free tier with limited stories and a premium plan for unlimited usage.',
    },
    {
      q: 'What languages are supported?',
      a: 'Currently we support Hebrew, English, and Russian. More languages coming soon!',
    },
    {
      q: 'Where is my location stored?',
      a: 'Your location is only stored if you choose to save the story. We do not track your location in the background. Data is stored on secure servers and you can delete it anytime.',
    },
    {
      q: 'Who owns the generated stories?',
      a: 'Stories generated for you are yours. You can share, save, or delete them as you wish.',
    },
    {
      q: 'How does the audio work?',
      a: 'We use advanced text-to-speech technology to create natural voice narratives. Audio is generated in real-time and matches your chosen language.',
    },
    {
      q: 'Can I use it offline?',
      a: 'Currently, an internet connection is required to generate new stories. Saved stories may be accessible offline in future versions.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {isHe ? 'שאלות נפוצות' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            {isHe ? 'כל מה שרצית לדעת על PlaceEcho' : 'Everything you need to know about PlaceEcho'}
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="bg-card rounded-xl border border-border/50 px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-foreground font-medium">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
