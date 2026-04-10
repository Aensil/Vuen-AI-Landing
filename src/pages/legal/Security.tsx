import React from 'react';
import SEO from '@/components/SEO';
import { useLanguage } from '@/hooks/useLanguage';
import { contact } from '@/config/site';

const Security: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const lastUpdated = 'November 29, 2024';

  return (
    <>
      <SEO language={currentLanguage} page="security" />

      <div className="min-h-screen bg-void text-text-primary">
        {/* Header */}
        <header className="py-6 px-4 border-b border-glass-border">
          <div className="max-w-4xl mx-auto">
            <a href="/" className="inline-flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-cyan via-deep-indigo to-accent-magenta opacity-80" />
              <span className="text-xl font-bold">VUEN</span>
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Security</h1>
            <p className="text-text-muted mb-12">Last updated: {lastUpdated}</p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Our Commitment to Security</h2>
                <p className="text-text-secondary leading-relaxed">
                  At Vuen AI, security is foundational to everything we build. We understand that you're trusting us with your business data, and we take that responsibility seriously. Our security practices are designed to protect your data at every layer of our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Data Encryption</h2>
                <div className="space-y-4 text-text-secondary">
                  <p className="leading-relaxed">We implement robust encryption throughout our platform:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-text-primary">In Transit:</strong> All data transmitted between your devices and our servers is encrypted using TLS 1.3.</li>
                    <li><strong className="text-text-primary">At Rest:</strong> All stored data is encrypted using AES-256 encryption.</li>
                    <li><strong className="text-text-primary">Voice Data:</strong> Voice queries are processed in real-time and not permanently stored unless explicitly requested.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">3. Infrastructure Security</h2>
                <div className="space-y-4 text-text-secondary">
                  <p className="leading-relaxed">Our infrastructure is built with security-first principles:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Hosted on enterprise-grade cloud infrastructure with SOC 2 compliance</li>
                    <li>Network isolation and firewall protection</li>
                    <li>Regular vulnerability scanning and penetration testing</li>
                    <li>Automated security patching and updates</li>
                    <li>DDoS protection and rate limiting</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Access Controls</h2>
                <div className="space-y-4 text-text-secondary">
                  <p className="leading-relaxed">We enforce strict access controls:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Role-based access control (RBAC) for all user permissions</li>
                    <li>Multi-factor authentication (MFA) support</li>
                    <li>Session management with automatic timeouts</li>
                    <li>Audit logging of all access and administrative actions</li>
                    <li>Principle of least privilege for all internal access</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Data Isolation</h2>
                <p className="text-text-secondary leading-relaxed">
                  Each customer's data is logically isolated. Your business data is never mixed with other customers' data, and access is strictly controlled through authentication and authorization mechanisms. We do not use your data to train AI models or share it with third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Secure Development Practices</h2>
                <div className="space-y-4 text-text-secondary">
                  <p className="leading-relaxed">Our development process includes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Security code reviews for all changes</li>
                    <li>Static and dynamic application security testing (SAST/DAST)</li>
                    <li>Dependency vulnerability scanning</li>
                    <li>Secure coding guidelines and training</li>
                    <li>Regular third-party security assessments</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Incident Response</h2>
                <p className="text-text-secondary leading-relaxed">
                  We maintain a comprehensive incident response plan. In the event of a security incident, we have procedures in place to contain, investigate, and remediate issues promptly. Affected customers will be notified within 72 hours of confirmed incidents as required by applicable regulations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">8. Business Continuity</h2>
                <div className="space-y-4 text-text-secondary">
                  <p className="leading-relaxed">We ensure availability through:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Regular automated backups with encryption</li>
                    <li>Geographic redundancy for critical systems</li>
                    <li>Disaster recovery procedures and testing</li>
                    <li>99.9% uptime SLA for enterprise customers</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">9. Compliance</h2>
                <p className="text-text-secondary leading-relaxed">
                  We are committed to meeting industry standards and regulatory requirements. We design our systems to support GDPR, CCPA, and other applicable privacy regulations. Enterprise customers can request our security documentation and compliance reports.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">10. Reporting Security Issues</h2>
                <p className="text-text-secondary leading-relaxed">
                  If you discover a security vulnerability, please report it responsibly to:{' '}
                  <a href={`mailto:security@evalumine.com`} className="text-primary-cyan hover:underline">
                    security@evalumine.com
                  </a>
                  . We appreciate your help in keeping Vuen AI secure and will work with you to address any issues promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">11. Contact Us</h2>
                <p className="text-text-secondary leading-relaxed">
                  For security-related questions or to request our security documentation, please contact us at:{' '}
                  <a href={`mailto:${contact.generalEmail}`} className="text-primary-cyan hover:underline">
                    {contact.generalEmail}
                  </a>
                </p>
              </section>
            </div>

            {/* Back to home */}
            <div className="mt-16 pt-8 border-t border-glass-border">
              <a
                href="/"
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

export default Security;
