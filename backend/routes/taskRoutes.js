// POST    /api/tasks
// GET     /api/tasks
// PUT     /api/tasks/:id
// DELETE  /api/tasks/:id
// GET     /api/tasks/history

import express from "express";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getCompletedTasks,
} from "../controllers/taskController.js";

const router = express.Router();

// Create
router.post("/", createTask);

// Get active tasks
router.get("/", getTasks);

// Get completed tasks
router.get("/history", getCompletedTasks);

// Update
router.put("/:id", updateTask);

// Delete
router.delete("/:id", deleteTask);

export default router;