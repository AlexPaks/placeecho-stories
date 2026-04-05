import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Mail, MapPin, Send } from 'lucide-react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/language-context';
import { getContactErrorMessage } from '@/lib/api-errors';
import { sendContactMessage } from '@/lib/api';

const supportEmail = 'support@placeecho.io';
const contactSource = 'contact_page';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const isHe = language === 'he';
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const contactMutation = useMutation({
    mutationFn: sendContactMessage,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      source: contactSource,
    };

    if (!payload.name) {
      setSubmitError(isHe ? 'נא להזין שם.' : 'Please enter your name.');
      return;
    }

    if (!payload.email) {
      setSubmitError(isHe ? 'נא להזין כתובת אימייל.' : 'Please enter your email address.');
      return;
    }

    if (!payload.message) {
      setSubmitError(isHe ? 'נא להזין הודעה.' : 'Please enter a message.');
      return;
    }

    try {
      const response = await contactMutation.mutateAsync(payload);

      if (!response.ok || !response.queued || response.degraded_mode) {
        setSubmitError(isHe ? 'שליחת ההודעה נכשלה. נסה/י שוב.' : 'Sending your message failed. Please try again.');
        return;
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setSubmitError(getContactErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{isHe ? 'צור קשר' : 'Contact Us'}</h1>
          <p className="text-lg text-muted-foreground mb-12">
            {isHe
              ? 'נשמח לשמוע ממך. שלח/י לנו הודעה ונחזור אליך בהקדם.'
              : "We'd love to hear from you. Send us a message and we'll get back to you soon."}
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              {submitted ? (
                <div className="bg-secondary/10 text-foreground rounded-xl p-8 text-center">
                  <p className="text-xl font-medium">
                    {isHe ? 'תודה! ההודעה נשלחה ונחזור אליך בהקדם.' : "Thanks! Your message was sent and we'll get back to you soon."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{isHe ? 'שם' : 'Name'}</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                      placeholder={isHe ? 'השם שלך' : 'Your name'}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{isHe ? 'אימייל' : 'Email'}</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                      placeholder={isHe ? 'האימייל שלך' : 'your@email.com'}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{isHe ? 'הודעה' : 'Message'}</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                      placeholder={isHe ? 'איך נוכל לעזור?' : 'How can we help?'}
                      className="min-h-[150px]"
                    />
                  </div>
                  {submitError && <p className="text-sm text-destructive">{submitError}</p>}
                  <Button type="submit" disabled={contactMutation.isPending} className="w-full btn-brand-glow">
                    <Send className="w-4 h-4 mr-2" />
                    {contactMutation.isPending ? (isHe ? 'שולח...' : 'Sending...') : isHe ? 'שלח מייל' : 'Send Email'}
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{isHe ? 'אימייל' : 'Email'}</h3>
                </div>
                <a href={`mailto:${supportEmail}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {supportEmail}
                </a>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{isHe ? 'מיקום' : 'Location'}</h3>
                </div>
                <p className="text-muted-foreground">Kiryat Yam, Israel</p>
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
