import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import { useGame } from '../../context/GameContext';
import { useResultsPage } from '../../hooks';
import './ResultsPage.css';

const ResultsPage = () => {
  const { playerId } = useParams();
  const { gameState, playAgain, goToMainMenu } = useGame();

  const { difficulty = 3, moves = 0, time = 0 } = gameState.gameSettings || {};
  const minMoves = Math.pow(2, difficulty) - 1;

  const {
    efficiency,
    isOptimal,
    performanceRating,
    formattedTime
  } = useResultsPage(moves, minMoves, time);

  if (!gameState.playerId || gameState.playerId !== playerId) {
    return <Navigate to="/" replace />;
  }

  return (
      <div className="results-page">
        <div className="container">
          <Card className="results-page__card">
            <div className="results-page__header">
              <h2 className="results-page__title">Game Complete!</h2>
              <p className="results-page__rating" style={{ color: performanceRating.color }}>
                {performanceRating.text}
              </p>
            </div>

            <div className="results-page__stats">
              <div className="results-page__stat-card">
                <div className="results-page__stat-label">Difficulty</div>
                <div className="results-page__stat-value">{difficulty} disks</div>
              </div>

              <div className="results-page__stat-card">
                <div className="results-page__stat-label">Your Moves</div>
                <div className="results-page__stat-value">{moves}</div>
              </div>

              <div className="results-page__stat-card">
                <div className="results-page__stat-label">Minimum Moves</div>
                <div className="results-page__stat-value">{minMoves}</div>
              </div>

              <div className="results-page__stat-card">
                <div className="results-page__stat-label">Time</div>
                <div className="results-page__stat-value">{formattedTime}</div>
              </div>

              <div className="results-page__stat-card results-page__stat-card--wide">
                <div className="results-page__stat-label">Efficiency</div>
                <div className="results-page__stat-value">{efficiency}%</div>
                <div className="results-page__efficiency-bar">
                  <div
                      className="results-page__efficiency-fill"
                      style={{
                        width: `${efficiency}%`,
                        backgroundColor: performanceRating.color
                      }}
                  ></div>
                </div>
              </div>
            </div>

            {isOptimal && (
                <div className="results-page__achievement">
                  <strong>Achievement Unlocked:</strong> Perfect Solution!
                  <br />
                  You solved the puzzle with the minimum number of moves!
                </div>
            )}

            <div className="results-page__tips">
              <h3 className="results-page__tips-title">Interesting Facts:</h3>
              <ul className="results-page__tips-list">
                <li>For {difficulty} disks, minimum moves: 2<sup>{difficulty}</sup> - 1 = {minMoves}</li>
                <li>Legend says monks are moving 64 golden disks, and when they finish the world will end</li>
                <li>At 1 move per second, 64 disks would take over 584 billion years!</li>
              </ul>
            </div>

            <div className="results-page__actions">
              <Button
                  variant="secondary"
                  size="large"
                  onClick={playAgain}
              >
                Play Again
              </Button>
              <Button
                  variant="primary"
                  size="large"
                  onClick={goToMainMenu}
              >
                Main Menu
              </Button>
            </div>
          </Card>
        </div>
      </div>
  );
};

export default ResultsPage;