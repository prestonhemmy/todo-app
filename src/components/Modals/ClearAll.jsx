import React from 'react';
import Modal from './Modal';
import Button from '../common/Button';
import styles from './Modals.module.css';

const ClearAllModal = ({ onClose, onConfirm }) => {
  return (
    <Modal onClose={onClose}>
      <p className={styles.clearAllMessage}>
        Are you sure you want to clear all completed tasks?
      </p>
      <div className={styles.modalButtons}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="deleteConfirm" onClick={onConfirm}>
          Clear All
        </Button>
      </div>
    </Modal>
  );
};

export default ClearAllModal;