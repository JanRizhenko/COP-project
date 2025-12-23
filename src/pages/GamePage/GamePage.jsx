import React, { useEffect } from 'react';
import GameBoard from '../../components/game/GameBoard/GameBoard';
import GameControls from '../../components/game/GameControls/GameControls';
import Button from '../../components/common/Button/Button';
import { useGameLogic, useTimer } from '../../hooks';
import './GamePage.css';

const GamePage = ({ difficulty = 3, onExit, onComplete }) => {
  const {
    rods,
    selectedRod,
    moves,
    minMoves,
    isGameWon,
    handleRodClick,
    resetGame
  } = useGameLogic(difficulty);

  const {
    time,
    isPaused,
    togglePause,
    resetTimer
  } = useTimer(isGameWon);

  useEffect(() => {
    if (isGameWon && onComplete) {
      setTimeout(() => {
        onComplete(moves, time);
      }, 1500);
    }
  }, [isGameWon, moves, time, onComplete]);

  const handleReset = () => {
    resetGame();
    resetTimer();
  };

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
            onPause={togglePause}
          />

          <GameBoard
            rods={rods}
            onRodClick={handleRodClick}
            selectedRod={selectedRod}
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
              <p>Redirecting to results...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
