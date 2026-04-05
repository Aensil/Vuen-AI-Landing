import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface AspirationItem {
  title: string;
  description: string;
}

const AspirationSection: React.FC = () => {
  const { t, tArray } = useTranslation();
  const aspirations = tArray<AspirationItem>('aspiration.items');

  return (
    <section className="py-24 px-4 void-gradient relative z-10" aria-label="Aspiration Section">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="heading-gradient">
              {t('aspiration.title1')}
            </span>
            <br />
            <span className="text-text-primary">
              {t('aspiration.title2')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {t('aspiration.subtitle')}
          </p>
        </div>

        {/* Aspiration Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {aspirations.map((item, index) => (
            <div
              key={index}
              className="glass-panel p-8 hover:glass-glow-cyan transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-primary-cyan/20 border border-primary-cyan/30 flex items-center justify-center mb-4 group-hover:bg-primary-cyan/30 group-hover:border-primary-cyan/50 transition-colors">
                <span className="text-primary-cyan font-bold text-xl">{index + 1}</span>
              </div>
              <h3 className="text-text-primary font-bold text-xl mb-3 group-hover:text-primary-cyan transition-colors">
                {item.title}
              </h3>
              <p className="text-text-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AspirationSection;
