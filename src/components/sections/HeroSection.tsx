import React, { useEffect, useState, useRef } from 'react';
import { domains } from '@/config/site';
import { useTranslation } from '@/hooks/useTranslation';
import OrbToGraphsAnimation from '@/components/OrbToGraphsAnimation';

interface HeroSectionProps {
  isLoaded: boolean;
  idleTime?: number;
  prefersReducedMotion: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  isLoaded,
  prefersReducedMotion
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] landscape:min-h-[100vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-[132px] sm:pt-[148px] pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Ambient gradient background — responds to mouse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 40%, rgba(0, 229, 200, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 60% 35%, rgba(124, 92, 250, 0.05) 0%, transparent 50%)
          `,
          transform: prefersReducedMotion
            ? 'none'
            : `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
          transition: 'transform 0.6s ease-out',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div
          className={`
            inline-flex items-center gap-2 px-4 py-2 mb-10
            rounded-full border border-white/10 bg-white/[0.03]
            transition-all duration-700 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-cyan" />
          </span>
          <span className="text-sm text-white/60 font-medium">
            {t('hero.badge')}
          </span>
        </div>

        {/* The Orb → BI Graphs animation — demonstrates voice-to-dashboard */}
        <div
          className={`
            mx-auto mb-10 sm:mb-12
            transition-all duration-1000 delay-100 ease-out
            ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          `}
        >
          <OrbToGraphsAnimation
            prefersReducedMotion={prefersReducedMotion}
            isLoaded={isLoaded}
          />
        </div>

        {/* Main Headline */}
        <h1
          className={`
            font-bold tracking-tight leading-[0.95]
            mb-6
            transition-all duration-700 delay-200 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
          style={{
            fontSize: 'clamp(2.25rem, 5vw + 1rem, 5rem)',
          }}
        >
          <span className="block text-white">
            {t('hero.headline1')}
          </span>
          <span
            className="block mt-2 bg-gradient-to-r from-primary-cyan via-deep-indigo to-accent-magenta bg-clip-text text-transparent"
            style={{ backgroundSize: '200% 100%' }}
          >
            {t('hero.headline2')}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className={`
            text-base sm:text-lg md:text-xl text-white/60 font-light
            max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-12
            leading-relaxed [text-wrap:balance]
            transition-all duration-700 delay-300 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          {t('hero.subheadline')}
        </p>

        {/* CTAs */}
        <div
          className={`
            flex flex-col sm:flex-row items-center justify-center gap-4
            transition-all duration-700 delay-[400ms] ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <a
            href={domains.app}
            className="
              group relative px-8 py-4 text-base font-semibold text-white keep-white
              rounded-full overflow-hidden
              bg-gradient-to-r from-primary-cyan to-deep-indigo
              transition-all duration-500 ease-out
              hover:shadow-[0_0_40px_rgba(0,229,200,0.35)]
              hover:scale-[1.03]
              active:scale-100
            "
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('hero.cta')}
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
          <a
            href="https://www.youtube.com/watch?v=TS1T9m-HKk8"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:py-4
              text-white/60 hover:text-white/90
              transition-colors duration-300
              border border-white/10 rounded-full
              hover:border-white/20
            "
          >
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="font-medium text-sm sm:text-base">{t('common.watchDemo')}</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2
          transition-all duration-700 delay-[1500ms] ease-out
          ${isLoaded ? 'opacity-40' : 'opacity-0'}
        `}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/30 uppercase tracking-widest">{t('hero.scroll')}</span>
          <div className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-2">
            <div
              className={`w-1 h-2 rounded-full bg-white/30 ${!prefersReducedMotion ? 'animate-bounce' : ''}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
