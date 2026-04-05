import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface ProblemItem {
  text: string;
  detail: string;
}

const ProblemSection: React.FC = () => {
  const { t, tArray } = useTranslation();
  const problems = tArray<ProblemItem>('problem.items');

  return (
    <section className="py-24 px-4 section-gradient-magenta relative z-10" aria-label="Problem Section">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="heading-gradient-warm">
              {t('problem.title')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            {t('problem.subtitle')}
          </p>
        </div>

        {/* Problem Bullets */}
        <div className="space-y-4 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="glass-panel p-6 hover:glass-glow-magenta transition-all duration-300 group"
            >
              <p className="text-text-primary font-semibold text-lg mb-2 group-hover:text-accent-magenta transition-colors">
                {problem.text}
              </p>
              <p className="text-text-muted italic">
                {problem.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Punchline */}
        <div className="text-center">
          <p className="text-xl md:text-2xl font-bold text-text-primary">
            {t('problem.punchline1')}{' '}
            <span className="text-accent-magenta text-glow-magenta">
              {t('problem.punchline2')}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
