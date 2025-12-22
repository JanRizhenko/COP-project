import React from 'react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import './ResultsPage.css';

const ResultsPage = ({ 
  difficulty = 3,
  moves = 0, 
  time = 0, 
  minMoves = 7,
  onPlayAgain,
  onMainMenu 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

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

  return (
    <div className="results-page">
      <div className="container">
        <Card className="results-page__card">
          <div className="results-page__header">
            <h2 className="results-page__title">Game Complete!</h2>
            <p className="results-page__rating" style={{ color: rating.color }}>
              {rating.text}
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
              <div className="results-page__stat-value">{formatTime(time)}</div>
            </div>

            <div className="results-page__stat-card results-page__stat-card--wide">
              <div className="results-page__stat-label">Efficiency</div>
              <div className="results-page__stat-value">{efficiency}%</div>
              <div className="results-page__efficiency-bar">
                <div 
                  className="results-page__efficiency-fill"
                  style={{ 
                    width: `${efficiency}%`,
                    backgroundColor: rating.color 
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
              onClick={onPlayAgain}
            >
              Play Again
            </Button>
            <Button 
              variant="primary" 
              size="large"
              onClick={onMainMenu}
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
