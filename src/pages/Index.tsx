import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { TrustSection } from '@/components/sections/TrustSection';
import { DemoSection } from '@/components/sections/DemoSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <UseCasesSection />
        <FeaturesSection />
        <GallerySection />
        <TrustSection />
        <DemoSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
