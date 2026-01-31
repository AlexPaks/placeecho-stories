import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const isHe = language === 'he';
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {isHe ? 'צור קשר' : 'Contact Us'}
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            {isHe ? 'נשמח לשמוע ממך. שלח לנו הודעה ונחזור אליך בהקדם.' : "We'd love to hear from you. Send us a message and we'll get back to you soon."}
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              {submitted ? (
                <div className="bg-secondary/10 text-foreground rounded-xl p-8 text-center">
                  <p className="text-xl font-medium">
                    {isHe ? 'תודה! נחזור אליך בקרוב.' : 'Thanks! We\'ll get back to you soon.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {isHe ? 'שם' : 'Name'}
                    </label>
                    <Input required placeholder={isHe ? 'השם שלך' : 'Your name'} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {isHe ? 'אימייל' : 'Email'}
                    </label>
                    <Input type="email" required placeholder={isHe ? 'האימייל שלך' : 'your@email.com'} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {isHe ? 'הודעה' : 'Message'}
                    </label>
                    <Textarea 
                      required 
                      placeholder={isHe ? 'איך נוכל לעזור?' : 'How can we help?'}
                      className="min-h-[150px]"
                    />
                  </div>
                  <Button type="submit" className="w-full btn-brand-glow">
                    <Send className="w-4 h-4 mr-2" />
                    {isHe ? 'שלח הודעה' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{isHe ? 'אימייל' : 'Email'}</h3>
                </div>
                <p className="text-muted-foreground">hello@placeecho.com</p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{isHe ? 'מיקום' : 'Location'}</h3>
                </div>
                <p className="text-muted-foreground">Tel Aviv, Israel</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
