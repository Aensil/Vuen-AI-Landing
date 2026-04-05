import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/hooks/useTheme';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const { t, tArray } = useTranslation();
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = tArray<FAQItem>('faq.items');

  return (
    <section className="relative py-28 sm:py-32 px-6">
      <div className="relative max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs text-primary-cyan/70 font-semibold tracking-widest uppercase mb-4">
            {t('faq.sectionLabel')}
          </p>
          <h2
            className={`font-bold tracking-tight mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3rem)', lineHeight: '1.15' }}
          >
            {t('faq.title')}
          </h2>
          <p className={`text-base sm:text-lg max-w-xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`
                  rounded-2xl border transition-all duration-300
                  ${theme === 'dark'
                    ? `bg-white/[0.03] ${isOpen ? 'border-primary-cyan/20' : 'border-white/[0.08]'}`
                    : `bg-gray-50 ${isOpen ? 'border-primary-cyan/30' : 'border-gray-200'}`
                  }
                `}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-base font-semibold pr-4 ${theme === 'dark' ? 'text-white/90' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`
                    overflow-hidden transition-all duration-300
                    ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <p className={`px-6 pb-6 text-sm leading-relaxed ${theme === 'dark' ? 'text-white/55' : 'text-gray-600'}`}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee banner */}
        <div className={`
          mt-12 p-8 rounded-2xl text-center border
          ${theme === 'dark'
            ? 'bg-gradient-to-br from-primary-cyan/5 to-deep-indigo/5 border-primary-cyan/15'
            : 'bg-gradient-to-br from-primary-cyan/5 to-deep-indigo/5 border-primary-cyan/20'
          }
        `}>
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-cyan/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-primary-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('faq.guaranteeTitle')}
          </h3>
          <p className={`text-sm leading-relaxed max-w-lg mx-auto ${theme === 'dark' ? 'text-white/55' : 'text-gray-600'}`}>
            {t('faq.guaranteeDescription')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
