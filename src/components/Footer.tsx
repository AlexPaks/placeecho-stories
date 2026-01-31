import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-semibold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">PE</span>
              </div>
              <span>PlaceEcho</span>
            </div>
            <p className="text-background/70 text-sm max-w-sm">
              Transforming locations into stories. GPS to narrative, powered by AI.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Pages</h4>
            <div className="flex flex-col gap-2 text-sm text-background/70">
              <Link to="/" className="hover:text-background transition-colors">{t.nav.home}</Link>
              <Link to="/about" className="hover:text-background transition-colors">{t.nav.about}</Link>
              <Link to="/faq" className="hover:text-background transition-colors">{t.nav.faq}</Link>
              <Link to="/contact" className="hover:text-background transition-colors">{t.nav.contact}</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-background/70">
              <Link to="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-background transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20 text-center text-sm text-background/50">
          © {new Date().getFullYear()} PlaceEcho. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
