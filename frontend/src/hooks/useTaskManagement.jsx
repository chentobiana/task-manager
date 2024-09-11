import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/taskApi';
import { showNotification, handleApiError } from '../utils';

const useTaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const loadTasks = useCallback(async () => {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      setFilteredTasks(fetchedTasks);
    } catch (error) {
      handleApiError("fetch tasks", error);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleFilter = useCallback((filter) => {
    const { status, date } = filter;
    const filtered = tasks.filter(task => 
      (!status || task.status === status) && (!date || task.dueDate === date)
    );
    setFilteredTasks(filtered);
  }, [tasks]);

  const handleAddTask = useCallback(async (newTaskData) => {
    try {
      const newTask = await createTask(newTaskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
      setFilteredTasks(prevFilteredTasks => [...prevFilteredTasks, newTask]);
      showNotification('success', `The task "${newTask.name}" has been added successfully`);
      return newTask;
    } catch (error) {
      handleApiError("add a task", error);
    }
  }, []);

  const handleUpdateTask = useCallback(async (updatedTaskData) => {
    try {
      const updatedTask = await updateTask(updatedTaskData._id, updatedTaskData);
      const updateTasks = prevTasks => 
        prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task);
      setTasks(updateTasks);
      setFilteredTasks(updateTasks);
      showNotification('success', 'The task has been updated successfully');
      return updatedTask;
    } catch (error) {
      handleApiError("edit a task", error);
    }
  }, []);

  const handleDeleteTask = useCallback(async (id) => {
    try {
      await deleteTask(id);
      const filterTasks = prevTasks => prevTasks.filter(task => task._id !== id);
      setTasks(filterTasks);
      setFilteredTasks(filterTasks);
      showNotification('success', 'The task has been removed successfully');
    } catch (error) {
      handleApiError("delete a task", error);
    }
  }, []);

  return { 
    tasks,
    filteredTasks, 
    handleFilter, 
    handleAddTask, 
    handleUpdateTask, 
    handleDeleteTask,
    loadTasks 
  };
};

export default useTaskManagement;

