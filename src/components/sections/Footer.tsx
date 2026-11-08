import React from 'react';
import { domains, contact } from '@/config/site';
import { visualDataAgentHref } from '@/config/products';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/hooks/useTheme';
import LogoWhite from '@/assets/Logo_Vuen_AI_white.png';
import LogoBlack from '@/assets/Logo_Vuen_AI_Black.png';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const footerLinks = {
    product: [
      { label: t('footer.features'), href: '#product' },
      { label: t('nav.pricing'), href: '#pricing' },
      { label: t('footer.useCases'), href: '/use-cases' },
      { label: t('footer.realEstateDemo'), href: 'https://real-estate.evalumine.com/', external: true },
    ],
    company: [
      { label: t('footer.about'), href: '/about' },
      { label: t('footer.contact'), href: `mailto:${contact.generalEmail}` },
      { label: t('footer.careers'), href: '/careers' },
    ],
    legal: [
      { label: t('footer.privacy'), href: '/legal/privacy' },
      { label: t('footer.terms'), href: '/legal/terms' },
      { label: t('footer.security'), href: '/legal/security' },
    ],
  };

  return (
    <footer className="relative py-16 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          {/* Brand column */}
          <div className="max-w-xs">
            <a href={visualDataAgentHref()} className="inline-block mb-4">
              <img
                src={theme === 'dark' ? LogoWhite : LogoBlack}
                alt="Vuen AI"
                className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
            <p className="text-sm text-white/45 leading-relaxed mb-5">
              {t('footer.tagline')}
            </p>
            {/* Social links — compact, 3 most relevant */}
            <div className="flex gap-3">
              <a
                href="https://x.com/vuen_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/15 transition-all"
                aria-label="Follow @vuen_ai on X"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/vuen-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/15 transition-all"
                aria-label="Vuen AI on LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links — more balanced columns */}
          <div className="flex flex-wrap gap-8 sm:gap-12 lg:gap-16">
            <div>
              <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-4">{t('footer.product')}</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <a
                      href={visualDataAgentHref(link.href)}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm text-white/40 hover:text-white/70 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-4">{t('footer.company')}</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <a
                      href={visualDataAgentHref(link.href)}
                      className="text-sm text-white/40 hover:text-white/70 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <a
                      href={visualDataAgentHref(link.href)}
                      className="text-sm text-white/40 hover:text-white/70 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-white/25">
            &copy; {currentYear} Vuen AI. {t('footer.copyright')}
          </p>
          <a
            href={domains.app}
            className="
              inline-flex items-center gap-2 px-4 py-2 rounded-full
              text-xs text-white/50 font-medium
              bg-white/[0.03] border border-white/[0.06]
              hover:bg-white/[0.06] hover:text-white/70 transition-all
            "
          >
            {t('common.openApp')}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
