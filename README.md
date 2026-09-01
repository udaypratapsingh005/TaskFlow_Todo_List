# ⚡ TaskFlow — Todo List

> A simple MERN Todo app to manage tasks, track progress, and keep your completed work in history.

TaskFlow is a full-stack Todo List application built with **React, Node.js, Express, and MongoDB**.

The main idea is simple:

**Create → Manage → Complete → Remember**

When a task is completed, it disappears from the active board but stays safely available in **History**.

---

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/c6f0bbb9-914c-443f-848e-132e77a6b806" />

## ✨ Features

- ➕ Create tasks
- ✏️ Edit tasks
- 🗑️ Delete tasks
- ✅ Complete tasks
- 📋 View active tasks
- 🕒 Keep completed tasks in History
- 🔢 Active task counter
- ⚡ REST API based backend
- 📱 Responsive UI
- 🗄️ MongoDB data storage
- 🔄 React + Express API integration

---

## 🛠️ Tech Stack

**Frontend**

`React` `Axios` `React Router` `CSS`

**Backend**

`Node.js` `Express.js` `Mongoose`

**Database**

`MongoDB`

---

## 🔄 How TaskFlow Works

```text
        Create Task
             ↓
       Active Task Board
             ↓
        ✏️ Edit / Manage
             ↓
        ✅ Complete
             ↓
     ┌───────┴────────┐
     ↓                ↓
Live Board          History
   ❌                  ✅
Removed            Preserved
