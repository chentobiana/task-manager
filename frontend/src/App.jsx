// src/App.jsx
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
      setFilteredTasks(response.data);
    };

    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
    setFilteredTasks([...tasks, newTask]);
  };

  const handleFilter = ({ status, date }) => {
    let filtered = tasks;
    if (status) {
      filtered = filtered.filter(task => task.status === status);
    }
    if (date) {
      filtered = filtered.filter(task => task.dueDate === date);
    }
    setFilteredTasks(filtered);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskFilter onFilter={handleFilter} />
      <TaskList tasks={filteredTasks} />
    </div>
  );
}

export default App;
