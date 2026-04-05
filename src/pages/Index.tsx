import React, { useEffect, useState, useMemo } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import ProblemSection from '@/components/sections/ProblemSection';
import WhoItsForSection from '@/components/sections/WhoItsForSection';
import RiskSection from '@/components/sections/RiskSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PricingSection from '@/components/sections/PricingSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import AspirationSection from '@/components/sections/AspirationSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/hooks/useLanguage';

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentLanguage } = useLanguage();

  const prefersReducedMotion = useMemo(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false, []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO language={currentLanguage} page="home" />

      <div className="min-h-screen bg-void text-white overflow-x-hidden">
        {/* Fixed Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero - Primary CTA */}
          <HeroSection
            isLoaded={isLoaded}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Brief credibility — logos and stats */}
          <SocialProofSection />

          {/* Q1: Will this work for someone like me? */}
          <ProblemSection />
          <WhoItsForSection />

          {/* Q4: What will my life actually look like after? */}
          <ExperienceSection />
          <AspirationSection />

          {/* Q3: Is this worth the time, money, and effort? */}
          <TestimonialsSection />
          <PricingSection />

          {/* Q2: What is the risk? What are you not telling me? */}
          <RiskSection />

          {/* Final CTA */}
          <CTASection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
