import React from 'react';
import Disk from '../Disk/Disk';
import './Rod.css';

const Rod = ({ rodId, disks = [], onRodClick, selectedDisk, label }) => {
  return (
    <div className="rod" onClick={() => onRodClick(rodId)}>
      <div className="rod__label">{label}</div>
      <div className="rod__container">
        <div className="rod__pole"></div>
        <div className="rod__base"></div>
        <div className="rod__disks">
          {disks.length === 0 ? (
            <div className="rod__empty-placeholder">Empty</div>
          ) : (
            disks.map((diskSize, index) => (
              <Disk
                key={`${rodId}-${diskSize}-${index}`}
                size={diskSize}
                isSelected={index === disks.length - 1 && selectedDisk === diskSize}
                onClick={(e) => {
                  e.stopPropagation();
                  onRodClick(rodId);
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Rod;
