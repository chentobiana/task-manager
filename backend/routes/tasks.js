// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a new task
router.post('/', async (req, res) => {
  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.status,
  });

  try {
    const newTask = await task.save();
    res.status(200).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
