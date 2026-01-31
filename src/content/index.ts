import { enContent } from './en';
import { heContent } from './he';
import { Language, SiteContent } from './types';

export const content: Record<Language, SiteContent> = {
  en: enContent,
  he: heContent,
};

export * from './types';
