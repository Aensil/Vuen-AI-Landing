import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
}

const TestimonialsSection: React.FC = () => {
  const { t, tArray } = useTranslation();
  const testimonials = tArray<Testimonial>('testimonials.items');

  return (
    <section className="relative py-28 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header — Q1: Will this work for someone like me? */}
        <div className="text-center mb-16">
          <p className="text-xs text-primary-cyan/70 font-semibold tracking-widest uppercase mb-4">
            {t('testimonials.sectionLabel')}
          </p>
          <h2
            className="font-bold text-white tracking-tight mb-6"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.5rem, 2.5rem)', lineHeight: '1.2' }}
          >
            {t('testimonials.title')}
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials grid — better contrast, clearer hierarchy */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="
                p-7 rounded-2xl
                bg-white/[0.03] border border-white/[0.08]
                hover:border-white/15
                transition-all duration-300
              "
            >
              {/* Metric badge */}
              <div className="inline-block px-3 py-1.5 rounded-full bg-primary-cyan/10 text-primary-cyan text-xs font-semibold mb-5">
                {testimonial.metric}
              </div>

              {/* Quote — improved readability */}
              <blockquote className="text-white/70 text-sm leading-relaxed mb-7">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-cyan/30 to-deep-indigo/30 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white/70">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white/90">{testimonial.author}</div>
                  <div className="text-xs text-white/40">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges — cleaner layout */}
        <div className="mt-20 pt-10 border-t border-white/[0.06]">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              { label: t('testimonials.trustBadges.soc2'), icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { label: t('testimonials.trustBadges.gdpr'), icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
              { label: t('testimonials.trustBadges.uptime'), icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
              { label: t('testimonials.trustBadges.sso'), icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-white/35">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={badge.icon} />
                </svg>
                <span className="text-xs font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
