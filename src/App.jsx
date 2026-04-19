import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import StartPage from './pages/StartPage/StartPage';
import GamePage from './pages/GamePage/GamePage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import LegalMarkdownPage from './pages/LegalMarkdownPage/LegalMarkdownPage';
import CookieConsentBanner from './components/layout/CookieConsentBanner/CookieConsentBanner';
import { GameProvider } from './context/GameContext';
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <GameProvider>
          <div className="app">
            <Header />
            <main className="app__main">
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/player/:playerId" element={<StartPage />} />
                <Route path="/player/:playerId/game" element={<GamePage />} />
                <Route path="/player/:playerId/results" element={<ResultsPage />} />
                <Route path="/privacy" element={<LegalMarkdownPage fileKey="privacy" />} />
                <Route path="/guide" element={<LegalMarkdownPage fileKey="guide" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <CookieConsentBanner />
          </div>
        </GameProvider>
      </BrowserRouter>
  );
}

export default App;