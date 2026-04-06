import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/hooks/useTheme';

const StepPlanSection: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const steps = [
    {
      number: '1',
      title: t('stepPlan.step1Title'),
      description: t('stepPlan.step1Description'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
    },
    {
      number: '2',
      title: t('stepPlan.step2Title'),
      description: t('stepPlan.step2Description'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      number: '3',
      title: t('stepPlan.step3Title'),
      description: t('stepPlan.step3Description'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="relative py-28 sm:py-32 px-6">
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs text-primary-cyan/70 font-semibold tracking-widest uppercase mb-4">
            {t('stepPlan.stepLabel')} 1-2-3
          </p>
          <h2
            className={`font-bold tracking-tight mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3rem)', lineHeight: '1.15' }}
          >
            {t('stepPlan.title')}
          </h2>
          <p className={`text-base ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'} max-w-lg mx-auto`}>
            {t('stepPlan.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              {/* Step number */}
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary-cyan to-deep-indigo flex items-center justify-center text-white">
                {step.icon}
              </div>

              {/* Step number label */}
              <div className="text-xs font-semibold text-primary-cyan uppercase tracking-widest mb-2">
                {t('stepPlan.stepLabel')} {step.number}
              </div>

              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {step.title}
              </h3>
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepPlanSection;
