import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface Persona {
  title: string;
  description: string;
}

const icons = [
  // Founder / CEO
  <svg key="ceo" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  // COO / Ops Leader
  <svg key="coo" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>,
  // CFO / Head of Finance
  <svg key="cfo" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Head of Data / BI
  <svg key="data" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>,
];

const colorClasses = ['primary-cyan', 'deep-indigo', 'accent-magenta', 'primary-cyan'];

const getColorStyles = (colorClass: string) => {
  const colors: Record<string, { bg: string; text: string; border: string; hoverBg: string }> = {
    'primary-cyan': {
      bg: 'bg-primary-cyan/20',
      text: 'text-primary-cyan',
      border: 'border-primary-cyan/30',
      hoverBg: 'group-hover:bg-primary-cyan/30'
    },
    'deep-indigo': {
      bg: 'bg-deep-indigo/20',
      text: 'text-deep-indigo',
      border: 'border-deep-indigo/30',
      hoverBg: 'group-hover:bg-deep-indigo/30'
    },
    'accent-magenta': {
      bg: 'bg-accent-magenta/20',
      text: 'text-accent-magenta',
      border: 'border-accent-magenta/30',
      hoverBg: 'group-hover:bg-accent-magenta/30'
    }
  };
  return colors[colorClass] || colors['primary-cyan'];
};

const WhoItsForSection: React.FC = () => {
  const { t, tArray } = useTranslation();
  const personas = tArray<Persona>('whoItsFor.personas');

  return (
    <section className="py-24 px-4 section-gradient-cyan relative z-10" aria-label="Who Its For Section">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-text-primary">{t('whoItsFor.title1')}</span>
            <span className="heading-gradient-warm">
              {t('whoItsFor.titleHighlight')}
            </span>
            <span className="text-text-primary">{t('whoItsFor.title2')}</span>
          </h2>
        </div>

        {/* Persona Tiles */}
        <div className="grid md:grid-cols-2 gap-6">
          {personas.map((persona, index) => {
            const styles = getColorStyles(colorClasses[index] || 'primary-cyan');
            return (
              <div
                key={index}
                className="glass-panel p-8 hover:glass-glow-cyan transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-xl ${styles.bg} ${styles.border} border flex items-center justify-center flex-shrink-0 ${styles.text} ${styles.hoverBg} transition-colors`}>
                    {icons[index]}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${styles.text} mb-3`}>
                      {persona.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {persona.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoItsForSection;
