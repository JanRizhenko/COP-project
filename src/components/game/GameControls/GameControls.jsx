import React from 'react';
import Button from '../../common/Button/Button';
import './GameControls.css';

const GameControls = ({ 
  moves = 0,
  time = 0,
  onReset,
  onPause,
  isPaused = false,
  minMoves = 0
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-controls">
      <div className="game-controls__stats">
        <div className="game-controls__stat">
          <span className="game-controls__stat-label">Moves:</span>
          <span className="game-controls__stat-value">{moves}</span>
        </div>
        <div className="game-controls__stat">
          <span className="game-controls__stat-label">Minimum:</span>
          <span className="game-controls__stat-value">{minMoves}</span>
        </div>
        <div className="game-controls__stat">
          <span className="game-controls__stat-label">Time:</span>
          <span className="game-controls__stat-value">{formatTime(time)}</span>
        </div>
      </div>
      <div className="game-controls__buttons">
        <Button 
          variant="secondary" 
          size="small"
          onClick={onPause}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
        <Button 
          variant="danger" 
          size="small"
          onClick={onReset}
        >
          Restart
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
