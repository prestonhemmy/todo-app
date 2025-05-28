import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../common/Button';
import styles from './Modals.module.css';

const AddTaskModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        title: title.trim(),
        description: description.trim()
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Modal onClose={onClose}>
      <h3>Create new task</h3>
      
      <label>Title</label>
      <input
        type="text"
        placeholder="Enter a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        className={styles.input}
      />
      
      <label>Description</label>
      <textarea
        placeholder="Write a brief description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleKeyDown}
        rows="3"
        className={styles.textarea}
      />
      
      <div className={styles.modalButtons}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Add
        </Button>
      </div>
    </Modal>
  );
};

export default AddTaskModal;