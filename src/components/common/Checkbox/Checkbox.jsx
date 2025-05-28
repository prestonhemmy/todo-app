import React from 'react';
import styles from './Checkbox.module.css';

const Checkbox = ({ checked, onChange, className = '', ...props }) => {
  return (
    <input 
      type="checkbox"
      className={`${styles.checkbox} ${className}`.trim()}
      checked={checked}
      onChange={onChange}
      {...props}
    />
  );
};

export default Checkbox;