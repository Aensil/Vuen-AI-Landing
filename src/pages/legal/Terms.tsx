import React from 'react';
import SEO from '@/components/SEO';
import ProductSwitcher from '@/components/ProductSwitcher';
import { visualDataAgentHref } from '@/config/products';
import { useLanguage } from '@/hooks/useLanguage';
import { contact } from '@/config/site';

const Terms: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const lastUpdated = 'November 30, 2025';

  return (
    <>
      <SEO language={currentLanguage} page="terms" />

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
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-text-muted mb-12">Last updated: {lastUpdated}</p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Acceptance of Terms</h2>
                <p className="text-text-secondary leading-relaxed">
                  By accessing or using Vuen AI's Visual Data Agent platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Description of Service</h2>
                <p className="text-text-secondary leading-relaxed">
                  Vuen AI provides a voice-first Visual Data Agent that enables users to interact with their business data through spoken queries and receive real-time visualizations, charts, and insights. The Service includes data connectivity, voice processing, visualization generation, and related features.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">3. User Accounts</h2>
                <div className="space-y-4 text-text-secondary">
                  <p className="leading-relaxed">To access the Service, you must:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create an account with accurate and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Be at least 18 years old or have legal authority to enter agreements</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Your Data</h2>
                <div className="space-y-4 text-text-secondary">
                  <p className="leading-relaxed">
                    You retain all ownership rights to the data you connect to Vuen AI. By using our Service:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You grant us permission to access and process your data solely to provide the Service</li>
                    <li>You are responsible for ensuring you have rights to use the data you connect</li>
                    <li>We will not sell, share, or use your data for purposes other than providing the Service</li>
                    <li>You may request deletion of your data at any time</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Acceptable Use</h2>
                <div className="space-y-4 text-text-secondary">
                  <p className="leading-relaxed">You agree not to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use the Service for any unlawful purpose</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt the Service</li>
                    <li>Reverse engineer or attempt to extract source code</li>
                    <li>Use the Service to process data you don't have rights to use</li>
                    <li>Resell or redistribute the Service without authorization</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Pricing and Payment</h2>
                <div className="space-y-4 text-text-secondary">
                  <p className="leading-relaxed">
                    Current pricing is available on our website. By subscribing to paid plans:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You agree to pay all fees according to the selected plan</li>
                    <li>Fees are non-refundable except as required by law</li>
                    <li>We may change pricing with 30 days' notice</li>
                    <li>Your subscription will auto-renew unless cancelled</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Service Availability</h2>
                <p className="text-text-secondary leading-relaxed">
                  We strive to maintain high availability but do not guarantee uninterrupted access. We may perform maintenance or updates that temporarily affect availability. We are not liable for any losses resulting from service interruptions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">8. Intellectual Property</h2>
                <p className="text-text-secondary leading-relaxed">
                  The Service, including its design, features, and underlying technology, is owned by Vuen AI and protected by intellectual property laws. You may not copy, modify, or create derivative works without our written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">9. Limitation of Liability</h2>
                <p className="text-text-secondary leading-relaxed">
                  To the maximum extent permitted by law, Vuen AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">10. Disclaimer of Warranties</h2>
                <p className="text-text-secondary leading-relaxed">
                  The Service is provided "as is" without warranties of any kind. We do not guarantee that insights or visualizations are error-free. You are responsible for verifying results and making business decisions based on your own judgment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">11. Termination</h2>
                <p className="text-text-secondary leading-relaxed">
                  Either party may terminate this agreement at any time. We may suspend or terminate your access if you violate these terms. Upon termination, your right to use the Service ends, and we may delete your data after a reasonable period.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">12. Changes to Terms</h2>
                <p className="text-text-secondary leading-relaxed">
                  We may modify these Terms at any time. Material changes will be communicated via email or through the Service. Continued use after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">13. Governing Law</h2>
                <p className="text-text-secondary leading-relaxed">
                  These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">14. Contact</h2>
                <p className="text-text-secondary leading-relaxed">
                  For questions about these Terms of Service, please contact us at:{' '}
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

export default Terms;
