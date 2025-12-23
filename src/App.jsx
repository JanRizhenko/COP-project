import React from 'react';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import StartPage from './pages/StartPage/StartPage';
import GamePage from './pages/GamePage/GamePage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import { useGameState } from './hooks';
import './App.css';

function App() {
  const {
    currentPage,
    gameSettings,
    startGame,
    completeGame,
    playAgain,
    goToMainMenu,
    exitGame
  } = useGameState();

  const renderPage = () => {
    switch (currentPage) {
      case 'start':
        return <StartPage onStartGame={startGame} />;
      
      case 'game':
        return (
          <GamePage
            difficulty={gameSettings.difficulty}
            onExit={exitGame}
            onComplete={completeGame}
          />
        );
      
      case 'results':
        return (
          <ResultsPage
            difficulty={gameSettings.difficulty}
            moves={gameSettings.moves}
            time={gameSettings.time}
            onPlayAgain={playAgain}
            onMainMenu={goToMainMenu}
          />
        );
      
      default:
        return <StartPage onStartGame={startGame} />;
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
