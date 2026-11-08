import React from 'react';
import { visualDataAgentHref } from '@/config/products';

const ProductSwitcher: React.FC = () => (
  <nav
    aria-label="Products"
    className="flex h-[52px] items-center justify-center border-b border-white/[0.06] bg-void px-4"
  >
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
      <a
        href="/"
        className="inline-flex min-h-9 items-center justify-center rounded-full px-4 text-xs font-medium text-white/60 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-cyan sm:text-sm"
      >
        Mirror Mirror
      </a>
      <a
        href={visualDataAgentHref()}
        aria-current="page"
        className="inline-flex min-h-9 items-center justify-center rounded-full bg-white px-4 text-xs font-medium text-void transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-cyan sm:text-sm"
      >
        Visual Data Agent
      </a>
    </div>
  </nav>
);

export default ProductSwitcher;
