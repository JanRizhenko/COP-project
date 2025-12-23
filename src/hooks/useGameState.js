import { useState, useCallback } from 'react';

export const useGameState = () => {
  const [currentPage, setCurrentPage] = useState('start');
  const [gameSettings, setGameSettings] = useState({
    difficulty: 3,
    moves: 0,
    time: 0
  });

  const startGame = useCallback((difficulty) => {
    setGameSettings(prev => ({ ...prev, difficulty }));
    setCurrentPage('game');
  }, []);

  const completeGame = useCallback((moves, time) => {
    setGameSettings(prev => ({ ...prev, moves, time }));
    setCurrentPage('results');
  }, []);

  const playAgain = useCallback(() => {
    setCurrentPage('game');
  }, []);

  const goToMainMenu = useCallback(() => {
    setGameSettings({ difficulty: 3, moves: 0, time: 0 });
    setCurrentPage('start');
  }, []);

  const exitGame = useCallback(() => {
    if (window.confirm('Are you sure you want to exit? Progress will not be saved.')) {
      setCurrentPage('start');
    }
  }, []);

  return {
    currentPage,
    gameSettings,
    startGame,
    completeGame,
    playAgain,
    goToMainMenu,
    exitGame
  };
};
