import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-sm text-muted-foreground">Last updated: January 2025</p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
              <p>PlaceEcho collects location data only when you actively use the service to generate stories. We may also collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device information for app functionality</li>
                <li>Usage data to improve our services</li>
                <li>Account information if you create an account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
              <p>Your data is used to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Generate personalized stories based on location</li>
                <li>Save your story history (if opted in)</li>
                <li>Improve our AI and services</li>
                <li>Communicate with you about updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Data Storage & Security</h2>
              <p>We use industry-standard security measures to protect your data. Location data is only stored if you choose to save a story. You can delete your data at any time from your account settings.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of data collection</li>
                <li>Export your story history</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Contact Us</h2>
              <p>For privacy-related inquiries, please contact us at privacy@placeecho.com</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
