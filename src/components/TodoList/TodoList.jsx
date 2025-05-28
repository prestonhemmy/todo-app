import React, { useState, useRef, useEffect } from 'react';
import TodoItem from '../TodoItem';
import Button from '../common/Button';
import {
  AddTaskModal,
  EditTaskModal,
  TaskDescriptionModal,
  DeleteConfirmModal,
  ClearAllModal
} from '../Modals';
import { DEMO_TASKS } from '../../utils/constants';
import styles from './TodoList.module.css';

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : DEMO_TASKS;
  });

  // Modal states
  const [activeModal, setActiveModal] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Scroll state
  const [showTopFade, setShowTopFade] = useState(false);
  const sectionRef = useRef(null);

  // Task states
  const inProgressTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const selectedTask = selectedTaskId 
    ? tasks.find(t => t.id === selectedTaskId) 
    : null;

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks]);

  // Handle scroll for fade effect
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      setShowTopFade(section.scrollTop > 10);
    };

    section.addEventListener('scroll', handleScroll);
    return () => section.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (modalType, taskId = null) => {
    setActiveModal(modalType);
    setSelectedTaskId(taskId);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedTaskId(null);
  };

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      completed: false
    };
    setTasks([...tasks, newTask]);
    closeModal();
  };

  const handleEditTask = (taskData) => {
    setTasks(tasks.map(task =>
      task.id === selectedTaskId
        ? { ...task, ...taskData }
        : task
    ));
    closeModal();
  };

  const handleDeleteTask = () => {
    setTasks(tasks.filter(t => t.id !== selectedTaskId));
    closeModal();
  };

  const handleClearAll = () => {
    setTasks(tasks.filter(t => !t.completed));
    closeModal();
  };

  const handleToggleTask = (id) => {
    const taskToToggle = tasks.find(task => task.id === id);

    if (taskToToggle && !taskToToggle.completed) {
      // Delay to visualize checking animation
      setTimeout(() => {
        setTasks(tasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ));
      }, 600);
    } else {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    }
  };

  return (
    <div className={styles.todoList}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <span>TODO List</span>
          <Button
            variant="primary"
            onClick={() => openModal('ADD_TASK')}
            aria-label="Add new task"
          >
            Add Task
          </Button>
        </div>
      </div>

      <div className={styles.sectionWrapper}>
        <div className={`${styles.fadeOverlayTop} ${showTopFade ? styles.visible : ''}`}></div>
        <div className={styles.section} ref={sectionRef}>
          
          {/* In Progress Section */}
          {inProgressTasks.length > 0 && (
            <>
              <h3>In Progress</h3>
              <ol className={styles.taskList}>
                {inProgressTasks.map(task => (
                  <TodoItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onShowDescription={(id) => openModal('SHOW_DESCRIPTION', id)}
                    onEdit={(id) => openModal('EDIT_TASK', id)}
                    onDelete={(id) => openModal('DELETE_TASK', id)}
                  />
                ))}
              </ol>
            </>
          )}

          {/* Completed Task Section */}
          {completedTasks.length > 0 && (
            <>
              <h3 className={styles.completedHeader}>
                <span>Completed</span>
                <Button
                  variant="clearAll"
                  onClick={() => openModal('CLEAR_ALL')}
                  aria-label="Clear all completed tasks"
                >
                  Clear All
                </Button>
              </h3>
              <ol className={styles.taskList}>
                {completedTasks.map(task => (
                  <TodoItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onShowDescription={(id) => openModal('SHOW_DESCRIPTION', id)}
                    onEdit={(id) => openModal('EDIT_TASK', id)}
                    onDelete={(id) => openModal('DELETE_TASK', id)}
                  />
                ))}
              </ol>
            </>
          )}
        </div>
        <div className={styles.fadeOverlayBottom}></div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        Created by <a
          href="https://github.com/prestonhemmy/"
          className={styles.footerLink}
        >prestonhemmy</a> .
      </footer>

      {/* Modals */}
      {activeModal === 'ADD_TASK' && (
        <AddTaskModal
          onClose={closeModal}
          onSave={handleAddTask}
        />
      )}

      {activeModal === 'EDIT_TASK' && selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={closeModal}
          onSave={handleEditTask}
        />
      )}

      {activeModal === 'SHOW_DESCRIPTION' && selectedTask && (
        <TaskDescriptionModal
          task={selectedTask}
          onClose={closeModal}
        />
      )}

      {activeModal === 'DELETE_TASK' && selectedTask && (
        <DeleteConfirmModal
          task={selectedTask}
          onClose={closeModal}
          onConfirm={handleDeleteTask}
        />
      )}

      {activeModal === 'CLEAR_ALL' && (
        <ClearAllModal
          onClose={closeModal}
          onConfirm={handleClearAll}
        />
      )}
    </div>
  );
}

export default TodoList;