import React, { useState } from 'react';
import { domains } from '@/config/site';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/hooks/useTheme';

interface PricingSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const PricingSection: React.FC<PricingSectionProps> = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const { t, tArray } = useTranslation();
  const { theme } = useTheme();

  const comparisonData = [
    {
      category: t('pricing.comparison.categories.usage'),
      rows: [
        { feature: t('pricing.comparison.rows.aiInteractions'), free: '40', pro: '600', enterprise: t('pricing.comparison.unlimited') },
        { feature: t('pricing.comparison.rows.storage'), free: '1 GB', pro: '50 GB', enterprise: t('pricing.comparison.unlimited') },
        { feature: t('pricing.comparison.rows.dashboards'), free: '2', pro: t('pricing.comparison.unlimited'), enterprise: t('pricing.comparison.unlimited') },
        { feature: t('pricing.comparison.rows.sqlConnections'), free: false, pro: '5', enterprise: t('pricing.comparison.unlimited') },
        { feature: t('pricing.comparison.rows.overageRate'), free: false, pro: t('pricing.comparison.overageProRate'), enterprise: t('pricing.comparison.custom') },
      ],
    },
    {
      category: t('pricing.comparison.categories.dataSources'),
      rows: [
        { feature: t('pricing.comparison.rows.fileUpload'), free: true, pro: true, enterprise: true },
        { feature: t('pricing.comparison.rows.sqlDatabases'), free: false, pro: true, enterprise: true },
        { feature: t('pricing.comparison.rows.apiConnections'), free: false, pro: false, enterprise: true },
      ],
    },
    {
      category: t('pricing.comparison.categories.features'),
      rows: [
        { feature: t('pricing.comparison.rows.basicViz'), free: true, pro: true, enterprise: true },
        { feature: t('pricing.comparison.rows.advancedViz'), free: false, pro: true, enterprise: true },
        { feature: t('pricing.comparison.rows.voiceInterface'), free: false, pro: true, enterprise: true },
        { feature: t('pricing.comparison.rows.aiInsights'), free: false, pro: true, enterprise: true },
        { feature: t('pricing.comparison.rows.apiAccess'), free: false, pro: true, enterprise: true },
      ],
    },
    {
      category: t('pricing.comparison.categories.support'),
      rows: [
        { feature: t('pricing.comparison.rows.communitySupport'), free: true, pro: true, enterprise: true },
        { feature: t('pricing.comparison.rows.prioritySupport'), free: false, pro: true, enterprise: true },
        { feature: t('pricing.comparison.rows.dedicatedManager'), free: false, pro: false, enterprise: true },
        { feature: t('pricing.comparison.rows.ssoSaml'), free: false, pro: false, enterprise: true },
        { feature: t('pricing.comparison.rows.slaGuarantee'), free: false, pro: false, enterprise: true },
        { feature: t('pricing.comparison.rows.onPremise'), free: false, pro: false, enterprise: true },
        { feature: t('pricing.comparison.rows.advancedSecurity'), free: false, pro: false, enterprise: true },
      ],
    },
  ];

  const renderCellValue = (value: boolean | string) => {
    if (typeof value === 'string') {
      return <span className="text-sm text-white/70">{value}</span>;
    }
    if (value) {
      return (
        <svg className="w-5 h-5 text-primary-cyan mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    return <span className="text-white/20 text-sm">—</span>;
  };

  const plans = [
    {
      name: t('pricing.plans.free.name'),
      description: t('pricing.plans.free.description'),
      price: { monthly: 0, annual: 0 },
      features: tArray<string>('pricing.plans.free.features'),
      cta: t('pricing.plans.free.cta'),
      href: `${domains.app}/signup`,
      highlight: false,
    },
    {
      name: t('pricing.plans.pro.name'),
      description: t('pricing.plans.pro.description'),
      price: { monthly: 200, annual: 170 },
      features: tArray<string>('pricing.plans.pro.features'),
      cta: t('pricing.plans.pro.cta'),
      href: `${domains.app}/signup?plan=pro`,
      highlight: true,
      badge: t('pricing.plans.pro.badge'),
    },
    {
      name: t('pricing.plans.enterprise.name'),
      description: t('pricing.plans.enterprise.description'),
      price: { monthly: null, annual: null },
      priceLabel: t('pricing.plans.enterprise.priceLabel'),
      features: tArray<string>('pricing.plans.enterprise.features'),
      cta: t('pricing.plans.enterprise.cta'),
      href: `mailto:hello@evalumine.com?subject=Enterprise%20Inquiry`,
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-32 px-6">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: theme === 'dark'
            ? `
              radial-gradient(ellipse 80% 50% at 50% 100%, rgba(124, 92, 250, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 20% 80%, rgba(0, 229, 200, 0.05) 0%, transparent 50%)
            `
            : `
              radial-gradient(ellipse 80% 50% at 50% 100%, rgba(107, 79, 232, 0.05) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 20% 80%, rgba(0, 196, 170, 0.04) 0%, transparent 50%)
            `,
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header — distinct typographic scale */}
        <div className="text-center mb-16">
          <p className="text-xs text-deep-indigo-bright font-semibold tracking-widest uppercase mb-4">
            {t('nav.pricing')}
          </p>
          <h2
            className="font-bold text-white mb-6 tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3rem)', lineHeight: '1.15' }}
          >
            {t('pricing.title')}
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            {t('pricing.subtitle')}
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-2 sm:gap-4 p-1.5 rounded-full bg-white/[0.03] border border-white/10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`
                px-4 sm:px-5 py-2.5 sm:py-3 min-h-[44px] rounded-full text-sm font-medium transition-all duration-300
                ${!isAnnual
                  ? 'bg-white text-void'
                  : 'text-white/60 hover:text-white'
                }
              `}
            >
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`
                px-4 sm:px-5 py-2.5 sm:py-3 min-h-[44px] rounded-full text-sm font-medium transition-all duration-300
                ${isAnnual
                  ? 'bg-white text-void'
                  : 'text-white/60 hover:text-white'
                }
              `}
            >
              {t('pricing.annual')}
              <span className="ml-1.5 sm:ml-2 text-xs text-status-success">{t('pricing.save20')}</span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative rounded-2xl p-8 transition-all duration-500
                ${plan.highlight
                  ? 'border-2 border-primary-cyan/30 scale-[1.02] shadow-[0_0_60px_rgba(0,229,200,0.15)]'
                  : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
                }
              `}
              style={plan.highlight ? {
                background: theme === 'dark'
                  ? 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))'
                  : 'linear-gradient(to bottom, rgba(0,0,0,0.03), rgba(0,0,0,0.01))',
              } : undefined}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-xs font-semibold text-void bg-primary-cyan rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-white/40">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                {plan.priceLabel ? (
                  <div className="text-4xl font-bold text-white">{plan.priceLabel}</div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    {plan.price.monthly !== 0 && (
                      <span className="text-white/40">{t('pricing.perMonth')}</span>
                    )}
                  </div>
                )}
                {plan.price.monthly !== 0 && plan.price.annual !== null && (
                  <p className="text-sm text-white/30 mt-2">
                    {isAnnual ? t('pricing.billedAnnually') : t('pricing.billedMonthly')}
                  </p>
                )}
              </div>

              {/* CTA */}
              <a
                href={plan.href}
                className={`
                  block w-full py-3 px-6 rounded-full text-center font-semibold
                  transition-all duration-300
                  ${plan.highlight
                    ? 'bg-gradient-to-r from-primary-cyan to-deep-indigo text-white keep-white hover:shadow-[0_0_30px_rgba(0,229,200,0.4)] hover:scale-[1.02]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }
                `}
              >
                {plan.cta}
              </a>

              {/* Features */}
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-primary-cyan' : 'text-white/40'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/60">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            {t('pricing.comparison.title')}
          </h3>

          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 w-[40%]"></th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-white/70">
                    {t('pricing.plans.free.name')}
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-primary-cyan">
                    {t('pricing.plans.pro.name')}
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-white/70">
                    {t('pricing.plans.enterprise.name')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((section) => (
                  <React.Fragment key={section.category}>
                    <tr>
                      <td
                        colSpan={4}
                        className="pt-8 pb-3 px-4 text-xs font-semibold uppercase tracking-wider text-white/30"
                      >
                        {section.category}
                      </td>
                    </tr>
                    {section.rows.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={`
                          border-b border-white/[0.04]
                          ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}
                        `}
                      >
                        <td className="py-3.5 px-4 text-sm text-white/50">
                          {row.feature}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderCellValue(row.free)}
                        </td>
                        <td className="py-3.5 px-4 text-center bg-primary-cyan/[0.03]">
                          {renderCellValue(row.pro)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderCellValue(row.enterprise)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-white/30 mt-12">
          {t('pricing.bottomNote')}
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
