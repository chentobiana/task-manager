import { useState, useEffect } from 'react';
import { fetchTasks } from '../api/taskApi';

const useTaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      setFilteredTasks(fetchedTasks);
    };
    loadTasks();
  }, []);

  const handleFilter = (filter) => {
    const { status, date } = filter;
    const filtered = tasks.filter(task => 
      (!status || task.status === status) && (!date || task.dueDate === date)
    );
    setFilteredTasks(filtered);
  };

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
    setFilteredTasks(prevFilteredTasks => [...prevFilteredTasks, newTask]);
  };

  const handleUpdateTask = (updatedTask) => {
    const updateTasks = prevTasks => 
      prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task);
    setTasks(updateTasks);
    setFilteredTasks(updateTasks);
  };

  const handleDeleteTask = (id) => {
    const filterTasks = prevTasks => prevTasks.filter(task => task._id !== id);
    setTasks(filterTasks);
    setFilteredTasks(filterTasks);
  };

  return { tasks, filteredTasks, handleFilter, handleAddTask, handleUpdateTask, handleDeleteTask };
};

export default useTaskManagement;
