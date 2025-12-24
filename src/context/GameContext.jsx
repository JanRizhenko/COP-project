import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GameContext = createContext();

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within GameProvider');
    }
    return context;
};

const clearAllGameStorage = () => {
    try {
        for (let i = 3; i <= 8; i++) {
            localStorage.removeItem(`game_progress_${i}`);
            localStorage.removeItem(`game_timer_${i}`);
        }
        localStorage.removeItem('gameState');
    } catch (error) {
        console.error('Error clearing storage:', error);
    }
};

export const GameProvider = ({ children }) => {
    const navigate = useNavigate();

    const loadGameState = () => {
        try {
            const saved = localStorage.getItem('gameState');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading game state:', error);
        }
        return {
            playerId: null,
            gameSettings: {
                difficulty: 3,
                playerName: 'Player',
                showTimer: true,
                showHints: true,
                timeLimit: null,
                maxMoves: null,
                moves: 0,
                time: 0
            }
        };
    };

    const [gameState, setGameState] = useState(loadGameState);

    useEffect(() => {
        try {
            localStorage.setItem('gameState', JSON.stringify(gameState));
        } catch (error) {
            console.error('Error saving game state:', error);
        }
    }, [gameState]);

    const generatePlayerId = (playerName) => {
        return `${playerName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    };

    const startGame = (settings) => {
        clearAllGameStorage();

        const playerId = generatePlayerId(settings.playerName);
        setGameState({
            playerId,
            gameSettings: {
                ...settings,
                difficulty: Number(settings.difficulty), // Ensure it's a number
                moves: 0,
                time: 0
            }
        });
        navigate(`/player/${playerId}/game`);
    };

    const completeGame = (moves, time) => {
        setGameState(prev => ({
            ...prev,
            gameSettings: {
                ...prev.gameSettings,
                moves,
                time
            }
        }));
        navigate(`/player/${gameState.playerId}/results`);
    };

    const playAgain = () => {
        const difficulty = Number(gameState.gameSettings.difficulty);
        try {
            localStorage.removeItem(`game_progress_${difficulty}`);
            localStorage.removeItem(`game_timer_${difficulty}`);
        } catch (error) {
            console.error('Error clearing game progress:', error);
        }

        setGameState(prev => ({
            ...prev,
            gameSettings: {
                ...prev.gameSettings,
                moves: 0,
                time: 0
            }
        }));

        navigate(`/player/${gameState.playerId}/game`, { replace: true });
        window.location.reload();
    };

    const playNextLevel = () => {
        const currentDifficulty = Number(gameState.gameSettings.difficulty);
        const newDifficulty = Math.min(currentDifficulty + 1, 8);
        const minMoves = Math.pow(2, newDifficulty) - 1;

        console.log('Next Level:', {
            current: currentDifficulty,
            next: newDifficulty,
            calculation: `${currentDifficulty} + 1 = ${currentDifficulty + 1}`,
            type: typeof currentDifficulty
        });

        clearAllGameStorage();

        setGameState(prev => ({
            ...prev,
            gameSettings: {
                ...prev.gameSettings,
                difficulty: newDifficulty,
                maxMoves: prev.gameSettings.maxMoves ? Math.max(prev.gameSettings.maxMoves, minMoves) : null,
                moves: 0,
                time: 0
            }
        }));

        navigate(`/player/${gameState.playerId}/game`, { replace: true });
        window.location.reload();
    };

    const goToMainMenu = () => {
        clearAllGameStorage();

        setGameState({
            playerId: null,
            gameSettings: {
                difficulty: 3,
                playerName: 'Player',
                showTimer: true,
                showHints: true,
                timeLimit: null,
                maxMoves: null,
                moves: 0,
                time: 0
            }
        });
        navigate('/');
    };

    const exitGame = () => {
        if (window.confirm('Are you sure you want to exit? Progress will not be saved.')) {
            goToMainMenu();
        }
    };

    const value = {
        gameState,
        startGame,
        completeGame,
        playAgain,
        playNextLevel,
        goToMainMenu,
        exitGame
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};