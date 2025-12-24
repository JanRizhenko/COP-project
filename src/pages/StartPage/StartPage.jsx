import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import GameSettingsForm from '../../components/game/GameSettingsForm/GameSettingsForm';
import { useGame } from '../../context/GameContext';
import './StartPage.css';

const StartPage = () => {
  const { playerId } = useParams();
  const location = useLocation();
  const { startGame } = useGame();
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (location.state?.openCustomGame) {
      setShowSettings(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleQuickStart = (difficulty) => {
    startGame({
      difficulty,
      playerName: playerId ? playerId.split('-')[0] : 'Player',
      showTimer: true,
      showHints: true,
      timeLimit: null,
      maxMoves: null
    });
  };

  const handleSettingsSubmit = (settings) => {
    startGame(settings);
  };

  if (showSettings) {
    return (
        <div className="start-page">
          <div className="container">
            <GameSettingsForm
                onSubmit={handleSettingsSubmit}
                onCancel={() => setShowSettings(false)}
            />
          </div>
        </div>
    );
  }

  const difficulties = [
    { level: 3, label: 'EASY', minMoves: 7 },
    { level: 4, label: 'MEDIUM', minMoves: 15 },
    { level: 5, label: 'HARD', minMoves: 31 },
    { level: 6, label: 'EXPERT', minMoves: 63 },
    { level: 7, label: 'MASTER', minMoves: 127 },
    { level: 8, label: 'LEGENDARY', minMoves: 255 }
  ];

  return (
      <div className="start-page">
        <div className="container">
          <Card className="start-page__card">
            <div className="start-page__hero">
              <h2 className="start-page__title">Welcome to the Game!</h2>
              <p className="start-page__description">
                Tower of Hanoi is a classic mathematical puzzle consisting of three rods
                and disks of different sizes. The goal is to move the entire stack
                from the first rod to the last one.
              </p>
            </div>

            <div className="start-page__rules">
              <h3 className="start-page__rules-title">Game Rules:</h3>
              <ul className="start-page__rules-list">
                <li>Only one disk can be moved at a time</li>
                <li>Only the top disk from a rod can be taken</li>
                <li>A larger disk cannot be placed on a smaller disk</li>
                <li>Move all disks to the third rod</li>
              </ul>
            </div>

            <div className="start-page__actions">
              <Button
                  variant="primary"
                  size="large"
                  onClick={() => setShowSettings(true)}
              >
                Custom Game Settings
              </Button>
            </div>

            <div className="start-page__divider">
              <span>or quick start</span>
            </div>

            <div className="start-page__difficulty">
              <h3 className="start-page__difficulty-title">Choose Difficulty Level:</h3>
              <div className="start-page__difficulty-grid">
                {difficulties.map(({ level, label, minMoves }) => (
                    <button
                        key={level}
                        className="difficulty-card"
                        onClick={() => handleQuickStart(level)}
                    >
                      <div className="difficulty-card__label">{label}</div>
                      <div className="difficulty-card__disks">{level} disks</div>
                      <div className="difficulty-card__moves">Min: {minMoves} moves</div>
                    </button>
                ))}
              </div>
            </div>

            <div className="start-page__tip">
              <strong>Tip:</strong> Minimum number of moves = 2<sup>n</sup> - 1,
              where n is the number of disks
            </div>
          </Card>
        </div>
      </div>
  );
};

export default StartPage;