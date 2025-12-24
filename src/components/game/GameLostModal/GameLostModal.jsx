import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '../../common/Button/Button';
import './GameLostModal.css';

const GameLostModal = ({
                           isOpen,
                           moves,
                           minMoves,
                           time,
                           difficulty,
                           playerName,
                           lossReason,
                           maxMoves,
                           timeLimit,
                           onTryAgain,
                           onMainMenu,
                           onAdjustSettings
                       }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const difficultyLabels = {
        3: 'Easy',
        4: 'Medium',
        5: 'Hard',
        6: 'Expert',
        7: 'Master',
        8: 'Legendary'
    };

    const getLossMessage = () => {
        if (lossReason === 'moves') {
            return {
                title: 'Out of Moves!',
                subtitle: `You've reached the maximum of ${maxMoves} moves`,
                tip: `The optimal solution requires ${minMoves} moves. Study the pattern: move smaller disks to temporary positions while moving larger ones to the target.`
            };
        } else if (lossReason === 'time') {
            return {
                title: 'Time\'s Up!',
                subtitle: `You've reached the time limit of ${formatTime(timeLimit)}`,
                tip: 'Plan your moves in advance before making them.'
            };
        }
        return {
            title: 'Game Over!',
            subtitle: 'Better luck next time!',
            tip: 'Keep practicing to improve your skills.'
        };
    };

    const lossMessage = getLossMessage();

    const modalContent = (
        <div className="modal-overlay lost" onClick={onMainMenu}>
            <div className="modal-content lost" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header lost">
                    <h2 className="modal-title">{lossMessage.title}</h2>
                    <p className="modal-subtitle">{lossMessage.subtitle}</p>
                </div>

                <div className="modal-body">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-label">Difficulty Level</div>
                            <div className="stat-value">{difficultyLabels[difficulty]}</div>
                            <div className="stat-sub">({difficulty} disks)</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-label">Your Moves</div>
                            <div className="stat-value">{moves}</div>
                            <div className="stat-sub">
                                {maxMoves ? `limit: ${maxMoves}` : `minimum: ${minMoves}`}
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-label">Time Taken</div>
                            <div className="stat-value">{formatTime(time)}</div>
                            <div className="stat-sub">
                                {timeLimit ? `limit: ${formatTime(timeLimit)}` : 'mm:ss'}
                            </div>
                        </div>

                        {lossReason === 'moves' && (
                            <div className="stat-card highlight lost">
                                <div className="stat-label">Moves Over</div>
                                <div className="stat-value">+{moves - maxMoves}</div>
                                <div className="stat-sub">extra moves used</div>
                            </div>
                        )}

                        {lossReason === 'time' && (
                            <div className="stat-card highlight lost">
                                <div className="stat-label">Time Over</div>
                                <div className="stat-value">+{formatTime(time - timeLimit)}</div>
                                <div className="stat-sub">extra time used</div>
                            </div>
                        )}
                    </div>

                    <div className="tip-container">
                        <div className="tip-content">
                            <strong>Tip:</strong>
                            <p>{lossMessage.tip}</p>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <h3 className="modal-footer-title">What would you like to do?</h3>
                    <div className="modal-actions">
                        <Button
                            variant="primary"
                            size="large"
                            onClick={onTryAgain}
                        >
                            Try Again
                        </Button>

                        {(maxMoves || timeLimit) && (
                            <Button
                                variant="secondary"
                                size="large"
                                onClick={onAdjustSettings}
                            >
                                Change Settings
                            </Button>
                        )}

                        <Button
                            variant="secondary"
                            size="medium"
                            onClick={onMainMenu}
                        >
                            Main Menu
                        </Button>
                    </div>
                </div>

                <button
                    className="modal-close"
                    onClick={onMainMenu}
                    aria-label="Close modal"
                >
                    ×
                </button>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default GameLostModal;