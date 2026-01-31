import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Calendar } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-to-br from-foreground to-foreground/95">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-background mb-8">
            {t.finalCTA.headline}
          </h2>

          {submitted ? (
            <div className="bg-secondary/20 text-background rounded-xl p-8 animate-fade-in">
              <p className="text-xl font-medium">Thanks for your interest! We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder={t.finalCTA.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                required
              />
              <Input
                type="email"
                placeholder={t.finalCTA.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                required
              />
              <Textarea
                placeholder={t.finalCTA.reasonPlaceholder}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 min-h-[100px]"
              />
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 btn-brand-glow"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t.finalCTA.submitButton}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="flex-1 border-background/30 text-background hover:bg-background/10"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {t.finalCTA.bookDemo}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
