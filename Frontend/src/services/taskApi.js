import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

// Get active tasks
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create task
export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

// Update task
export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData);
  return response.data;
};

// Delete task
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Get completed tasks
export const getTaskHistory = async () => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data;
};