import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

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
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-secondary/90" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="container relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground bg-primary/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Join the Beta</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-background mb-4">
              {t.finalCTA.headline}
            </h2>
            <p className="text-background/70 text-lg">Be among the first to experience location-based storytelling</p>
          </div>

          {submitted ? (
            <div className="bg-secondary/30 backdrop-blur-md text-background rounded-2xl p-10 animate-fade-in border border-secondary/50">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-secondary-foreground" />
                </div>
                <p className="text-2xl font-semibold">Thanks for your interest!</p>
                <p className="text-background/70">We'll be in touch soon with your beta access.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 bg-background/5 backdrop-blur-md rounded-2xl p-8 border border-background/10">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder={t.finalCTA.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50 h-12 rounded-xl focus:border-primary focus:ring-primary"
                  required
                />
                <Input
                  type="email"
                  placeholder={t.finalCTA.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50 h-12 rounded-xl focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <Textarea
                placeholder={t.finalCTA.reasonPlaceholder}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 min-h-[120px] rounded-xl focus:border-primary focus:ring-primary resize-none"
              />
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 btn-brand-glow h-14 rounded-xl text-base font-semibold"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {t.finalCTA.submitButton}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="flex-1 border-background/30 text-background hover:bg-background/10 h-14 rounded-xl text-base"
                >
                  <Calendar className="w-5 h-5 mr-2" />
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
