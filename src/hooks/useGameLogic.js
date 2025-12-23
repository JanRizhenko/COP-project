import { useState, useEffect } from 'react';

export const useGameLogic = (difficulty) => {
  const getStorageKey = () => `game_progress_${difficulty}`;

  const initializeRods = () => {
    return [
      Array.from({ length: difficulty }, (_, i) => difficulty - i),
      [],
      []
    ];
  };

  const loadGameProgress = () => {
    try {
      const saved = localStorage.getItem(getStorageKey());
      if (saved) {
        const data = JSON.parse(saved);
        if (data.difficulty === difficulty && data.rods) {
          return {
            rods: data.rods,
            moves: data.moves || 0,
            isGameWon: data.isGameWon || false
          };
        }
      }
    } catch (error) {
      console.error('Error loading game progress:', error);
    }
    return {
      rods: initializeRods(),
      moves: 0,
      isGameWon: false
    };
  };

  const savedProgress = loadGameProgress();

  const [rods, setRods] = useState(savedProgress.rods);
  const [selectedRod, setSelectedRod] = useState(null);
  const [moves, setMoves] = useState(savedProgress.moves);
  const [isGameWon, setIsGameWon] = useState(savedProgress.isGameWon);

  const minMoves = Math.pow(2, difficulty) - 1;

  useEffect(() => {
    try {
      const gameProgress = {
        difficulty,
        rods,
        moves,
        isGameWon
      };
      localStorage.setItem(getStorageKey(), JSON.stringify(gameProgress));
    } catch (error) {
      console.error('Error saving game progress:', error);
    }
  }, [rods, moves, isGameWon, difficulty]);

  const handleRodClick = (rodId) => {
    if (isGameWon) return;

    setSelectedRod(prevSelected => {
      if (prevSelected === null) {
        return rods[rodId].length > 0 ? rodId : null;
      } else {
        if (prevSelected === rodId) {
          return null;
        } else {
          setRods(currentRods => {
            if (currentRods[prevSelected].length === 0) {
              return currentRods;
            }

            const fromDisk = currentRods[prevSelected][currentRods[prevSelected].length - 1];
            const canMove = currentRods[rodId].length === 0 ||
                fromDisk < currentRods[rodId][currentRods[rodId].length - 1];

            if (canMove) {
              const newRods = currentRods.map(rod => [...rod]);
              const disk = newRods[prevSelected].pop();
              newRods[rodId].push(disk);

              setMoves(prev => prev + 1);
              return newRods;
            }

            return currentRods;
          });

          return null;
        }
      }
    });
  };

  const resetGame = () => {
    const newRods = initializeRods();
    setRods(newRods);
    setSelectedRod(null);
    setMoves(0);
    setIsGameWon(false);

    try {
      localStorage.removeItem(getStorageKey());
    } catch (error) {
      console.error('Error clearing game progress:', error);
    }
  };

  useEffect(() => {
    if (rods[2].length === difficulty && !isGameWon) {
      setIsGameWon(true);
      try {
        localStorage.removeItem(getStorageKey());
      } catch (error) {
        console.error('Error clearing game progress:', error);
      }
    }
  }, [rods, difficulty, isGameWon]);

  useEffect(() => {
    const savedProgress = loadGameProgress();
    setRods(savedProgress.rods);
    setMoves(savedProgress.moves);
    setIsGameWon(savedProgress.isGameWon);
    setSelectedRod(null);
  }, [difficulty]);

  return {
    rods,
    selectedRod,
    moves,
    minMoves,
    isGameWon,
    handleRodClick,
    resetGame
  };
};