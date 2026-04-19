# Hanoi Tower Game

<<<<<<< HEAD
<<<<<<< HEAD
Навчальний веб-проєкт - гра «Вежі Ганоя» на **React 18** і **react-scripts 5** (Create React App). Репозиторій містить політику конфіденційності, інструкцію користувача, згенеровану JSDoc-документацію, Storybook та звіт про ліцензії залежностей.
=======
Tower of Hanoi game built with **React 18** and **react-scripts 5** (Create React App). The repository includes privacy/legal docs, generated JSDoc docs, Storybook, and a dependency license report.
>>>>>>> faf27d9 (feat: translate docs and legal UI to English)

## Authorship

<<<<<<< HEAD
**Jan Rizhenko** - автор коду та документації цього репозиторію (див. також підпис у футері застосунку).
=======
**Jan Rizhenko** is the author of the code and documentation in this repository (also listed in the app footer).
>>>>>>> faf27d9 (feat: translate docs and legal UI to English)
=======
Tower of Hanoi game built with **React 18** and **react-scripts 5** (Create React App). The repository includes privacy/legal docs, generated JSDoc docs, Storybook, and a dependency license report.

## Authorship

**Jan Rizhenko** is the author of the code and documentation in this repository (also listed in the app footer).
>>>>>>> 666f49f (feat: finalize English docs and normalize generated JSDoc output)

## License

This project is distributed under the **MIT** license. Full text: [`LICENSE`](./LICENSE) in the repository root.

<<<<<<< HEAD
<<<<<<< HEAD
Залежності `npm` мають власні ліцензії; зведений звіт генерується інструментом `license-checker` і зберігається у [`LICENSE-REPORT.md`](./LICENSE-REPORT.md) (перегенерація - нижче).
=======
`npm` dependencies have their own licenses. The report is generated with `license-checker` and stored in [`LICENSE-REPORT.md`](./LICENSE-REPORT.md).
>>>>>>> faf27d9 (feat: translate docs and legal UI to English)

## Legal And Info Documents

<<<<<<< HEAD
| Файл | Опис |
| -- | -- |
| [`PRIVACY_POLICY.md`](./PRIVACY_POLICY.md) | Політика конфіденційності (GDPR-орієнтований опис обробки даних). |
| [`USER_GUIDE.md`](./USER_GUIDE.md) | Інструкція користувача, обмеження відповідальності, посилання на політику. |
=======
=======
`npm` dependencies have their own licenses. The report is generated with `license-checker` and stored in [`LICENSE-REPORT.md`](./LICENSE-REPORT.md).

## Legal and Info Documents

>>>>>>> 666f49f (feat: finalize English docs and normalize generated JSDoc output)
| File | Description |
| --- | --- |
| [`PRIVACY_POLICY.md`](./PRIVACY_POLICY.md) | Privacy policy with GDPR-related data notes. |
| [`USER_GUIDE.md`](./USER_GUIDE.md) | User guide, limitations, and policy links. |
<<<<<<< HEAD
>>>>>>> faf27d9 (feat: translate docs and legal UI to English)
=======
>>>>>>> 666f49f (feat: finalize English docs and normalize generated JSDoc output)

After `npm start` / build, the app exposes **`/privacy`** and **`/guide`** routes. Content is loaded from copies in `public/`, synced by `prestart` / `prebuild`.

## Requirements

- **Node.js** (LTS recommended)
- **npm** 9+

## Environment Configuration

Standard optional Create React App variables, for example:

<<<<<<< HEAD
<<<<<<< HEAD
- `PORT` - порт dev-сервера (за замовчуванням `3000`).
- `BROWSER` - `none`, щоб не відкривати браузер автоматично.
=======
- `PORT`: development server port (default `3000`)
- `BROWSER`: set to `none` to prevent auto-open
>>>>>>> faf27d9 (feat: translate docs and legal UI to English)
=======
- `PORT`: development server port (default `3000`)
- `BROWSER`: set to `none` to prevent auto-open
>>>>>>> 666f49f (feat: finalize English docs and normalize generated JSDoc output)

`.env.local` files are ignored by git (see `.gitignore`).

## Core Commands

```bash
npm install              # install dependencies
npm start                # run dev server (copies legal *.md files into public/ first)
npm run build            # create production build in build/
npm test                 # run tests (react-scripts)
```

Documentation and quality:

```bash
npm run docs:jsdoc       # generate JSDoc into docs/jsdoc/ (open docs/jsdoc/index.html)
npm run licenses:report  # regenerate LICENSE-REPORT.md (license-checker)
npm run storybook        # run Storybook on port 6006
npm run build-storybook  # build static Storybook into storybook-static/
```

<<<<<<< HEAD
## GDPR And Cookie Banner

<<<<<<< HEAD
У корені застосунку відображається банер згоди (бібліотека `react-cookie-consent`). Тексти та посилання на політику налаштовуються у `src/config/cookieConsent.config.js`. Детальний опис категорій даних - у `PRIVACY_POLICY.md`.
=======
The app shows a consent banner (via `react-cookie-consent`). Text and links are configured in `src/config/cookieConsent.config.js`. Full details are in `PRIVACY_POLICY.md`.
>>>>>>> faf27d9 (feat: translate docs and legal UI to English)

## Structure (Short)

<<<<<<< HEAD
- `src/` - код React (сторінки, компоненти, контекст, хуки).
- `public/` - статичні файли; копії `PRIVACY_POLICY.md`, `USER_GUIDE.md` та `LICENSE` створюються скриптом `scripts/sync-legal.cjs` (ці копії в `public/` не комітяться - джерело в корені репозиторію).
- `docs/jsdoc/` - **згенерована** API-документація (не редагувати вручну; регенерувати `npm run docs:jsdoc`).
- `.storybook/` - конфігурація Storybook.
- `jsdoc.conf.json` - конфігурація JSDoc.
=======
=======
## GDPR and Cookie Banner

The app shows a consent banner (via `react-cookie-consent`). Text and links are configured in `src/config/cookieConsent.config.js`. Full details are in `PRIVACY_POLICY.md`.

## Structure (Short)

>>>>>>> 666f49f (feat: finalize English docs and normalize generated JSDoc output)
- `src/`: React source (pages, components, context, hooks)
- `public/`: static files; copies of `PRIVACY_POLICY.md`, `USER_GUIDE.md`, and `LICENSE` are generated by `scripts/sync-legal.cjs` (generated public copies are not committed)
- `docs/jsdoc/`: generated API documentation (do not edit manually; regenerate with `npm run docs:jsdoc`)
- `.storybook/`: Storybook configuration
- `jsdoc.conf.json`: JSDoc configuration
<<<<<<< HEAD
>>>>>>> faf27d9 (feat: translate docs and legal UI to English)
=======
>>>>>>> 666f49f (feat: finalize English docs and normalize generated JSDoc output)

## Dependency License Verification

The root report **`LICENSE-REPORT.md`** is generated by:

```bash
npm run licenses:report
```

It uses [`license-checker`](https://www.npmjs.com/package/license-checker) to scan the full dependency tree. Regenerate and commit the report after dependency changes.

## Additional Documentation

<<<<<<< HEAD
<<<<<<< HEAD
- **JSDoc:** `npm run docs:jsdoc` → `docs/jsdoc/index.html`.
- **Storybook:** `npm run storybook` - історії для базового компонента `Button` і складного `GameBoard`.
=======
- **JSDoc:** `npm run docs:jsdoc` -> `docs/jsdoc/index.html`
- **Storybook:** `npm run storybook` for `Button` (base) and `GameBoard` (complex) component stories
>>>>>>> faf27d9 (feat: translate docs and legal UI to English)
=======
- **JSDoc:** `npm run docs:jsdoc` -> `docs/jsdoc/index.html`
- **Storybook:** `npm run storybook` for `Button` (base) and `GameBoard` (complex) component stories
>>>>>>> 666f49f (feat: finalize English docs and normalize generated JSDoc output)
