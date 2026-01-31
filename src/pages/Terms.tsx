import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-sm text-muted-foreground">Last updated: January 2025</p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>By using PlaceEcho, you agree to these Terms of Service. If you do not agree, please do not use our service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Description of Service</h2>
              <p>PlaceEcho provides AI-generated stories based on geographic locations. Stories are created for entertainment and educational purposes. We do not guarantee historical accuracy of generated content.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. User Responsibilities</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate information when creating an account</li>
                <li>Use the service for lawful purposes only</li>
                <li>Not attempt to reverse engineer the service</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Intellectual Property</h2>
              <p>Stories generated for you are licensed for your personal use. PlaceEcho retains rights to the underlying technology and service. You may share stories but not resell or commercially exploit them without permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Limitation of Liability</h2>
              <p>PlaceEcho is provided "as is" without warranties. We are not liable for any damages arising from use of the service, including inaccurate story content.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Changes to Terms</h2>
              <p>We may update these terms at any time. Continued use of the service constitutes acceptance of new terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Contact</h2>
              <p>For questions about these terms, contact us at legal@placeecho.com</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
