<div 
style="display: flex;
align-items: flex-start; 
gap: 20px; 
margin-bottom: 20px;">
  <div style="flex: 1;">
    <h1>React Todo App</h1>
    <p>A clean and modern todo list application built with React and CSS.</p>
    <h2>Features</h2>
    <ul>
      <li>✅ Add, edit, and delete tasks</li>
      <li>📝 Show task descriptions</li>
      <li>🎨 Light/Dark mode support (defaulting to system)</li>
      <li>💾 Local storage persistence  <!-- Is it? --></li>
      <li>🎯 Smooth animations</li>
      <li>📱 Responsive design</li>
    </ul>
  </div>
  <div style="flex-shrink: 0;">
    <img 
        src="public/readme_images/logo.jpeg" 
        alt="todo app logo" 
        style="max-width: 200px; height: auto;">
  </div>
</div>

## Technologies
- React 19.1
- CSS Modules
- CSS Variables for theming

## Installation
```
bash
git clone https://github.com/yourusername/react-todo-app.git
cd react-todo-app
npm install
npm start
```

## Screenshots
![example page](public/readme_images/init.jpg)
The application sports a modern look and feel with responsive sections for 'In Progress' and 'Completed' which are visible if tasks are present, minimal styled pop-up windows and smooth animations.

![checkbox in checking state](public/readme_images/checking_box.jpg)
![checkbox in checked state](public/readme_images/checked_box.jpg)
Easy to use checkboxes automatically transfer your task from 'In Progress' to 'Completed', applying a strikethrough and grayed-out effect.

![add task pop-up](public/readme_images/add_task.jpg)
![task description pop-up](public/readme_images/task_description.jpg)
![edit task pop-up](public/readme_images/edit_task.jpg)
![delete task pop-up](public/readme_images/delete_task.jpg)
Minimal styled pop-up windows for creating a new task, seeing a given task's description, editing a task and deleting a task offer a focused view for seeing information and making changes corresponding to a single task.

