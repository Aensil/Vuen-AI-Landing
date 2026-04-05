import React, { useEffect, useState, useMemo } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import StepPlanSection from '@/components/sections/StepPlanSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import ROISection from '@/components/sections/ROISection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import PricingSection from '@/components/sections/PricingSection';
import TransformationSection from '@/components/sections/TransformationSection';
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
          {/* Hero - Clear value proposition + CTA */}
          <HeroSection
            isLoaded={isLoaded}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* 3-Step Plan - Reduce fear, show simplicity */}
          <StepPlanSection />

          {/* Authority signals */}
          <SocialProofSection />

          {/* Q1: "Will this work for someone like me?" */}
          <TestimonialsSection />

          {/* Q2: "What is the risk? What are you not telling me?" */}
          <FAQSection />

          {/* Q3: "Is this worth the time, money, and effort?" */}
          <ROISection />

          {/* Product details for researchers */}
          <FeaturesSection />

          {/* Pricing — with clear value framing */}
          <PricingSection />

          {/* Q4: "What will my life actually look like after?" */}
          <TransformationSection />

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
