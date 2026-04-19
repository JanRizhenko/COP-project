import React from 'react';
import { Link } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { cookieConsentConfig } from '../../../config/cookieConsent.config';
import './CookieConsentBanner.css';

/**
 * Bottom banner: documents local storage use and records consent (cookie + optional localStorage flag).
 * Configure strings in {@link cookieConsentConfig}.
 */
const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      cookieName="hanoi_gdpr_consent_v1"
      expires={365}
      overlay
      enableDeclineButton
      buttonText="Погоджуюсь"
      declineButtonText="Лише необхідне"
      buttonClasses="cookie-consent__btn cookie-consent__btn--accept"
      declineButtonClasses="cookie-consent__btn cookie-consent__btn--decline"
      containerClasses="cookie-consent"
      contentClasses="cookie-consent__content"
      buttonWrapperClasses="cookie-consent__actions"
      onAccept={() => {
        try {
          localStorage.setItem('gdpr_storage_consent', 'accepted');
        } catch {
          /* ignore */
        }
      }}
      onDecline={() => {
        try {
          localStorage.setItem('gdpr_storage_consent', 'essential_only');
        } catch {
          /* ignore */
        }
      }}
    >
      <div className="cookie-consent__text">
        <strong>{cookieConsentConfig.appName}</strong> — інформація про обробку даних (GDPR).
        <p className="cookie-consent__summary">{cookieConsentConfig.dataProcessingSummary}</p>
        <p className="cookie-consent__links">
          <Link to={cookieConsentConfig.privacyPath}>Політика конфіденційності</Link>
          {' · '}
          <Link to={cookieConsentConfig.guidePath}>Інструкція користувача</Link>
        </p>
        <p className="cookie-consent__meta">Контакт: {cookieConsentConfig.contactHint}</p>
      </div>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
