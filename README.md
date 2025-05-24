# MY-TODO-LIST
A modern, responsive, and theme-switchable To-Do List App built with **React** and **CSS**. This app allows users to manage tasks efficiently with features like task prioritization, filtering, sorting, editing, and more.

## Live Demo : https://todoolistwebb.netlify.app/

## 🚀 Features

### ✅ 1. Add a New Task
- **UI:** Input field and "Add" button inside a form component.
- **Functionality:** Adds a new task to the app state. Prevents submission of empty tasks.

### ☑️ 2. Mark Task as Complete
- **UI:** Checkbox next to each task.
- **Functionality:** Toggles task completion status. Completed tasks are visually styled.

### 🗑 3. Delete a Task
- **UI:** Delete icon/button next to each task.
- **Functionality:** Removes task from the app state.

### 🖊 4. Edit an Existing Task
- **UI:** Edit button/icon transforms task into an editable input field.
- **Functionality:** Updates the task content in state. Options to save or cancel changes.

### 🎯 5. Task Priority + Sorting
- **UI:** Dropdown menu in the "Add Task" form to select priority (High, Medium, Low).
- **Functionality:** Tasks are stored with priority and sorted as:
- ### 🌗 Dark/Light Mode – Switch between dark and light themes for better readability and personal preference.

--------------------
📁 Project Structure
<pre>  todolist/ 
│
├── public/
│   └── index.html
│
└── src/
    ├── components/
    │   ├── TaskForm.js
    │   ├── TaskItem.js
    │   └── TaskList.js
    │
    ├── App.js
    ├── App.css
    ├── Style.css
    ├── index.js
    └── App.test.js
 </pre>
--------------------
## 🚀 How to Run Locally  

### 1⃣ Clone the Repository
```
git clone https://github.com/chinmayTripathy15/MY-TODO-LIST.git
cd MY-TODO-LIST
```
### 2⃣ Install Dependencies 
```
npm install
```
### 3⃣ Run the Application 
```
npm start
```


