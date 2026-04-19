# Privacy Policy

**Last updated:** April 19, 2026  
**Application:** Hanoi Tower Game  
**Responsible person / project author:** Jan Rizhenko  

This document explains what data may be processed when using the app and what rights users may have under the EU General Data Protection Regulation (GDPR).

## 1. Data Controller

For personal or course use, the data controller is the person or organization that runs the server or device hosting the app. This project does not provide a central cloud account unless you add external services yourself.

## 2. Data Processed

### 2.1 Data Stored Locally In The Browser

The application uses **browser local storage** (`localStorage`) to:

- store game state, player name, difficulty settings, and progress;
- store a technical consent flag for the cookie/privacy information banner (if the component is enabled).

This data is **not automatically transferred** to the author's server unless you configure your own backend or analytics.

### 2.2 Logs And Network Data

When you host the app on your own server, your hosting provider may collect technical logs (IP, User-Agent, request time). That depends on your setup, not this repository's source code.

### 2.3 Analytics And Third-Party Scripts

In the default project setup, ad and analytics networks are **not enabled**. If you add them, you should update this policy and the consent banner.

## 3. Legal Basis (GDPR)

- **Consent** for optional processing categories (if added), such as marketing or optional analytics.
- **Service operation / contract** for the minimum technical actions needed to run the game at user request.
- **Legitimate interest** in limited cases, for example basic server security for self-hosting.

## 4. Retention Period

Data in `localStorage` remains until the user or developer clears it (browser controls or app logic). Review this policy when the project changes in a meaningful way.

## 5. Data Subject Rights

You can:

- access data you entered in the game (visible in the interface);
- delete local data using browser site-data settings;
- withdraw consent for optional mechanisms if they are introduced.

If this app is used in a course, direct data-processing questions to the instructor or the admin of the platform where the project is hosted.

## 6. Contact

Questions about this repository can be submitted through your course submission process or via contact details listed in `README.md`.

## 7. Changes

This policy may be updated. The latest version is always stored in `PRIVACY_POLICY.md` at the project root.
