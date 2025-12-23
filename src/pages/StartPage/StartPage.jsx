import React from 'react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import { useStartPage } from '../../hooks';
import './StartPage.css';

const StartPage = ({ onStartGame }) => {
  const { difficulties } = useStartPage();

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

          <div className="start-page__difficulty">
            <h3 className="start-page__difficulty-title">Choose Difficulty Level:</h3>
            <div className="start-page__difficulty-buttons">
              {difficulties.map(({ level, label, description, minMoves }) => (
                <div key={level} className="start-page__difficulty-option">
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={() => onStartGame(level)}
                  >
                    {label}
                  </Button>
                </div>
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
