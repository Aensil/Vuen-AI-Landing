import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-4 section-gradient-cyan relative z-10" aria-label="Experience Section">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-text-primary">{t('experience.title1')}</span>
            <span className="heading-gradient">
              {t('experience.titleHighlight')}
            </span>
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - The Movie */}
          <div className="space-y-6">
            {/* First interaction */}
            <div className="glass-panel p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-cyan/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-muted text-sm mb-1">{t('experience.youSay')}</p>
                  <p className="text-text-primary text-lg font-medium">{t('experience.query1')}</p>
                </div>
              </div>

              <div className="ml-14 space-y-3">
                <p className="text-text-secondary text-sm font-medium">{t('experience.whatHappens')}</p>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-cyan mt-1">→</span>
                    <span>{t('experience.result1a')} <span className="text-primary-cyan font-semibold">{t('experience.result1aHighlight')}</span>{t('experience.result1aEnd')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-cyan mt-1">→</span>
                    <span>{t('experience.result1b')}<span className="text-primary-cyan font-semibold">{t('experience.result1bHighlight')}</span>{t('experience.result1bEnd')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-cyan mt-1">→</span>
                    <span><em className="text-text-primary">{t('experience.result1c')}</em></span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Second interaction */}
            <div className="glass-panel p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-deep-indigo/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-deep-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-muted text-sm mb-1">{t('experience.thenYouSay')}</p>
                  <p className="text-text-primary text-lg font-medium">{t('experience.query2')}</p>
                </div>
              </div>

              <div className="ml-14 space-y-3">
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-deep-indigo mt-1">→</span>
                    <span>{t('experience.result2a')}<span className="text-deep-indigo font-semibold">{t('experience.result2aHighlight')}</span>{t('experience.result2aEnd')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-deep-indigo mt-1">→</span>
                    <span>{t('experience.result2b')}<em className="text-text-primary">{t('experience.result2bQuote')}</em></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side - The Punchline */}
          <div className="lg:sticky lg:top-24">
            <div className="glass-panel p-10">
              {/* Visual representation */}
              <div className="mb-8 relative">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary-cyan via-deep-indigo to-accent-magenta opacity-80 animate-gradient-cycle bg-[length:400%_400%]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-void/80 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <p className="text-xl md:text-2xl text-text-primary font-bold text-center leading-relaxed">
                {t('experience.punchline1')}
                <span className="text-primary-cyan">{t('experience.punchlineHighlight')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Product demo embed */}
        <div className="mt-16 sm:mt-20 max-w-3xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden glass-panel">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/TS1T9m-HKk8"
                title="Vuen AI Product Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
          <p className="text-center text-xs text-text-muted mt-4">
            {t('experience.demoCaption')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
