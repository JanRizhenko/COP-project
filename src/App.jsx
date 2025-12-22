import React, { useState } from 'react';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import StartPage from './pages/StartPage/StartPage';
import GamePage from './pages/GamePage/GamePage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('start');
  const [gameSettings, setGameSettings] = useState({
    difficulty: 3,
    moves: 0,
    time: 0
  });

  const handleStartGame = (difficulty) => {
    setGameSettings({ ...gameSettings, difficulty });
    setCurrentPage('game');
  };

  const handleGameComplete = (moves, time) => {
    setGameSettings({ ...gameSettings, moves, time });
    setCurrentPage('results');
  };

  const handlePlayAgain = () => {
    setCurrentPage('game');
  };

  const handleMainMenu = () => {
    setGameSettings({ difficulty: 3, moves: 0, time: 0 });
    setCurrentPage('start');
  };

  const handleExitGame = () => {
    if (window.confirm('Are you sure you want to exit? Progress will not be saved.')) {
      setCurrentPage('start');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'start':
        return <StartPage onStartGame={handleStartGame} />;
      
      case 'game':
        return (
          <GamePage
            difficulty={gameSettings.difficulty}
            onExit={handleExitGame}
            onComplete={handleGameComplete}
          />
        );
      
      case 'results':
        return (
          <ResultsPage
            difficulty={gameSettings.difficulty}
            moves={gameSettings.moves}
            time={gameSettings.time}
            minMoves={Math.pow(2, gameSettings.difficulty) - 1}
            onPlayAgain={handlePlayAgain}
            onMainMenu={handleMainMenu}
          />
        );
      
      default:
        return <StartPage onStartGame={handleStartGame} />;
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
