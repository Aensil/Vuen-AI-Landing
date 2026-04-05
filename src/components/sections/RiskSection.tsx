import React from 'react';
import { domains } from '@/config/site';

const RiskSection: React.FC = () => {
  const objections = [
    {
      question: "What if my data isn't clean enough?",
      answer: "Vuen works with messy CSVs, half-filled spreadsheets, and real-world databases. You don't need to prep your data first — just upload and ask.",
    },
    {
      question: "Will this replace my existing BI tools?",
      answer: "No. Vuen sits alongside your current stack. It's for the 90% of your company that never logs into Tableau or Power BI. Your analysts keep their tools — everyone else gets answers.",
    },
    {
      question: "How hard is onboarding?",
      answer: "Upload a CSV or connect a database. Ask a question in plain English. That's it. No training, no SQL, no implementation project. Most teams are running queries within 5 minutes.",
    },
    {
      question: "What happens to my data?",
      answer: "Your data never leaves your infrastructure. SOC 2 Type II certified. GDPR compliant. Enterprise plans offer on-premise deployment. We don't train on your data — ever.",
    },
    {
      question: "What if it gives wrong answers?",
      answer: "Every visualization shows its source file and query. You can verify any answer instantly. Vuen cites its work so you never have to blindly trust a chart.",
    },
    {
      question: "What if I outgrow the free plan?",
      answer: "The free plan gives you 40 AI interactions per month to validate the product. Upgrade when you're ready — or don't. No lock-in, no contracts, cancel anytime.",
    },
  ];

  return (
    <section className="relative py-28 sm:py-32 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(124, 92, 250, 0.06) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs text-accent-magenta/70 font-semibold tracking-widest uppercase mb-4">
            Honest answers
          </p>
          <h2
            className="font-bold text-white mb-6 tracking-tight"
            style={{
              fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3rem)',
              lineHeight: '1.15',
            }}
          >
            What you're probably wondering
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            We'd rather answer these upfront than have you leave with doubts.
          </p>
        </div>

        {/* Objections grid */}
        <div className="space-y-4">
          {objections.map((item, index) => (
            <div
              key={index}
              className="
                p-6 sm:p-7 rounded-2xl
                bg-white/[0.03] border border-white/[0.08]
                hover:border-white/15
                transition-all duration-300
              "
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                {item.question}
              </h3>
              <p className="text-sm sm:text-base text-white/55 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom trust reinforcement */}
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm mb-6">
            Still unsure? Try it free — no credit card, no commitment.
          </p>
          <a
            href={domains.app}
            className="
              inline-flex items-center gap-2 px-6 py-3
              text-sm font-medium text-white/70
              border border-white/15 rounded-full
              hover:text-white hover:border-white/25
              transition-all duration-300
            "
          >
            Start Free
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RiskSection;
