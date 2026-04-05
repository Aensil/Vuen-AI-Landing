import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/hooks/useTheme';

const TransformationSection: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const beforeItems = [
    t('transformation.before1'),
    t('transformation.before2'),
    t('transformation.before3'),
    t('transformation.before4'),
  ];

  const afterItems = [
    t('transformation.after1'),
    t('transformation.after2'),
    t('transformation.after3'),
    t('transformation.after4'),
  ];

  return (
    <section className="relative py-28 sm:py-32 px-6">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0, 229, 200, 0.04) 0%, transparent 60%)'
            : 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0, 196, 170, 0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs text-primary-cyan/70 font-semibold tracking-widest uppercase mb-4">
            {t('transformation.sectionLabel')}
          </p>
          <h2
            className={`font-bold tracking-tight mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3rem)', lineHeight: '1.15' }}
          >
            {t('transformation.title')}
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
            {t('transformation.subtitle')}
          </p>
        </div>

        {/* Before / After columns */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* BEFORE */}
          <div className={`
            p-8 rounded-2xl border
            ${theme === 'dark'
              ? 'bg-white/[0.02] border-accent-magenta/15'
              : 'bg-red-50/50 border-red-200/50'
            }
          `}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-accent-magenta/15' : 'bg-red-100'}`}>
                <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-accent-magenta' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-accent-magenta' : 'text-red-600'}`}>
                {t('transformation.beforeLabel')}
              </h3>
            </div>
            <ul className="space-y-4">
              {beforeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${theme === 'dark' ? 'bg-accent-magenta/50' : 'bg-red-300'}`} />
                  <span className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/55' : 'text-gray-600'}`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFTER */}
          <div className={`
            p-8 rounded-2xl border
            ${theme === 'dark'
              ? 'bg-white/[0.02] border-primary-cyan/15'
              : 'bg-emerald-50/50 border-emerald-200/50'
            }
          `}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-primary-cyan/15' : 'bg-emerald-100'}`}>
                <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-primary-cyan' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-primary-cyan' : 'text-emerald-600'}`}>
                {t('transformation.afterLabel')}
              </h3>
            </div>
            <ul className="space-y-4">
              {afterItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-primary-cyan' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/70' : 'text-gray-700'}`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing aspiration */}
        <div className="mt-14 text-center">
          <p className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('transformation.closingBefore')}{' '}
            <span className="bg-gradient-to-r from-primary-cyan to-deep-indigo bg-clip-text text-transparent">
              {t('transformation.closingAfter')}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
