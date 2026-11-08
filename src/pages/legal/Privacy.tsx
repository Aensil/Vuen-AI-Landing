import React from 'react';
import SEO from '@/components/SEO';
import ProductSwitcher from '@/components/ProductSwitcher';
import { visualDataAgentHref } from '@/config/products';
import { useLanguage } from '@/hooks/useLanguage';
import { contact } from '@/config/site';

const Privacy: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const lastUpdated = 'November 30, 2025';

  return (
    <>
      <SEO language={currentLanguage} page="privacy" />

      <div className="min-h-screen bg-void text-text-primary">
        {/* Header */}
        <ProductSwitcher />
        <header className="py-6 px-4 border-b border-glass-border">
          <div className="max-w-4xl mx-auto">
            <a href={visualDataAgentHref()} className="inline-flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-cyan via-deep-indigo to-accent-magenta opacity-80" />
              <span className="text-xl font-bold">VUEN</span>
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-text-muted mb-12">Last updated: {lastUpdated}</p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Introduction</h2>
                <p className="text-text-secondary leading-relaxed">
                  Vuen AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Visual Data Agent platform and related services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Information We Collect</h2>
                <div className="space-y-4 text-text-secondary">
                  <p className="leading-relaxed">We may collect the following types of information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-text-primary">Account Information:</strong> Name, email address, company name, and job title when you sign up for our services.</li>
                    <li><strong className="text-text-primary">Usage Data:</strong> Information about how you interact with our platform, including queries, visualizations generated, and feature usage.</li>
                    <li><strong className="text-text-primary">Technical Data:</strong> IP address, browser type, device information, and access times.</li>
                    <li><strong className="text-text-primary">Business Data:</strong> Data you connect to Vuen AI for analysis purposes, which remains under your control and ownership.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">3. How We Use Your Information</h2>
                <div className="space-y-4 text-text-secondary">
                  <p className="leading-relaxed">We use the collected information for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Providing and improving our Visual Data Agent services</li>
                    <li>Processing voice queries and generating data visualizations</li>
                    <li>Communicating with you about updates, features, and support</li>
                    <li>Analyzing usage patterns to enhance user experience</li>
                    <li>Ensuring security and preventing fraud</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Data Security</h2>
                <p className="text-text-secondary leading-relaxed">
                  We implement industry-standard security measures to protect your data. This includes encryption in transit and at rest, access controls, and regular security audits. Your business data is processed in secure environments and is never shared with third parties without your explicit consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Data Retention</h2>
                <p className="text-text-secondary leading-relaxed">
                  We retain your information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time by contacting us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Your Rights</h2>
                <div className="space-y-4 text-text-secondary">
                  <p className="leading-relaxed">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and receive a copy of your personal data</li>
                    <li>Correct inaccurate personal data</li>
                    <li>Request deletion of your personal data</li>
                    <li>Object to or restrict processing of your data</li>
                    <li>Data portability</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Third-Party Services</h2>
                <p className="text-text-secondary leading-relaxed">
                  Our platform may integrate with third-party services for data connectivity. These integrations are governed by their respective privacy policies. We only access the data necessary for providing our visualization services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">8. Cookies and Tracking</h2>
                <p className="text-text-secondary leading-relaxed">
                  We use essential cookies to maintain session state and provide our services. We may use analytics cookies to understand how our platform is used. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">9. Changes to This Policy</h2>
                <p className="text-text-secondary leading-relaxed">
                  We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">10. Contact Us</h2>
                <p className="text-text-secondary leading-relaxed">
                  If you have questions about this Privacy Policy or our data practices, please contact us at:{' '}
                  <a href={`mailto:${contact.email}`} className="text-primary-cyan hover:underline">
                    {contact.email}
                  </a>
                </p>
              </section>
            </div>

            {/* Back to home */}
            <div className="mt-16 pt-8 border-t border-glass-border">
              <a
                href={visualDataAgentHref()}
                className="inline-flex items-center gap-2 text-text-muted hover:text-primary-cyan transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Privacy;
