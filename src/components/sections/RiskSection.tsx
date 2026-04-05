import React from 'react';
import { domains } from '@/config/site';
import { useTranslation } from '@/hooks/useTranslation';

interface RiskItem {
  question: string;
  answer: string;
}

const RiskSection: React.FC = () => {
  const { t, tArray } = useTranslation();
  const objections = tArray<RiskItem>('risk.items');

  return (
    <section id="faq" className="py-24 px-4 void-gradient relative z-10" aria-label="FAQ Section">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs text-accent-magenta/70 font-semibold tracking-widest uppercase mb-4">
            {t('risk.sectionLabel')}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="heading-gradient-warm">
              {t('risk.title')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed">
            {t('risk.subtitle')}
          </p>
        </div>

        {/* Objections */}
        <div className="space-y-4">
          {objections.map((item, index) => (
            <div
              key={index}
              className="glass-panel p-6 sm:p-7 hover:glass-glow-magenta transition-all duration-300 group"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-accent-magenta transition-colors">
                {item.question}
              </h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom trust reinforcement */}
        <div className="mt-12 text-center">
          <p className="text-text-muted text-sm mb-6">
            {t('risk.bottomText')}
          </p>
          <a
            href={domains.app}
            className="
              inline-flex items-center gap-2 px-6 py-3
              text-sm font-medium text-text-secondary
              glass-panel hover:glass-glow-cyan
              rounded-full
              transition-all duration-300
            "
          >
            {t('risk.bottomCta')}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RiskSection;
