# 📋 ToDoList Application

## 🌟 Project Overview
This **ToDoList application** is designed to provide users with a customizable and efficient task management experience. The app allows users to create, modify, and delete tasks and categories, all while offering a real-time search functionality and an interactive statistics dashboard.

The application is built using **Angular 17** with a modular and reactive architecture, adhering to frontend development best practices.

---

## ✨ Features

### ✅ Task Management
- **Create, modify, and delete tasks** with detailed information:
  - Title (with max length validation)
  - Optional description
  - European date & time for deadlines (no past dates allowed)
  - Priority levels (High, Medium, Low)
  - Completion status (Not Started, In Progress, Completed)

- **Category Management**
  - Create, modify, and delete categories (e.g., Work, Personal, Shopping)
  - Prevent duplicate categories

- **Real-Time Search**
  - Find tasks by title or description instantly after validation.

- **Task-Category Relation**
  - Each task belongs to one and only one category.

---

### 📊 Statistics Dashboard
- Interactive visualizations showing:
  - Percentage of completed tasks.
  - Percentage of pending tasks.
  - Number of overdue tasks.
- Powered by **NgxCharts**, **Chart.js**, or **Angular Material Dashboard**.

---

### 🚀 Additional Features
- **Responsive Design**: Adapts to both desktop and mobile devices.
- **Real-Time Notifications**:
  - Alerts for tasks nearing deadlines.
  - Notifications can be marked as "read."
  - View notification history.
- **Data Persistence**:
  - Data is stored in `localStorage` using JSON, ensuring it remains intact after browser closure.

---

## 🛠️ Technologies Used

| **Technology**        | **Purpose**                                   |
|------------------------|-----------------------------------------------|
| **Angular 17**         | Framework for building a modular SPA.        |
| **SCSS**               | Styling with enhanced capabilities.          |
| **Bootstrap/Tailwind** | Responsive and visually appealing UI.        |
| **RxJS Observables**   | Real-time data handling and updates.          |
| **Angular Services**   | Communication between components.            |
| **Pipes**              | Format dates and apply filters.              |
| **Routing**            | Navigation between views.                    |
| **Databinding**        | Sync data seamlessly between UI and logic.   |

---

## 📋 Installation Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/anwar-bouchehboun/_TodoList-App_.git
   cd todolist-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Application**:
   ```bash
   ng serve
   ```
