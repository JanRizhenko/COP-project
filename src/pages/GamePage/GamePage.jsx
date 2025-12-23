import React, { useEffect, useState } from 'react';
import GameBoard from '../../components/game/GameBoard/GameBoard';
import GameControls from '../../components/game/GameControls/GameControls';
import GameCompleteModal from '../../components/game/GameCompleteModal/GameCompleteModal';
import Button from '../../components/common/Button/Button';
import { useGameLogic, useTimer } from '../../hooks';
import './GamePage.css';

const GamePage = ({
                      difficulty = 3,
                      playerName = 'Player',
                      showTimer = true,
                      showHints = true,
                      onExit,
                      onComplete,
                      onPlayAgain,
                      onMainMenu,
                      onNextLevel
                  }) => {
    const [showModal, setShowModal] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

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
    } = useTimer(isGameWon, difficulty);

    useEffect(() => {
        if (isPaused && moves > 0) {
            togglePause();
        }
    }, [moves]);

    useEffect(() => {
        if (isGameWon && !gameCompleted) {
            setGameCompleted(true);
            setTimeout(() => {
                setShowModal(true);
            }, 800);
        }
    }, [isGameWon, gameCompleted]);

    const handleReset = () => {
        resetGame();
        resetTimer();
        setGameCompleted(false);
        setShowModal(false);
    };

    const handlePlayAgainClick = () => {
        setShowModal(false);
        setGameCompleted(false);
        resetGame();
        resetTimer();
    };

    const handleNextLevelClick = () => {
        setShowModal(false);
        setGameCompleted(false);
        if (onNextLevel) {
            onNextLevel(difficulty + 1);
        }
    };

    const handleMainMenuClick = () => {
        setShowModal(false);
        if (onMainMenu) {
            onMainMenu();
        }
    };

    return (
        <div className="game-page">
            <div className="container">
                <div className="game-page__content">
                    <div className="game-page__header">
                        <h2 className="game-page__title">
                            {playerName}'s Game - Difficulty Level: {difficulty} disks
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
                        time={showTimer ? time : null}
                        minMoves={minMoves}
                        isPaused={isPaused}
                        onReset={handleReset}
                        onPause={showTimer ? togglePause : null}
                    />

                    <GameBoard
                        rods={rods}
                        onRodClick={handleRodClick}
                        selectedRod={selectedRod}
                    />

                    {showHints && !isGameWon && (
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
                            <div className="game-page__hint">
                <span className="game-page__hint-text">
                  Larger discs cannot be placed on smaller ones
                </span>
                            </div>
                        </div>
                    )}

                    {isGameWon && !showModal && (
                        <div className="game-page__victory">
                            <h3>Congratulations! You Won!</h3>
                            <p>Preparing results...</p>
                        </div>
                    )}
                </div>
            </div>

            <GameCompleteModal
                isOpen={showModal}
                moves={moves}
                minMoves={minMoves}
                time={time}
                difficulty={difficulty}
                playerName={playerName}
                onPlayAgain={handlePlayAgainClick}
                onMainMenu={handleMainMenuClick}
                onNextLevel={handleNextLevelClick}
            />
        </div>
    );
};

export default GamePage;