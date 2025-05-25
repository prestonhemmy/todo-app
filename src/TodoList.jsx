import React, { useState, useEffect, useRef } from 'react';

/* eslint-disable */

function TodoList() {
    /* Demo tasks */
    const [tasks, setTasks] = useState([
        {id: 1, title: "Make the Bed", completed: true, description: ""},
        {id: 2, title: "Gardening", completed: true, description: "Water all plants. Pick strawberries if they're ready."},
        {id: 3, title: "Zoom meeting", completed: true, description: "Company zoom meeting @ 10:00 AM."},
        {id: 4, title: "Go to the Gym", completed: false, description: "Chest day with Michael at 4:30 PM."},
        {id: 5, title: "Walk the Dog", completed: false, description: "Walk Snootles around the block."},
        {id: 6, title: "Dinner Date", completed: false, description: "Pacific Dining Car. 7:00 PM."},
        {id: 7, title: "Madison's 42ⁿᵈ Birthday Celebration", completed: true, description: "Date: 10/12/2025\nLocation: 1040 NW Florida Ave\nNote to Self: Bring chardonnay and sauvignon blanc."},
        {id: 8, title: "Book Flight", completed: false, description: "Check for flights to Bali this upcoming weekend."},
        {id: 9, title: "Finish Kitchen Renovations", completed: false, description: ""},
        {id: 10, title: "Learn the Guitar", completed: false, description: ""},

    ])

    // const [tasks, setTasks] = useState([]);  // NOTE Uncomment for final release

    const [newTask, setNewTask] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    // Modal states
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [isShowingTaskDescription, setIsShowingTaskDescription] = useState(false);
    const [isEditingTask, setIsEditingTask] = useState(false);
    const [isDeletingTask, setIsDeletingTask] = useState(false);
    const [isClearingAll, setIsClearingAll] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
    const [editTask, setEditTask] = useState({title: "", description: ""})

    // Scroll state
    const [showTopFade, setShowTopFade] = useState(false);
    const sectionRef = useRef(null);

    // Task states
    const inProgressTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    /**
     * Handles add task button click event. Opens a modal to add a new task.
     */
    function addTask() {
        closeModals();
        setIsAddingTask(true);
    }

    /**
     * Handles saving a new task within 'Add Task' or 'Edit' modals.
     */
    function handleSaveNewTask() {
        if (newTask.trim()) {
            const newTaskObj = {
                id: Date.now(),
                title: newTask.trim(),
                description: newTaskDescription.trim(),
                completed: false
            };

            setTasks([...tasks, newTaskObj]);
            setNewTask("");
            setNewTaskDescription("");
            closeModals();
        }
    }

    /**
     * Handles show task description button click event. Opens a modal to show the task description.
     */
    function handleShowTaskDescription(id) {
        closeModals();
        const index = tasks.findIndex(t => t.id === id);
        setCurrentTaskIndex(index);
        setIsShowingTaskDescription(true);
    }

    /**
     * Handles edit task button click event. 
     */
    function handleEditTask(id) {
        closeModals();
        const index = tasks.findIndex(t => t.id === id);
        const task = tasks[index];
        setCurrentTaskIndex(index);
        setEditTask({title: task.title, description: task.description});
        setIsEditingTask(true);
    }

    /**
     * Handles save edit for a task. Updates the task title and description in the list.
     */
    function handleSaveEdit() {
        if (currentTaskIndex !== null && editTask.title.trim()) {
            const updatedTasks = [...tasks];
            updatedTasks[currentTaskIndex] = {
                ...updatedTasks[currentTaskIndex],
                title: editTask.title.trim(),
                description: editTask.description.trim()
            };

            setTasks(updatedTasks);
            closeModals();
        }
    }

    /**
     * Handles the delete task button click event. Removes the task from the list.
     */
    function handleDeleteTask(id) {
        closeModals();
        const index = tasks.findIndex(t => t.id === id);
        setCurrentTaskIndex(index);
        setIsDeletingTask(true);
    }

    function confirmDeleteTask() {
        if (currentTaskIndex !== null) {
            const taskID = tasks[currentTaskIndex].id;
            setTasks(tasks.filter(t => t.id !== taskID));
            closeModals();
        }
    }

    /**
     * Handles the clear all button click event. Removes all tasks from the 'Completed' list.
     */
    function handleClearAll() {
        closeModals();
        setIsClearingAll(true);
    }

    function confirmClearAll() {
        setTasks(tasks.filter(t => !t.completed));
        closeModals();
    }

    /**
     * Handles the checkbox click event. Updates the tasks, setting the associated 
     * task's completion status to its negation. Adds a 600 ms stall to allow checking
     * animation to render.
     */
    function handleCheckboxClick(id) {
        const taskToToggle = tasks.find(task => task.id === id);

        // Check if checking a task
        if (taskToToggle && !taskToToggle.completed) {
            setTimeout(() => {
                setTasks(tasks.map(task =>
                    task.id === id ? {...task, completed: !task.completed} : task
                ));
            }, 600);    // NOTE Delay to visualize 'checking box' animation

        // O.W. unchecking a task
        } else {
            setTasks(tasks.map(task =>
                task.id === id ? {...task, completed: !task.completed} : task
            ));
        }
    }

    /**
     * Closes all modals and resets the state for current task index.
     */
    function closeModals() {
        setIsAddingTask(false);
        setIsShowingTaskDescription(false);
        setIsEditingTask(false);
        setIsDeletingTask(false);
        setIsClearingAll(false);
        setCurrentTaskIndex(null);
    }

    return (
        <div className="todo-list">
            <div className="header">
                <div 
                    style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center" 
                    }}>
                    <span>TODO List</span>
                    <button
                        className="primary-button"
                        onClick={addTask}
                    >
                        Add Task
                    </button>
                </div>
            </div>

            <div className="section-wrapper">
                <div className={`fade-overlay-top ${showTopFade ? 'visible' : ''}`}></div>
                <div className="section" ref={sectionRef}>
                    
                    {/* Add Task Modal */}
                    {isAddingTask && (
                        <div className="modal-overlay" onClick={closeModals}>
                            <div className="modal" onClick={e => e.stopPropagation()}>
                                <h3>Create new task</h3>
                                
                                <label>Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter a title"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveNewTask()}
                                    autoFocus
                                />
                                
                                <label>Description</label>
                                <textarea
                                    placeholder="Write a brief description"
                                    value={newTaskDescription}
                                    onChange={(e) => setNewTaskDescription(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveNewTask()}
                                    rows="3"
                                />
                                
                                <div className="modal-buttons">
                                    <button className="cancel-button" onClick={closeModals}>
                                        Cancel
                                    </button>
                                    <button className="primary-button" onClick={handleSaveNewTask}>
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Show Task Description Modal */}
                    {isShowingTaskDescription && currentTaskIndex !== null && (
                        <div className="modal-overlay" onClick={closeModals}>
                            <div className="modal" onClick={e => e.stopPropagation()}>
                                <h3>{tasks[currentTaskIndex].title}</h3>
                                <p className="description-text">
                                    {tasks[currentTaskIndex].description || "No description provided"}
                                </p>
                                <div className="modal-buttons">
                                    <button className="primary-button" onClick={closeModals}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Task Modal */}
                    {isEditingTask && currentTaskIndex !== null && (
                        <div className="modal-overlay" onClick={closeModals}>
                            <div className="modal" onClick={e => e.stopPropagation()}>
                                <h3>Update Task</h3>
                                
                                <label>Title</label>
                                <input
                                    type="text"
                                    placeholder={tasks[currentTaskIndex].title}
                                    value={editTask.title}
                                    onChange={(e) => setEditTask({...editTask, title: e.target.value})}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                                    autoFocus
                                />
                                
                                <label>Description</label>
                                <textarea
                                    placeholder={tasks[currentTaskIndex].description || "Write a brief description for this task"}
                                    value={editTask.description}
                                    onChange={(e) => setEditTask({...editTask, description: e.target.value})}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveNewTask()}
                                    rows="3"
                                />
                                
                                <div className="modal-buttons">
                                    <button className="secondary-button" onClick={closeModals}>
                                        Cancel
                                    </button>
                                    <button className="primary-button" onClick={handleSaveEdit}>
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Delete Confirmation Modal */}
                    {isDeletingTask && currentTaskIndex !== null && (
                        <div className="modal-overlay" onClick={closeModals}>
                            <div className="modal" onClick={e => e.stopPropagation()}>
                                <p className="delete-message">Are you sure you want to delete this task?</p>
                                <div 
                                    className="display-title">
                                    <p className="text">{tasks[currentTaskIndex].title}</p>
                                </div>
                                <div className="modal-buttons">
                                    <button className="cancel-button" onClick={closeModals}>
                                        Cancel
                                    </button>
                                    <button className="delete-confirm-button" onClick={confirmDeleteTask}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Clear All Confirmation Modal */}
                    {isClearingAll && (
                        <div className="modal-overlay" onClick={closeModals}>
                            <div className="modal" onClick={e => e.stopPropagation()}>
                                <p className="clear-all-message">Are you sure you want to clear all completed tasks?</p>
                                <div className="modal-buttons">
                                    <button className="cancel-button" onClick={closeModals}>
                                        Cancel
                                    </button>
                                    <button className="clear-all-confirm-button" onClick={confirmClearAll}>
                                        Clear All
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* In Progress Section */}
                    {inProgressTasks.length > 0 && (
                        <>
                            <h3>In Progress</h3>
                            <ol>
                                {inProgressTasks.map(task => (
                                    <li>
                                        <input 
                                            type="checkbox"
                                            className="check-box"
                                            checked={task.completed}
                                            onChange={() => handleCheckboxClick(task.id)}
                                        />
                                        <span className="text">{task.title}</span> 

                                        <div className="button-container">
                                            <button
                                                className="secondary-button"
                                                onClick={() => handleShowTaskDescription(task.id)}
                                            >
                                                Info
                                            </button>
                                            <button 
                                                className="edit-button"
                                                onClick={() => handleEditTask(task.id)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="delete-button"
                                                onClick={() => handleDeleteTask(task.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </>
                    )}

                    {/* Completed Task Section */}
                    {completedTasks.length > 0 && (
                        <>
                            <h3
                                style={{ 
                                    paddingRight: "8px",
                                    display: "flex", 
                                    justifyContent: "space-between", 
                                    alignItems: "center" 
                                }}
                            >
                                <span>Completed</span>
                                <button
                                    className="clear-all-button"
                                    onClick={handleClearAll}
                                >
                                    Clear All
                                </button>
                            </h3>
                            <ol>
                                {completedTasks.map(task => (
                                    <li className="completed">
                                        <input 
                                            type="checkbox"
                                            className="check-box"
                                            checked={task.completed}
                                            onChange={() => handleCheckboxClick(task.id)}
                                        />
                                        <span className="text">{task.title}</span> 

                                        <div className="button-container">
                                            <button
                                                className="secondary-button"
                                                onClick={() => handleShowTaskDescription(task.id)}
                                            >
                                                Info
                                            </button>
                                            <button 
                                                className="edit-button"
                                                onClick={() => handleEditTask(task.id)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="delete-button"
                                                onClick={() => handleDeleteTask(task.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </>
                    )}
                </div>
                <div className="fade-overlay-bottom"></div>
            </div>

            {/* Footer Signature */}
            <footer>
                Created by <a
                    href="https://github.com/prestonhemmy/"
                    style={{
                        color: "#4da4fb",
                        textDecoration: "none"
                    }}
                >prestonhemmy</a> .
            </footer>
        </div>
    );
}

export default TodoList;
