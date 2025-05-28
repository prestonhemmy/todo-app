import React from 'react';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const buttonClass = `${styles[variant]} ${className}`.trim();
  
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;