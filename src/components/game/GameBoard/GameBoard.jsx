import React from 'react';
import Rod from '../Rod/Rod';
import './GameBoard.css';

/**
 * Поле з трьома стрижнями та дисками (композиція Rod + Disk).
 * @param {object} props
 * @param {Array<Array<number>>} [props.rods] Три масиви розмірів дисків.
 * @param {Function} [props.onRodClick] Викликається з індексом стрижня.
 * @param {number|null} [props.selectedRod]
 */
const GameBoard = ({ 
  rods = [[], [], []],
  onRodClick,
  selectedRod
}) => {
  return (
    <div className="game-board">
      <div className="game-board__rods">
        <Rod
          rodId={0}
          label="Rod A"
          disks={rods[0]}
          onRodClick={onRodClick}
          isSelected={selectedRod === 0}
        />
        <Rod
          rodId={1}
          label="Rod B"
          disks={rods[1]}
          onRodClick={onRodClick}
          isSelected={selectedRod === 1}
        />
        <Rod
          rodId={2}
          label="Rod C"
          disks={rods[2]}
          onRodClick={onRodClick}
          isSelected={selectedRod === 2}
        />
      </div>
    </div>
  );
};

export default GameBoard;
