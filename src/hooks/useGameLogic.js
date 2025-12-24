import { useState, useEffect } from 'react';

export const useGameLogic = (difficulty, maxMoves = null, timeLimit = null) => {
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
            isGameWon: false,
            isGameLost: false
          };
        }
      }
    } catch (error) {
      console.error('Error loading game progress:', error);
    }
    return {
      rods: initializeRods(),
      moves: 0,
      isGameWon: false,
      isGameLost: false
    };
  };

  const savedProgress = loadGameProgress();

  const [rods, setRods] = useState(savedProgress.rods);
  const [selectedRod, setSelectedRod] = useState(null);
  const [moves, setMoves] = useState(savedProgress.moves);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);

  const minMoves = Math.pow(2, difficulty) - 1;

  useEffect(() => {
    if (!isGameWon && !isGameLost) {
      try {
        const gameProgress = {
          difficulty,
          rods,
          moves
        };
        localStorage.setItem(getStorageKey(), JSON.stringify(gameProgress));
      } catch (error) {
        console.error('Error saving game progress:', error);
      }
    }
  }, [rods, moves, difficulty, isGameWon, isGameLost]);

  const handleRodClick = (rodId) => {
    if (isGameWon || isGameLost) return;

    if (selectedRod === null) {
      if (rods[rodId].length > 0) {
        setSelectedRod(rodId);
      }
    } else if (selectedRod === rodId) {
      setSelectedRod(null);
    } else {
      if (rods[selectedRod].length === 0) {
        setSelectedRod(null);
        return;
      }

      const fromDisk = rods[selectedRod][rods[selectedRod].length - 1];
      const canMove = rods[rodId].length === 0 ||
          fromDisk < rods[rodId][rods[rodId].length - 1];

      if (canMove) {
        const newRods = rods.map(rod => [...rod]);
        const disk = newRods[selectedRod].pop();
        newRods[rodId].push(disk);

        const hasWon = newRods[2].length === difficulty;
        const newMoves = moves + 1;

        console.log('Move Debug:', {
          move: `Rod ${selectedRod} → Rod ${rodId}`,
          disk: disk,
          rodA: newRods[0].length,
          rodB: newRods[1].length,
          rodC: newRods[2].length,
          difficulty: difficulty,
          hasWon: hasWon,
          rodCArray: newRods[2],
          winCheck: `${newRods[2].length} === ${difficulty} = ${newRods[2].length === difficulty}`,
          currentMoves: newMoves,
          maxMoves: maxMoves
        });

        setRods(newRods);
        setSelectedRod(null);
        setMoves(newMoves);

        if (hasWon) {
          console.log('WIN DETECTED! Setting state now...');
          setIsGameWon(true);
          try {
            localStorage.removeItem(getStorageKey());
          } catch (error) {
            console.error('Error clearing storage:', error);
          }
        } else if (maxMoves && newMoves >= maxMoves) {
          console.log('LOSS: Max moves exceeded');
          setIsGameLost(true);
          try {
            localStorage.removeItem(getStorageKey());
          } catch (error) {
            console.error('Error clearing storage:', error);
          }
        }
      } else {
        setSelectedRod(null);
      }
    }
  };

  const resetGame = () => {
    console.log('Resetting game...');
    const newRods = initializeRods();
    setRods(newRods);
    setSelectedRod(null);
    setMoves(0);
    setIsGameWon(false);
    setIsGameLost(false);

    try {
      localStorage.removeItem(getStorageKey());
    } catch (error) {
      console.error('Error clearing game progress:', error);
    }
  };

  useEffect(() => {
    console.log('Difficulty changed, loading progress...');
    const savedProgress = loadGameProgress();
    setRods(savedProgress.rods);
    setMoves(savedProgress.moves);
    setIsGameWon(false);
    setIsGameLost(false);
    setSelectedRod(null);
  }, [difficulty]);

  const triggerLoss = () => {
    console.log('Time limit reached, triggering loss...');
    if (!isGameWon && !isGameLost) {
      setIsGameLost(true);
      try {
        localStorage.removeItem(getStorageKey());
      } catch (error) {
        console.error('Error clearing storage:', error);
      }
    }
  };

  return {
    rods,
    selectedRod,
    moves,
    minMoves,
    isGameWon,
    isGameLost,
    handleRodClick,
    resetGame,
    triggerLoss
  };
};