import { enContent } from './en';
import { heContent } from './he';
import { Language, SiteContent } from './types';

const resolvedHeContent: SiteContent = {
  ...heContent,
  finalCTA: {
    ...heContent.finalCTA,
    successTitle: 'תודה על ההתעניינות!',
    successDescription:
      'תקבל/י מייל עם קישור לאפליקציה. הגישה לבטא נפתחת בהדרגה, ונעדכן אותך כשיתאפשר להתחיל להשתמש ב-PlaceEcho.',
  },
};

const localizedHeContent: SiteContent = {
  ...heContent,
  finalCTA: {
    ...heContent.finalCTA,
    successTitle: '\u05D0\u05EA/\u05D4 \u05D1\u05E8\u05E9\u05D9\u05DE\u05D4!',
    successDescription:
      '\u05D0\u05E0\u05D7\u05E0\u05D5 \u05E4\u05D5\u05EA\u05D7\u05D9\u05DD \u05D0\u05EA PlaceEcho \u05D1\u05D4\u05D3\u05E8\u05D2\u05D4, \u05D5\u05D0\u05EA/\u05D4 \u05EA\u05D4\u05D9\u05D4 \u05D1\u05D9\u05DF \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D9\u05DD \u05E9\u05D9\u05E7\u05D1\u05DC\u05D5 \u05D2\u05D9\u05E9\u05D4.',
  },
};

export const content: Record<Language, SiteContent> = {
  en: enContent,
  he: localizedHeContent,
};

export * from './types';
