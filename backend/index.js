const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

// Middleware to log each request
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    if (Object.keys(req.body).length) {
        console.log('Request body:', req.body);
    }
    if (Object.keys(req.query).length) {
        console.log('Query parameters:', req.query);
    }
    next();
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
    const { name, description, dueDate, status } = req.body;

    if (!name || !description || !dueDate || !status) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const newTask = { id: tasks.length + 1, name, description, dueDate, status };
    tasks.push(newTask);
    res.status(200).json(newTask);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, dueDate, status } = req.body;

    const task = tasks.find(task => task.id == id);
    if (!task) {
        return res.status(404).json({ message: "Task not found." });
    }

    task.name = name || task.name;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

    res.status(200).json(task);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id != id);
    res.status(200).json({ message: "Task deleted successfully." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
