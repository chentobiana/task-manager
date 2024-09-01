// src/components/TaskForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ onTaskAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = { name, description, dueDate, status };

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      if (response.status === 200) {
        onTaskAdded(response.data);
        setName('');
        setDescription('');
        setDueDate('');
        setStatus('Pending');
      }
    } catch (error) {
      alert('Error adding task. Please check your input.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value)} required>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
