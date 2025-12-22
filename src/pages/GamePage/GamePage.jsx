import React, { useState } from 'react';
import GameBoard from '../../components/game/GameBoard/GameBoard';
import GameControls from '../../components/game/GameControls/GameControls';
import Button from '../../components/common/Button/Button';
import './GamePage.css';

const GamePage = ({ difficulty = 3, onExit, onComplete }) => {
  const initialRods = [
    Array.from({ length: difficulty }, (_, i) => difficulty - i),
    [],
    []
  ];

  const [rods, setRods] = useState(initialRods);
  const [selectedRod, setSelectedRod] = useState(null);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const minMoves = Math.pow(2, difficulty) - 1;

  const handleRodClick = (rodId) => {
    console.log('Rod clicked:', rodId);
    console.log('Selected rod:', selectedRod);
  };

  const handleReset = () => {
    setRods(initialRods);
    setSelectedRod(null);
    setMoves(0);
    setTime(0);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const isGameWon = rods[2].length === difficulty;

  return (
    <div className="game-page">
      <div className="container">
        <div className="game-page__content">
          <div className="game-page__header">
            <h2 className="game-page__title">
              Difficulty Level: {difficulty} disks
            </h2>
            <Button 
              variant="danger" 
              size="small"
              onClick={onExit}
            >
              Exit Game
            </Button>
          </div>

          <GameControls
            moves={moves}
            time={time}
            minMoves={minMoves}
            isPaused={isPaused}
            onReset={handleReset}
            onPause={handlePause}
          />

          <GameBoard
            rods={rods}
            onRodClick={handleRodClick}
            selectedDisk={selectedRod !== null ? rods[selectedRod]?.[rods[selectedRod].length - 1] : null}
          />

          <div className="game-page__hints">
            <div className="game-page__hint">
              <span className="game-page__hint-text">
                Click on a rod to select the top disk
              </span>
            </div>
            <div className="game-page__hint">
              <span className="game-page__hint-text">
                Goal: move all disks to rod C
              </span>
            </div>
          </div>

          {isGameWon && (
            <div className="game-page__victory">
              <h3>Congratulations! You Won!</h3>
              <Button variant="secondary" onClick={() => onComplete(moves, time)}>
                View Results
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
