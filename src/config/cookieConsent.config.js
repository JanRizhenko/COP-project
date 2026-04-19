/**
 * Text and URLs for the cookie / local storage notice.
 * Adjust `contactHint` if you publish a real contact for production.
 */
export const cookieConsentConfig = {
  appName: 'Hanoi Tower Game',
  /** In-app route (synced from root PRIVACY_POLICY.md). */
  privacyPath: '/privacy',
  /** User guide route. */
  guidePath: '/guide',
  /** Shown in the banner footer line. */
  contactHint: 'Jan Rizhenko (course project)',
  /**
   * Describes processing aligned with this repo: localStorage for game + consent flag.
   * Not legal advice; course-specific hosting may add logging.
   */
  dataProcessingSummary:
    'We use browser local storage (localStorage) to keep game progress, player name, and a technical consent flag. Analytics and advertising cookies are not enabled in the default build.',
};
