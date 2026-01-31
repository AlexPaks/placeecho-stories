// Content types for future CMS integration
export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaTryDemo: string;
  ctaContact: string;
  bullets: {
    local: string;
    multilingual: string;
    audio: string;
  };
  mockFlow: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FeatureGroup {
  title: string;
  features: string[];
}

export interface StoryExample {
  id: string;
  place: string;
  tone: string;
  snippet: string;
  fullStory: string;
}

export interface TrustItem {
  title: string;
  description: string;
  icon: string;
}

export interface FinalCTAContent {
  headline: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  reasonPlaceholder: string;
  submitButton: string;
  bookDemo: string;
}

export interface DemoContent {
  title: string;
  locationPlaceholder: string;
  useMyLocation: string;
  lengthLabel: string;
  styleLabel: string;
  languageLabel: string;
  generateButton: string;
  lengths: string[];
  styles: string[];
  languages: string[];
}

export interface NavContent {
  home: string;
  about: string;
  faq: string;
  contact: string;
  demo: string;
}

export interface SiteContent {
  nav: NavContent;
  hero: HeroContent;
  howItWorks: {
    title: string;
    steps: Step[];
  };
  useCases: {
    title: string;
    cases: UseCase[];
  };
  features: {
    title: string;
    groups: FeatureGroup[];
  };
  gallery: {
    title: string;
    randomButton: string;
    playButton: string;
    stories: StoryExample[];
  };
  trust: {
    title: string;
    items: TrustItem[];
  };
  finalCTA: FinalCTAContent;
  demo: DemoContent;
}

export type Language = 'en' | 'he';
