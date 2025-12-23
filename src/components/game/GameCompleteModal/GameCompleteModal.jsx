import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '../../common/Button/Button';
import './GameCompleteModal.css';

const GameCompleteModal = ({
                               isOpen,
                               moves,
                               minMoves,
                               time,
                               difficulty,
                               playerName,
                               onPlayAgain,
                               onMainMenu,
                               onNextLevel
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

    const efficiency = Math.round((minMoves / moves) * 100);
    const isOptimal = moves === minMoves;

    const getPerformanceRating = () => {
        if (isOptimal) return { text: 'Perfect!', color: '#f1c40f' };
        if (efficiency >= 90) return { text: 'Excellent!', color: '#4CAF50' };
        if (efficiency >= 75) return { text: 'Good!', color: '#2196F3' };
        if (efficiency >= 60) return { text: 'Not Bad!', color: '#ff9800' };
        return { text: 'Can Do Better!', color: '#f44336' };
    };

    const rating = getPerformanceRating();

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

    const canPlayNextLevel = difficulty < 8;

    const modalContent = (
        <div className="modal-overlay" onClick={onMainMenu}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header" style={{ backgroundColor: rating.color }}>
                    <h2 className="modal-title">Congratulations{playerName ? `, ${playerName}` : ''}!</h2>
                    <p className="modal-subtitle">You completed the game!</p>
                </div>

                <div className="modal-body">
                    <div className="performance-rating" style={{ color: rating.color }}>
                        <h3 className="rating-text">{rating.text}</h3>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-label">Difficulty Level</div>
                            <div className="stat-value">{difficultyLabels[difficulty]}</div>
                            <div className="stat-sub">({difficulty} disks)</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-label">Your Moves</div>
                            <div className="stat-value">{moves}</div>
                            <div className="stat-sub">minimum: {minMoves}</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-label">Time</div>
                            <div className="stat-value">{formatTime(time)}</div>
                            <div className="stat-sub">mm:ss</div>
                        </div>

                        <div className="stat-card highlight">
                            <div className="stat-label">Efficiency</div>
                            <div className="stat-value">{efficiency}%</div>
                            <div className="stat-sub">
                                {isOptimal ? 'Perfect solution!' : `${moves - minMoves} extra moves`}
                            </div>
                        </div>
                    </div>

                    {isOptimal && (
                        <div className="achievement-badge">
                            <div className="badge-content">
                                <strong>Achievement Unlocked!</strong>
                                <p>Perfect Solution - Solved with minimum moves!</p>
                            </div>
                        </div>
                    )}

                    <div className="efficiency-bar-container">
                        <div className="efficiency-bar">
                            <div
                                className="efficiency-fill"
                                style={{
                                    width: `${efficiency}%`,
                                    backgroundColor: rating.color
                                }}
                            />
                        </div>
                        <span className="efficiency-label">{efficiency}% Efficiency</span>
                    </div>
                </div>

                <div className="modal-footer">
                    <h3 className="modal-footer-title">What's next?</h3>
                    <div className="modal-actions">
                        <Button
                            variant="secondary"
                            size="large"
                            onClick={onPlayAgain}
                        >
                            Play Again
                        </Button>

                        {canPlayNextLevel && (
                            <Button
                                variant="primary"
                                size="large"
                                onClick={onNextLevel}
                            >
                                Next Level
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

export default GameCompleteModal;