import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/hooks/useTheme';

const ROISection: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const metrics = [
    {
      value: t('roi.metric1Value'),
      label: t('roi.metric1Label'),
      detail: t('roi.metric1Detail'),
      color: 'from-primary-cyan to-deep-indigo',
    },
    {
      value: t('roi.metric2Value'),
      label: t('roi.metric2Label'),
      detail: t('roi.metric2Detail'),
      color: 'from-deep-indigo to-accent-magenta',
    },
    {
      value: t('roi.metric3Value'),
      label: t('roi.metric3Label'),
      detail: t('roi.metric3Detail'),
      color: 'from-primary-cyan to-deep-indigo',
    },
  ];

  return (
    <section className="relative py-28 sm:py-32 px-6">
      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-primary-cyan/70 font-semibold tracking-widest uppercase mb-4">
            {t('roi.sectionLabel')}
          </p>
          <h2
            className={`font-bold tracking-tight mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3rem)', lineHeight: '1.15' }}
          >
            {t('roi.title')}
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
            {t('roi.subtitle')}
          </p>
        </div>

        {/* ROI metrics */}
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className={`
                p-7 rounded-2xl text-center border
                ${theme === 'dark'
                  ? 'bg-white/[0.03] border-white/[0.08] hover:border-white/15'
                  : 'bg-white border-gray-200 hover:border-gray-300'
                }
                transition-all duration-300
              `}
            >
              <div className={`text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                {metric.value}
              </div>
              <div className={`text-base font-semibold mb-2 ${theme === 'dark' ? 'text-white/90' : 'text-gray-900'}`}>
                {metric.label}
              </div>
              <div className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/45' : 'text-gray-500'}`}>
                {metric.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Cost comparison callout */}
        <div className={`
          mt-12 p-8 rounded-2xl text-center border
          ${theme === 'dark'
            ? 'bg-white/[0.02] border-white/[0.06]'
            : 'bg-gray-50 border-gray-200'
          }
        `}>
          <p className={`text-lg sm:text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white/90' : 'text-gray-900'}`}>
            {t('roi.comparisonTitle')}
          </p>
          <p className={`text-sm leading-relaxed max-w-2xl mx-auto ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
            {t('roi.comparisonDescription')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ROISection;
