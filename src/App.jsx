import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import StartPage from './pages/StartPage/StartPage';
import GamePage from './pages/GamePage/GamePage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import './App.css';

function App() {
  const loadGameState = () => {
    try {
      const saved = localStorage.getItem('gameState');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
    return {
      currentPage: 'start',
      gameSettings: {
        difficulty: 3,
        playerName: 'Player',
        showTimer: true,
        showHints: true,
        moves: 0,
        time: 0
      }
    };
  };

  const [gameState, setGameState] = useState(loadGameState);
  const { currentPage, gameSettings } = gameState;

  useEffect(() => {
    try {
      localStorage.setItem('gameState', JSON.stringify(gameState));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, [gameState]);

  const startGame = useCallback((settings) => {
    setGameState({
      currentPage: 'game',
      gameSettings: {
        ...settings,
        moves: 0,
        time: 0
      }
    });
  }, []);

  const completeGame = useCallback((moves, time) => {
    setGameState(prev => ({
      currentPage: 'results',
      gameSettings: {
        ...prev.gameSettings,
        moves,
        time
      }
    }));
  }, []);

  const playAgain = useCallback(() => {
    setGameState(prev => ({
      currentPage: 'game',
      gameSettings: {
        ...prev.gameSettings,
        moves: 0,
        time: 0
      }
    }));
  }, []);

  const playNextLevel = useCallback((newDifficulty) => {
    setGameState(prev => ({
      currentPage: 'game',
      gameSettings: {
        ...prev.gameSettings,
        difficulty: newDifficulty || prev.gameSettings.difficulty + 1,
        moves: 0,
        time: 0
      }
    }));
  }, []);

  const goToMainMenu = useCallback(() => {
    setGameState({
      currentPage: 'start',
      gameSettings: {
        difficulty: 3,
        playerName: 'Player',
        showTimer: true,
        showHints: true,
        moves: 0,
        time: 0
      }
    });
  }, []);

  const exitGame = useCallback(() => {
    if (window.confirm('Are you sure you want to exit? Progress will not be saved.')) {
      goToMainMenu();
    }
  }, [goToMainMenu]);

  const renderPage = () => {
    switch (currentPage) {
      case 'start':
        return <StartPage onStartGame={startGame} />;

      case 'game':
        return (
            <GamePage
                difficulty={gameSettings.difficulty}
                playerName={gameSettings.playerName}
                showTimer={gameSettings.showTimer}
                showHints={gameSettings.showHints}
                onExit={exitGame}
                onComplete={completeGame}
                onPlayAgain={playAgain}
                onMainMenu={goToMainMenu}
                onNextLevel={playNextLevel}
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