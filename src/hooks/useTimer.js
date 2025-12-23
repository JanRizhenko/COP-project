import { useState, useEffect, useCallback } from 'react';

export const useTimer = (isGameWon) => {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || isGameWon) return;

    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, isGameWon]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setTime(0);
    setIsPaused(false);
  }, []);

  return {
    time,
    isPaused,
    togglePause,
    resetTimer
  };
};
