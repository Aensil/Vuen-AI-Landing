import React, { useEffect, useState, useMemo } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import StepPlanSection from '@/components/sections/StepPlanSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ROISection from '@/components/sections/ROISection';
import TransformationSection from '@/components/sections/TransformationSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
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

        {/* Main Content — structured around Donald Miller's 4 buyer questions */}
        <main>
          {/* Hero - Clear value proposition + CTA (villain in subheadline) */}
          <HeroSection
            isLoaded={isLoaded}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* 3-Step Plan - Reduce fear, show simplicity (StoryBrand: the plan) */}
          <StepPlanSection />

          {/* Authority signals (StoryBrand: guide credentials) */}
          <SocialProofSection />

          {/* Product details — what it actually does (for curious buyers) */}
          <FeaturesSection />

          {/* Q1: "Will this work for someone like me?" */}
          <TestimonialsSection />

          {/* Q3 part 1: "Is it worth it?" — build the value case */}
          <ROISection />

          {/* Q4: "What will my life look like after?" — emotional payoff before price */}
          <TransformationSection />

          {/* Q3 part 2: Pricing — now they see the price against the value and vision */}
          <PricingSection />

          {/* Q2: "What's the risk?" — handle final objections before the close */}
          <FAQSection />

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
