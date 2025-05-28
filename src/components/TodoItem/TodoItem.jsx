import React from 'react';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';
import styles from './TodoItem.module.css';

const TodoItem = ({
    task,
    onToggle,
    onShowDescription,
    onEdit,
    onDelete
}) => {
    const handleCheckboxChange = () => {
    onToggle(task.id);
  };

  return (
    <li className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <Checkbox 
        checked={task.completed}
        onChange={handleCheckboxChange}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />
      <span className={styles.text}>{task.title}</span>
      
      <div className={styles.buttonContainer}>
        <Button
          variant="secondary"
          onClick={() => onShowDescription(task.id)}
          aria-label={`Show description for "${task.title}"`}
        >
          Info
        </Button>
        <Button 
          variant="edit"
          onClick={() => onEdit(task.id)}
          aria-label={`Edit "${task.title}"`}
        >
          Edit
        </Button>
        <Button 
          variant="delete"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete "${task.title}"`}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
