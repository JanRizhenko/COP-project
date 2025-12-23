import React from 'react';
import './Disk.css';

const Disk = ({ size, isSelected = false }) => {
  return (
    <div
      className={`disk disk--size-${size} ${isSelected ? 'disk--selected' : ''}`}
      data-size={size}
    >
      <span className="disk__label">{size}</span>
    </div>
  );
};

export default Disk;
