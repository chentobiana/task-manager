import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Menu, Button, Modal } from 'antd';
import TaskFilter from './components/TaskFilter';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const { Header, Content, Footer } = Layout;

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Fetch tasks from the server
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
        setFilteredTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleFilter = (filter) => {
    const { status, date } = filter;
    const filtered = tasks.filter(task => {
      return (!status || task.status === status) && (!date || task.dueDate === date);
    });
    setFilteredTasks(filtered);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setFilteredTasks([...tasks, newTask]);

    // Hide the modal after adding the task
    setIsModalVisible(false);

  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task._id !== id);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };



  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Task Manager</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 16 }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <TaskFilter onFilter={handleFilter} />
          <TaskList tasks={filteredTasks} onTaskUpdated={handleUpdateTask} onDeleteTask={handleDeleteTask} />
          <Button type="primary" onClick={() => setIsModalVisible(true)}>Add Task</Button>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Task Manager ©2024 Created by Chen</Footer>

      <Modal title="Add a New Task" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <TaskForm onTaskAdded={handleAddTask} />
      </Modal>
    </Layout>
  );
}

export default App;