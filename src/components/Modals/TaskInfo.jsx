import React from 'react';
import Modal from './Modal';
import Button from '../common/Button';
import styles from './Modals.module.css';

const TaskDescriptionModal = ({ task, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <h3>{task.title}</h3>
      <p className={styles.descriptionText}>
        {task.description || "No description provided"}
      </p>
      <div className={styles.modalButtons}>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default TaskDescriptionModal;