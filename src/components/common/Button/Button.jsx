import React from 'react';
import './Button.css';

/**
 * Base UI button with configurable size and variant.
 * @param {object} props
 * @param {*} props.children
 * @param {Function} [props.onClick]
 * @param {string} [props.variant] primary | secondary
 * @param {string} [props.size] small | medium | large
 * @param {boolean} [props.disabled]
 * @param {string} [props.className]
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  className = ''
}) => {
  return (
    <button
      className={`button button--${variant} button--${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
