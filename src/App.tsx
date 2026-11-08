import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from '@/hooks/useLanguage';
import { ThemeProvider } from '@/hooks/useTheme';

// Eagerly load the main page for best initial load performance
import Index from '@/pages/Index';

// Lazy load other pages
const Privacy = lazy(() => import('@/pages/legal/Privacy'));
const Terms = lazy(() => import('@/pages/legal/Terms'));
const Security = lazy(() => import('@/pages/legal/Security'));

// Placeholder pages - will be implemented later
const ComingSoon = lazy(() => import('@/pages/ComingSoon'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-void flex items-center justify-center">
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-cyan via-deep-indigo to-accent-magenta opacity-80 animate-orb-breathe" />
  </div>
);

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Main landing page */}
              <Route path="/" element={<Index />} />

              {/* Product pages */}
              <Route path="/product" element={<ComingSoon pageName="Product" />} />

              {/* Use Cases */}
              <Route path="/use-cases" element={<ComingSoon pageName="Use Cases" />} />
              <Route path="/use-cases/founders-ceos" element={<ComingSoon pageName="Founders & CEOs" />} />
              <Route path="/use-cases/ops" element={<ComingSoon pageName="Operations" />} />
              <Route path="/use-cases/finance-bi" element={<ComingSoon pageName="Finance & BI" />} />
              <Route path="/use-cases/real-estate" element={<ComingSoon pageName="Real Estate" />} />

              {/* Pricing */}
              <Route path="/pricing" element={<ComingSoon pageName="Pricing" />} />

              {/* Early Access / Apply */}
              <Route path="/early-access" element={<ComingSoon pageName="Early Access" />} />
              <Route path="/apply" element={<ComingSoon pageName="Apply" />} />

              {/* Company pages */}
              <Route path="/about" element={<ComingSoon pageName="About" />} />
              <Route path="/careers" element={<ComingSoon pageName="Careers" />} />
              <Route path="/contact" element={<ComingSoon pageName="Contact" />} />

              {/* Legal pages */}
              <Route path="/legal/privacy" element={<Privacy />} />
              <Route path="/legal/terms" element={<Terms />} />
              <Route path="/legal/security" element={<Security />} />
              {/* Redirect old paths to new paths */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/security" element={<Security />} />

              {/* Spanish routes (placeholder) */}
              <Route path="/es" element={<ComingSoon pageName="Inicio" isSpanish />} />
              <Route path="/es/producto" element={<ComingSoon pageName="Producto" isSpanish />} />
              <Route path="/es/casos-de-uso" element={<ComingSoon pageName="Casos de Uso" isSpanish />} />

              {/* 404 fallback */}
              <Route path="*" element={<ComingSoon pageName="Page Not Found" is404 />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
