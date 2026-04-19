/**
 * GDPR-oriented copy and URLs for the cookie / local storage notice.
 * Adjust `contactHint` if you publish a real contact for production.
 */
export const cookieConsentConfig = {
  appName: 'Hanoi Tower Game',
  /** In-app route (synced from root PRIVACY_POLICY.md). */
  privacyPath: '/privacy',
  /** User guide route. */
  guidePath: '/guide',
  /** Shown in the banner footer line. */
  contactHint: 'Jan Rizhenko (навчальний проєкт)',
  /**
   * Describes processing aligned with this repo: localStorage for game + consent flag.
   * Not legal advice; course-specific hosting may add logging.
   */
  dataProcessingSummary:
    'Ми використовуємо локальне сховище браузера (localStorage) для збереження прогресу гри, імені гравця та технічного прапорця згоди. Аналітика та рекламні cookie в базовій збірці не підключені.',
};
