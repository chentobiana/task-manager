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
        required: true,
        enum: ['Pending', 'In Progress', 'Completed'] // Ensuring only valid statuses are used
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
        ret.dueDate = ret.dueDate.toISOString().split('T')[0]; // Format to "YYYY-MM-DD"
        return ret;
    }
});

taskSchema.set('toObject', {
    transform: (doc, ret) => {
        ret._id = ret._id.toString(); // Convert ObjectId to string
        return ret;
    }
});


const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;


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
        const tasks = await Task.find({});
        res.json(tasks); // This will include the _id as a string due to the toJSON transformation
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error });
    }
});


// Add a new task
app.post('/api/tasks', async (req, res) => {
    const { name, description, dueDate, status } = req.body;
    try{

        if (!name || !description || !dueDate || !status) {
                return res.status(400).json({ message: "All fields are required." });
            }

        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        console.log('Saved task :', savedTask);
        res.status(200).json({ _id: savedTask._id, name: savedTask.name, description: savedTask.description, dueDate: dueDate, status: savedTask.status }); // Return the ID to the frontend
    } catch (err) {
        res.status(400).json({ message: err.message });
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
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('in delete id is: ', id);

        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            console.log('Task not found');
            return res.status(404).json({ message: 'Task not found' });
        }
        else{
            console.log('Task found');
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
