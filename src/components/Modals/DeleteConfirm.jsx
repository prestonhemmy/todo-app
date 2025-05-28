import React from 'react';
import Modal from './Modal';
import Button from '../common/Button';
import styles from './Modals.module.css';

const DeleteConfirmModal = ({ task, onClose, onConfirm }) => {
  return (
    <Modal onClose={onClose}>
      <p className={styles.deleteMessage}>
        Are you sure you want to delete this task?
      </p>
      <div className={styles.displayTitle}>
        <p className={styles.text}>{task.title}</p>
      </div>
      <div className={styles.modalButtons}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="deleteConfirm" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;