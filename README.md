# Hanoi Tower Game

Навчальний веб-проєкт — гра «Вежі Ганоя» на **React 18** і **react-scripts 5** (Create React App). Репозиторій містить політику конфіденційності, інструкцію користувача, згенеровану JSDoc-документацію, Storybook та звіт про ліцензії залежностей.

## Авторство

**Jan Rizhenko** — автор коду та документації цього репозиторію (див. також підпис у футері застосунку).

## Ліцензія

Проєкт поширюється на умовах **MIT**. Повний текст: файл [`LICENSE`](./LICENSE) у корені.

Залежності `npm` мають власні ліцензії; зведений звіт генерується інструментом `license-checker` і зберігається у [`LICENSE-REPORT.md`](./LICENSE-REPORT.md) (перегенерація — нижче).

## Юридичні та інформаційні документи

| Файл | Опис |
| --- | --- |
| [`PRIVACY_POLICY.md`](./PRIVACY_POLICY.md) | Політика конфіденційності (GDPR-орієнтований опис обробки даних). |
| [`USER_GUIDE.md`](./USER_GUIDE.md) | Інструкція користувача, обмеження відповідальності, посилання на політику. |

У застосунку після `npm start` / збірки доступні маршрути **`/privacy`** та **`/guide`** (контент підвантажується з копій файлів у `public/`, які синхронізуються скриптом `prestart` / `prebuild`).

## Вимоги

- **Node.js** (рекомендовано LTS)
- **npm** 9+

## Конфігурація середовища

Стандартні змінні Create React App (опційно), наприклад:

- `PORT` — порт dev-сервера (за замовчуванням `3000`).
- `BROWSER` — `none`, щоб не відкривати браузер автоматично.

Файли `.env.local` не комітяться (див. `.gitignore`).

## Основні команди

```bash
npm install              # залежності
npm start                # dev-сервер (перед стартом копіює legal *.md у public/)
npm run build            # production-збірка у каталог build/
npm test                 # тести (react-scripts)
```

Документація та якість:

```bash
npm run docs:jsdoc       # згенерувати JSDoc у docs/jsdoc/ (відкрийте docs/jsdoc/index.html)
npm run licenses:report  # оновити LICENSE-REPORT.md (license-checker)
npm run storybook        # Storybook на порту 6006
npm run build-storybook  # статична збірка Storybook у storybook-static/
```

## GDPR і cookie-банер

У корені застосунку відображається банер згоди (бібліотека `react-cookie-consent`). Тексти та посилання на політику налаштовуються у `src/config/cookieConsent.config.js`. Детальний опис категорій даних — у `PRIVACY_POLICY.md`.

## Структура (скорочено)

- `src/` — код React (сторінки, компоненти, контекст, хуки).
- `public/` — статичні файли; копії `PRIVACY_POLICY.md`, `USER_GUIDE.md` та `LICENSE` створюються скриптом `scripts/sync-legal.cjs` (ці копії в `public/` не комітяться — джерело в корені репозиторію).
- `docs/jsdoc/` — **згенерована** API-документація (не редагувати вручну; регенерувати `npm run docs:jsdoc`).
- `.storybook/` — конфігурація Storybook.
- `jsdoc.conf.json` — конфігурація JSDoc.

## Перевірка ліцензій залежностей

Звіт у корені **`LICENSE-REPORT.md`** створюється командою:

```bash
npm run licenses:report
```

Використовується пакет [`license-checker`](https://www.npmjs.com/package/license-checker) (обхід повного дерева залежностей). Після оновлення `package.json` варто перегенерувати звіт і закомітити оновлений файл.

## Додаткова документація

- **JSDoc:** `npm run docs:jsdoc` → `docs/jsdoc/index.html`.
- **Storybook:** `npm run storybook` — історії для базового компонента `Button` і складного `GameBoard`.
