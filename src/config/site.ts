/**
 * Vuen AI Site Configuration
 * Centralized configuration for domains, SEO, navigation, and social links
 */

// Domain Configuration
export const domains = {
  main: 'https://evalumine.com',
  app: 'https://app.evalumine.com',
  realEstateDemo: 'https://real-estate.evalumine.com/',
} as const;

// Social Media Links
export const socialLinks = {
  instagram: {
    url: 'https://www.instagram.com/evalumine/',
    label: 'Evalumine on Instagram',
    handle: '@evalumine',
  },
  twitter: {
    url: 'https://x.com/vuen_ai',
    label: 'Follow @vuen_ai on X',
    handle: '@vuen_ai',
  },
  linkedin: {
    url: 'https://www.linkedin.com/company/vuen-ai',
    label: 'Vuen AI on LinkedIn',
  },
  threads: {
    url: 'https://www.threads.com/@evalumine',
    label: 'Evalumine on Threads',
    handle: '@evalumine',
  },
  tiktok: {
    url: 'https://www.tiktok.com/@evalumine',
    label: 'Evalumine on TikTok',
    handle: '@evalumine',
  },
} as const;

// Video Demo
export const videoDemo = {
  youtube: 'https://www.youtube.com/watch?v=TS1T9m-HKk8',
  label: 'Watch 90-second overview',
} as const;

// Contact Information
export const contact = {
  email: 'enoc.silva@evalumine.com',
  generalEmail: 'hello@evalumine.com',
} as const;

// Navigation Links
export const navigation = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Product', href: '/product' },
    { label: 'Use Cases', href: '/use-cases' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Sign in', href: domains.app, external: true },
  ],
  useCases: [
    { label: 'Founders & CEOs', href: '/use-cases/founders-ceos' },
    { label: 'Operations', href: '/use-cases/ops' },
    { label: 'Finance & BI', href: '/use-cases/finance-bi' },
    { label: 'Real Estate', href: '/use-cases/real-estate' },
  ],
  footer: {
    product: [
      { label: 'Home', href: '/' },
      { label: 'Product', href: '/product' },
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Pricing', href: '/pricing' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: `mailto:${contact.email}` },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Security', href: '/legal/security' },
    ],
    demos: [
      { label: 'Real Estate Visual Agent', href: domains.realEstateDemo, external: true },
      { label: videoDemo.label, href: videoDemo.youtube, external: true },
    ],
  },
} as const;

// SEO Configuration per page
export const seoConfig = {
  default: {
    siteName: 'Vuen AI',
    themeColor: '#05070F',
  },
  pages: {
    home: {
      title: 'Vuen AI – Visual Data Agent for Real-Time Business Intelligence',
      shortTitle: 'Vuen AI – Talk to Your Data',
      description: 'Talk to a 3D orb and get live charts, flows, and explanations from your own data in seconds. Vuen AI is a voice-first Visual Data Agent for real-time business intelligence.',
      keywords: [
        'visual data agent',
        'voice-first business intelligence',
        'AI dashboards',
        'talk to your data',
        'real-time BI',
        'Vuen AI',
      ],
      path: '/',
    },
    product: {
      title: 'Product – Vuen AI Visual Data Agent',
      description: 'See how Vuen AI listens to spoken questions, pre-fetches your data, and draws live charts, flows, and dashboards in real time.',
      path: '/product',
    },
    useCases: {
      title: 'Use Cases – How Leaders Use Vuen AI',
      description: 'Founders, COOs, CFOs, and data teams use Vuen AI to answer hard questions live in the room instead of waiting on dashboards.',
      path: '/use-cases',
    },
    pricing: {
      title: 'Pricing – Launch Your Visual Data Agent',
      description: 'Start with a focused Visual Agent project and keep it running with simple monthly pricing.',
      path: '/pricing',
    },
    earlyAccess: {
      title: 'Early Access – Apply for Vuen AI',
      description: "Tell us where your current BI stack fails you. We only take teams where a Visual Data Agent will change the way decisions get made.",
      path: '/early-access',
    },
    about: {
      title: 'About – The Team Behind Vuen AI',
      description: 'Learn why we\'re building Visual Data Agents for leaders who are done waiting on dashboards.',
      path: '/about',
    },
    privacy: {
      title: 'Privacy Policy – Vuen AI',
      description: 'Learn how Vuen AI protects your data and respects your privacy.',
      path: '/legal/privacy',
    },
    terms: {
      title: 'Terms of Service – Vuen AI',
      description: 'Terms and conditions for using Vuen AI services.',
      path: '/legal/terms',
    },
    security: {
      title: 'Security – Vuen AI',
      description: 'Learn about Vuen AI security practices, data protection, and compliance.',
      path: '/legal/security',
    },
  },
} as const;

// Open Graph Configuration
export const openGraphConfig = {
  type: 'website',
  siteName: 'Vuen AI',
  url: domains.main + '/',
  title: 'Vuen AI – Visual Data Agent for Real-Time Business Intelligence',
  description: 'Talk to a 3D orb and get live charts, flows, and explanations from your own data in seconds.',
  image: `${domains.main}/assets/og/vuen-og-default.svg`,
  imageAlt: 'Vuen AI - Visual Data Agent with glowing orb interface',
  imageWidth: '1200',
  imageHeight: '630',
} as const;

// Twitter Card Configuration
export const twitterConfig = {
  card: 'summary_large_image',
  site: '@vuen_ai',
  creator: '@vuen_ai',
  title: 'Vuen AI – Visual Data Agent for Real-Time Business Intelligence',
  description: 'Talk to a 3D orb and get live charts, flows, and explanations from your own data in seconds.',
  image: `${domains.main}/assets/og/vuen-og-default.svg`,
  imageAlt: 'Vuen AI - Visual Data Agent with glowing orb interface',
} as const;

// Structured Data Templates
export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vuen AI',
    url: domains.main,
    logo: `${domains.main}/assets/logo/vuen-logo.svg`,
    sameAs: [
      socialLinks.twitter.url,
      socialLinks.linkedin.url,
      socialLinks.instagram.url,
      socialLinks.threads.url,
      socialLinks.tiktok.url,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: contact.generalEmail,
      contactType: 'customer service',
    },
  },
  softwareApplication: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Vuen AI',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Business Intelligence',
    operatingSystem: 'Web',
    description: seoConfig.pages.home.description,
    url: domains.app,
    offers: {
      '@type': 'Offer',
      price: '3500',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
    },
  },
} as const;

// Language/Locale Configuration
export const localeConfig = {
  default: 'en',
  supported: ['en', 'es'] as const,
  hreflang: {
    en: 'en',
    es: 'es',
  },
} as const;

// Language Detection Configuration
export const languageConfig = {
  default: 'en' as const,
  supported: ['en', 'zh', 'hi', 'es', 'ar', 'fr'] as const,
  storageKey: 'vuen-language',
  ipApi: {
    endpoint: 'http://ipapi.co/json/',
    timeout: 3000,
    enabled: true,
  },
  // Country to language mapping (ISO 3166-1 alpha-2 -> language code)
  countryLanguageMap: {
    // Mandarin Chinese speaking
    CN: 'zh', TW: 'zh', HK: 'zh', MO: 'zh', SG: 'zh',
    // Hindi speaking
    IN: 'hi',
    // Spanish speaking
    ES: 'es', MX: 'es', AR: 'es', CO: 'es', PE: 'es', VE: 'es', CL: 'es',
    EC: 'es', GT: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es',
    SV: 'es', NI: 'es', CR: 'es', PA: 'es', UY: 'es', PR: 'es', GQ: 'es',
    // Arabic speaking
    SA: 'ar', EG: 'ar', AE: 'ar', IQ: 'ar', MA: 'ar', DZ: 'ar', SD: 'ar',
    SY: 'ar', YE: 'ar', TN: 'ar', JO: 'ar', LY: 'ar', LB: 'ar', OM: 'ar',
    KW: 'ar', QA: 'ar', BH: 'ar', MR: 'ar', PS: 'ar',
    // French speaking
    FR: 'fr', CA: 'fr', BE: 'fr', CH: 'fr', SN: 'fr', CI: 'fr', ML: 'fr',
    CM: 'fr', MG: 'fr', NE: 'fr', BF: 'fr', TG: 'fr', BJ: 'fr', GN: 'fr',
    CG: 'fr', GA: 'fr', CD: 'fr', HT: 'fr', RW: 'fr', TD: 'fr', CF: 'fr',
    MC: 'fr', LU: 'fr',
  } as const,
} as const;

// Sitemap pages (for reference)
export const sitemapPages = [
  '/',
  '/product',
  '/use-cases',
  '/use-cases/founders-ceos',
  '/use-cases/ops',
  '/use-cases/finance-bi',
  '/use-cases/real-estate',
  '/pricing',
  '/early-access',
  '/about',
  '/legal/privacy',
  '/legal/terms',
  '/legal/security',
] as const;

export type SupportedLocale = typeof localeConfig.supported[number];
export type PageKey = keyof typeof seoConfig.pages;
