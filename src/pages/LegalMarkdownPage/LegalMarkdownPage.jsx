import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './LegalMarkdownPage.css';

const FILE_MAP = {
  privacy: 'PRIVACY_POLICY.md',
  guide: 'USER_GUIDE.md',
};

/**
 * Loads a markdown file from `public/` (kept in sync from repo root via `scripts/sync-legal.cjs`).
 * @param {{ fileKey: 'privacy' | 'guide' }} props
 */
const LegalMarkdownPage = ({ fileKey }) => {
  const fileName = FILE_MAP[fileKey];
  const [markdown, setMarkdown] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setMarkdown('');
    if (!fileName) {
      setError('Невідомий документ.');
      return;
    }
    setError(null);
    const url = `${process.env.PUBLIC_URL || ''}/${fileName}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.text();
      })
      .then(setMarkdown)
      .catch(() => setError('Не вдалося завантажити файл. Запустіть npm start або npm run build (скрипт sync-legal).'));
  }, [fileName]);

  if (!fileName) {
    return <div className="legal-page legal-page--error">Невідомий документ.</div>;
  }

  if (error) {
    return <div className="legal-page legal-page--error">{error}</div>;
  }

  if (!markdown) {
    return <div className="legal-page">Завантаження…</div>;
  }

  return (
    <div className="legal-page">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default LegalMarkdownPage;
