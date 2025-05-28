import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../common/Button';
import styles from './Modals.module.css';

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

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
      <h3>Update Task</h3>
      
      <label>Title</label>
      <input
        type="text"
        placeholder={task.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        className={styles.input}
      />
      
      <label>Description</label>
      <textarea
        placeholder={task.description || "Write a brief description for this task"}
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
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default EditTaskModal;