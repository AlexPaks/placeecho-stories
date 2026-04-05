import { enContent } from './en';
import { heContent } from './he';
import { Language, SiteContent } from './types';

const localizedHeContent: SiteContent = {
  ...heContent,
  gallery: {
    ...heContent.gallery,
    playButton: 'הקרא בקול',
    stopButton: 'עצור הקראה',
  },
  finalCTA: {
    ...heContent.finalCTA,
    successTitle: 'את/ה ברשימה!',
    successDescription: 'אנחנו פותחים את PlaceEcho בהדרגה, ואת/ה תהיה בין הראשונים שיקבלו גישה.',
  },
};

export const content: Record<Language, SiteContent> = {
  en: enContent,
  he: localizedHeContent,
};

export * from './types';
