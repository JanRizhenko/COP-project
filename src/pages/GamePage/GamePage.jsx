import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { useGameLogic } from '../../hooks/useGameLogic';
import { useTimer } from '../../hooks/useTimer';
import GameBoard from '../../components/game/GameBoard/GameBoard';
import GameControls from '../../components/game/GameControls/GameControls';
import GameCompleteModal from '../../components/game/GameCompleteModal/GameCompleteModal';
import GameLostModal from '../../components/game/GameLostModal/GameLostModal';
import Button from '../../components/common/Button/Button';
import './GamePage.css';

const GamePage = () => {
    const navigate = useNavigate();
    const { gameState, playAgain, playNextLevel, goToMainMenu, exitGame } = useGame();
    const { difficulty, playerName, maxMoves, timeLimit, showHints } = gameState.gameSettings;

    const {
        rods,
        selectedRod,
        moves,
        minMoves,
        isGameWon,
        isGameLost,
        handleRodClick,
        resetGame,
        triggerLoss
    } = useGameLogic(difficulty, maxMoves, timeLimit);

    const { time, isPaused, togglePause, resetTimer } = useTimer(isGameWon || isGameLost, difficulty, moves);

    useEffect(() => {
        if (timeLimit && time >= timeLimit && !isGameWon && !isGameLost) {
            triggerLoss();
        }
    }, [time, timeLimit, isGameWon, isGameLost, triggerLoss]);

    const getLossReason = () => {
        if (maxMoves && moves >= maxMoves) return 'moves';
        if (timeLimit && time >= timeLimit) return 'time';
        return null;
    };

    const handleReset = () => {
        resetGame();
        resetTimer();
    };

    const handlePlayAgain = () => {
        resetGame();
        resetTimer();
        playAgain();
    };

    const handleNextLevel = () => {
        playNextLevel();
    };

    const handleAdjustSettings = () => {
        navigate('/', { state: { openCustomGame: true } });
    };

    const handleExit = () => {
        if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
            goToMainMenu();
        }
    };

    return (
        <div className="game-page">
            <div className="game-page__content">
                <div className="game-page__header">
                    <h1 className="game-page__title">Tower of Hanoi</h1>
                    <Button
                        variant="secondary"
                        size="medium"
                        onClick={handleExit}
                    >
                        Exit to Menu
                    </Button>
                </div>

                <GameControls
                    moves={moves}
                    minMoves={minMoves}
                    time={time}
                    isPaused={isPaused}
                    onPause={togglePause}
                    onReset={handleReset}
                    difficulty={difficulty}
                    maxMoves={maxMoves}
                    timeLimit={timeLimit}
                />

                <GameBoard
                    rods={rods}
                    selectedRod={selectedRod}
                    onRodClick={handleRodClick}
                    difficulty={difficulty}
                />

                {showHints && (
                    <div className="game-page__hints">
                        <div className="game-page__hint">
                            <span className="game-page__hint-text">
                                Only move one disk at a time
                            </span>
                        </div>
                        <div className="game-page__hint">
                            <span className="game-page__hint-text">
                                Larger disks cannot go on smaller ones
                            </span>
                        </div>
                        <div className="game-page__hint">
                            <span className="game-page__hint-text">
                                Move all disks to the third rod
                            </span>
                        </div>
                    </div>
                )}

                <GameCompleteModal
                    isOpen={isGameWon}
                    moves={moves}
                    minMoves={minMoves}
                    time={time}
                    difficulty={difficulty}
                    playerName={playerName}
                    onPlayAgain={handlePlayAgain}
                    onMainMenu={goToMainMenu}
                    onNextLevel={handleNextLevel}
                />

                <GameLostModal
                    isOpen={isGameLost}
                    moves={moves}
                    minMoves={minMoves}
                    time={time}
                    difficulty={difficulty}
                    playerName={playerName}
                    lossReason={getLossReason()}
                    maxMoves={maxMoves}
                    timeLimit={timeLimit}
                    onTryAgain={handlePlayAgain}
                    onMainMenu={goToMainMenu}
                    onAdjustSettings={handleAdjustSettings}
                />
            </div>
        </div>
    );
};

export default GamePage;