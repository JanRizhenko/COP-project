import { useState, useEffect } from 'react';

export const useGameLogic = (difficulty) => {
  const initializeRods = () => {
    return [
      Array.from({ length: difficulty }, (_, i) => difficulty - i),
      [],
      []
    ];
  };

  const [rods, setRods] = useState(initializeRods);
  const [selectedRod, setSelectedRod] = useState(null);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  const minMoves = Math.pow(2, difficulty) - 1;

  const handleRodClick = (rodId) => {
    if (isGameWon) return;

    setSelectedRod(prevSelected => {
      if (prevSelected === null) {
        setRods(currentRods => {
          if (currentRods[rodId].length > 0) {
            return currentRods;
          }
          return currentRods;
        });
        
        setRods(currentRods => {
          return currentRods[rodId].length > 0 ? currentRods : currentRods;
        });
        
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
    setRods(initializeRods());
    setSelectedRod(null);
    setMoves(0);
    setIsGameWon(false);
  };

  useEffect(() => {
    if (rods[2].length === difficulty) {
      setIsGameWon(true);
    }
  }, [rods, difficulty]);

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
