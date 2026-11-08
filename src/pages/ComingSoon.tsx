import React from 'react';
import SEO from '@/components/SEO';
import ProductSwitcher from '@/components/ProductSwitcher';
import { visualDataAgentHref } from '@/config/products';
import { useLanguage } from '@/hooks/useLanguage';
import { seoConfig } from '@/config/site';

interface ComingSoonProps {
  pageName: string;
  isSpanish?: boolean;
  is404?: boolean;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ pageName, isSpanish = false, is404 = false }) => {
  const { currentLanguage } = useLanguage();

  const title = is404
    ? `404 - Page Not Found | ${seoConfig.default.siteName}`
    : `${pageName} - Coming Soon | ${seoConfig.default.siteName}`;

  const description = is404
    ? "The page you're looking for doesn't exist. Return to the Vuen AI homepage."
    : `The ${pageName} page is coming soon. In the meantime, explore Vuen AI's Visual Data Agent.`;

  return (
    <>
      <SEO
        language={isSpanish ? 'es' : currentLanguage}
        title={title}
        description={description}
        noindex={true}
      />

      <div className="min-h-screen bg-void text-text-primary flex flex-col">
        {/* Header */}
        <ProductSwitcher />
        <header className="py-6 px-4 border-b border-glass-border">
          <div className="max-w-4xl mx-auto">
            <a href={visualDataAgentHref()} className="inline-flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-cyan via-deep-indigo to-accent-magenta opacity-80 animate-orb-breathe" />
              <span className="text-xl font-bold">VUEN</span>
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-lg">
            {/* Animated orb */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary-cyan via-deep-indigo to-accent-magenta opacity-80 animate-orb-breathe shadow-lg shadow-primary-cyan/20" />

            {is404 ? (
              <>
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary-cyan to-accent-magenta bg-clip-text text-transparent">
                  404
                </h1>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  Page Not Found
                </h2>
                <p className="text-text-muted mb-8">
                  The page you're looking for doesn't exist or has been moved.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold mb-4 text-text-primary">
                  {pageName}
                </h1>
                <p className="text-xl text-text-secondary mb-2">
                  Coming Soon
                </p>
                <p className="text-text-muted mb-8">
                  We're working on this page. Check back soon or explore our main site.
                </p>
              </>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={visualDataAgentHref()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-cyan/10 border border-primary-cyan/30 text-primary-cyan hover:bg-primary-cyan/20 transition-all font-medium"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {isSpanish ? 'Volver al Inicio' : 'Back to Home'}
              </a>

              <a
                href={visualDataAgentHref('/#waitlist-section')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary-cyan to-deep-indigo text-white hover:opacity-90 transition-all font-medium"
              >
                {isSpanish ? 'Unirse a la Lista de Espera' : 'Join Waitlist'}
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 border-t border-glass-border">
          <div className="max-w-4xl mx-auto text-center text-sm text-text-muted">
            <p>&copy; {new Date().getFullYear()} Vuen AI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ComingSoon;
