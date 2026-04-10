import React from 'react';
import { domains } from '@/config/site';
import { useTranslation } from '@/hooks/useTranslation';

const CTASection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-28 sm:py-32 px-6">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0, 229, 200, 0.06) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Headline — larger, distinct from other sections */}
        <h2
          className="font-bold text-white mb-6 tracking-tight"
          style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3rem)', lineHeight: '1.15' }}
        >
          {t('cta.title')}
        </h2>

        <p className="text-base sm:text-lg text-white/50 mb-10 max-w-lg mx-auto leading-relaxed">
          {t('cta.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={domains.app}
            className="
              group px-8 py-4 text-base font-semibold text-white keep-white
              rounded-full
              bg-primary-cyan
              hover:bg-primary-cyan-bright
              transition-all duration-300
              hover:shadow-[0_0_30px_rgba(0,229,200,0.25)]
            "
          >
            <span className="flex items-center gap-2">
              {t('common.startFreeTrial')}
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
            href={`mailto:hello@evalumine.com?subject=Enterprise%20Demo%20Request`}
            className="
              px-8 py-4 text-base font-medium text-white/60
              border border-white/10 rounded-full
              hover:text-white/80 hover:border-white/20
              transition-all duration-300
            "
          >
            {t('common.requestDemo')}
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs text-white/35">
          {[
            t('cta.badges.noCard'),
            t('cta.badges.trial'),
            t('cta.badges.cancel'),
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary-cyan/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
