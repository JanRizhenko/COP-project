import { useState, useEffect, useCallback } from 'react';

export const useTimer = (isGameWon, difficulty, moves) => {
  const getStorageKey = () => `game_timer_${difficulty}`;

  const loadSavedTime = () => {
    try {
      const saved = localStorage.getItem(getStorageKey());
      if (saved) {
        const data = JSON.parse(saved);
        return data.time || 0;
      }
    } catch (error) {
      console.error('Error loading timer:', error);
    }
    return 0;
  };

  const [time, setTime] = useState(loadSavedTime());
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (moves > 0 && !hasStarted) {
      setHasStarted(true);
    }
  }, [moves, hasStarted]);

  useEffect(() => {
    if (difficulty !== undefined) {
      try {
        localStorage.setItem(getStorageKey(), JSON.stringify({ time }));
      } catch (error) {
        console.error('Error saving timer:', error);
      }
    }
  }, [time, difficulty]);

  useEffect(() => {
    if (!hasStarted || isPaused || isGameWon || isStopped) return;

    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted, isPaused, isGameWon, isStopped]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const stopTimer = useCallback(() => {
    setIsStopped(true);
    setIsPaused(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTime(0);
    setIsPaused(false);
    setIsStopped(false);
    setHasStarted(false);
    if (difficulty !== undefined) {
      try {
        localStorage.removeItem(getStorageKey());
      } catch (error) {
        console.error('Error clearing timer:', error);
      }
    }
  }, [difficulty]);

  useEffect(() => {
    const savedTime = loadSavedTime();
    setTime(savedTime);
    setIsPaused(false);
    setIsStopped(false);
    setHasStarted(false);
  }, [difficulty]);

  useEffect(() => {
    if (isGameWon && difficulty !== undefined) {
      try {
        localStorage.removeItem(getStorageKey());
      } catch (error) {
        console.error('Error clearing timer:', error);
      }
    }
  }, [isGameWon, difficulty]);

  return {
    time,
    isPaused,
    togglePause,
    resetTimer,
    stopTimer
  };
};