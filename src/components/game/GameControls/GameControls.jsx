import React from 'react';
import Button from '../../common/Button/Button';
import './GameControls.css';

const GameControls = ({
                          moves,
                          time,
                          minMoves,
                          isPaused,
                          onReset,
                          onPause,
                          timeLimit,
                          maxMoves
                      }) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isTimeCritical = timeLimit && time >= timeLimit * 0.8;
    const isMovesCritical = maxMoves && moves >= maxMoves * 0.8;

    return (
        <div className="game-controls">
            <div className="game-controls__stats">
                <div className={`game-controls__stat ${isMovesCritical ? 'game-controls__stat--warning' : ''}`}>
                    <span className="game-controls__stat-label">Moves:</span>
                    <span className="game-controls__stat-value">
            {moves}
                        {maxMoves && ` / ${maxMoves}`}
          </span>
                </div>

                {time !== null && (
                    <div className={`game-controls__stat ${isTimeCritical ? 'game-controls__stat--warning' : ''}`}>
                        <span className="game-controls__stat-label">Time:</span>
                        <span className="game-controls__stat-value">
              {formatTime(time)}
                            {timeLimit && ` / ${formatTime(timeLimit)}`}
            </span>
                    </div>
                )}

                <div className="game-controls__stat">
                    <span className="game-controls__stat-label">Min Moves:</span>
                    <span className="game-controls__stat-value">{minMoves}</span>
                </div>
            </div>

            <div className="game-controls__buttons">
                {onPause && (
                    <Button
                        variant={isPaused ? "warning" : "secondary"}
                        size="small"
                        onClick={onPause}
                    >
                        {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                )}

                <Button
                    variant="secondary"
                    size="small"
                    onClick={onReset}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default GameControls;