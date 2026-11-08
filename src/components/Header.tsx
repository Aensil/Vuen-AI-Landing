import React, { useState, useEffect } from 'react';
import { domains } from '@/config/site';
import { visualDataAgentHref } from '@/config/products';
import ProductSwitcher from '@/components/ProductSwitcher';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/hooks/useTheme';
import LogoWhite from '@/assets/Logo_Vuen_AI_white.png';
import LogoBlack from '@/assets/Logo_Vuen_AI_Black.png';

const ThemeToggle: React.FC = () => {
  const { theme, preference, setPreference } = useTheme();

  const cycle = () => {
    const next: Record<string, 'dark' | 'light' | 'system'> = {
      system: 'light',
      light: 'dark',
      dark: 'system',
    };
    setPreference(next[preference]);
  };

  return (
    <button
      onClick={cycle}
      className="
        relative w-9 h-9 flex items-center justify-center rounded-lg
        hover:bg-white/5 active:bg-white/10 transition-colors
      "
      aria-label={`Theme: ${preference}. Click to change.`}
      title={`Theme: ${preference}`}
    >
      {/* Sun icon */}
      <svg
        className={`w-[18px] h-[18px] absolute transition-all duration-300 ${
          theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      {/* Moon icon */}
      <svg
        className={`w-[18px] h-[18px] absolute transition-all duration-300 ${
          theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
      {/* System indicator dot */}
      {preference === 'system' && (
        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-cyan" />
      )}
    </button>
  );
};

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.product'), href: '#product' },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${isScrolled
          ? 'bg-void/80 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'bg-transparent'
        }
      `}
    >
      <ProductSwitcher />
      <nav className={`max-w-7xl mx-auto px-6 flex items-center justify-between ${isScrolled ? 'py-3' : 'pt-6 pb-4'}`}>
        {/* Logo */}
        <a
          href={visualDataAgentHref()}
          className="flex items-center group"
        >
          <img
            src={theme === 'dark' ? LogoWhite : LogoBlack}
            alt="Vuen AI"
            className="h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="
                relative px-4 py-2 text-sm font-medium text-white/70
                hover:text-white transition-colors duration-300
                group
              "
            >
              {label}
              <span
                className="
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  w-0 h-[2px] bg-gradient-to-r from-primary-cyan to-accent-magenta
                  group-hover:w-full transition-all duration-300 ease-out
                "
              />
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href={domains.app}
            className="
              px-4 py-2 text-sm font-medium text-white/80
              hover:text-white transition-colors duration-300
            "
          >
            {t('common.logIn')}
          </a>
          <a
            href={domains.app}
            className="
              relative px-5 py-2.5 text-sm font-semibold text-white keep-white
              rounded-full overflow-hidden
              bg-gradient-to-r from-primary-cyan via-deep-indigo to-accent-magenta
              bg-[length:200%_100%] bg-left
              hover:bg-right
              transition-all duration-500 ease-out
              hover:shadow-[0_0_30px_rgba(0,229,200,0.4)]
              hover:scale-105
              active:scale-100
              group
            "
          >
            <span className="relative z-10">{t('common.startFree')}</span>
            <div
              className="
                absolute inset-0 bg-gradient-to-r from-accent-magenta via-deep-indigo to-primary-cyan
                opacity-0 group-hover:opacity-100
                transition-opacity duration-500
              "
            />
          </a>
        </div>

        {/* Mobile Theme Toggle + Menu Button */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="visual-data-agent-mobile-menu"
        >
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <span
              className={`
                w-full h-0.5 bg-white rounded-full transform transition-all duration-300
                ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}
              `}
            />
            <span
              className={`
                w-full h-0.5 bg-white rounded-full transition-all duration-300
                ${isMobileMenuOpen ? 'opacity-0 scale-0' : ''}
              `}
            />
            <span
              className={`
                w-full h-0.5 bg-white rounded-full transform transition-all duration-300
                ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}
              `}
            />
          </div>
        </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="visual-data-agent-mobile-menu"
        className={`
          md:hidden absolute top-full left-0 right-0
          bg-void/95 backdrop-blur-2xl border-b border-white/[0.06]
          transition-all duration-500 ease-out overflow-hidden
          ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-6 py-6 flex flex-col gap-2">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-lg font-medium text-white/80 hover:text-white active:bg-white/5 transition-colors py-3 min-h-[44px] flex items-center rounded-lg px-2 -mx-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-white/10">
            <a
              href={domains.app}
              className="text-center py-3.5 min-h-[48px] flex items-center justify-center text-white/80 font-medium rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors"
            >
              {t('common.logIn')}
            </a>
            <a
              href={domains.app}
              className="
                text-center py-3.5 min-h-[48px] flex items-center justify-center px-6 font-semibold text-white keep-white
                rounded-full
                bg-gradient-to-r from-primary-cyan via-deep-indigo to-accent-magenta
              "
            >
              {t('common.startFree')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
