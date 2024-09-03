require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

let tasks = [];

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));


const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

// Convert _id to string when converting to JSON
taskSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret._id = ret._id.toString();
        return ret;
    }
});


const Task = mongoose.model('tasks', taskSchema);


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

// Get all task IDs
app.get('/api/tasks', async (req, res) => {
    try {
        console.log('In get function');

        // const tasks = await Task.find({}, '_id'); // Fetch only the _id field
        // const taskIds = tasks.map(task => task._id); // Convert to a list of string IDs
        // res.json(taskIds);
        res.json([]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
    const { name, description, dueDate, status } = req.body;
    try{

        if (!name || !description || !dueDate || !status) {
                return res.status(400).json({ message: "All fields are required." });
            }

        const newTask = new Task({name: name, description:description, dueDate:dueDate, status:status});
        const savedTask = await newTask.save();
        console.log('Saved task is:', savedTask);

        res.status(200).json(savedTask);
    }catch (err){
        res.status(500).json({message:err.message})
    }
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
