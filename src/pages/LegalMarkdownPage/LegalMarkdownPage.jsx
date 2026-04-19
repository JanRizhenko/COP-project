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
      setError('Unknown document.');
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
      .catch(() => setError('Failed to load file. Run npm start or npm run build (sync-legal script).'));
  }, [fileName]);

  if (!fileName) {
    return <div className="legal-page legal-page--error">Unknown document.</div>;
  }

  if (error) {
    return <div className="legal-page legal-page--error">{error}</div>;
  }

  if (!markdown) {
    return <div className="legal-page">Loading...</div>;
  }

  return (
    <div className="legal-page">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default LegalMarkdownPage;
