import React from 'react';
import { Table, Popconfirm, notification } from 'antd';
import axios from 'axios';

const showNotification = (type, message) => {
  notification[type]({
    message: message,
    placement: 'top', // Position the notification at the top
    duration: 3, // Duration in seconds
    style: {
      backgroundColor: '#f6ffed', // Green background for success
      color: '#389e0d', // Green text
    },
  });
};


const TaskList = ({ tasks, onDeleteTask }) => {
  console.log("Tasks array:", tasks); // Log the tasks array to the console
 
 
  const handleDelete = async (id) => {
    try {
      console.log(`Attempting to delete task with ID: ${id}`); // Log the ID being sent for deletion
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      onDeleteTask(id); // Remove task from the state after successful deletion
      showNotification('success', 'The task has been removed successfully')
    } catch (error) {
      console.error('Error deleting task:', error.response ? error.response.data : error.message);
      alert('Error deleting task.');
    }
  };
  

  const columns = [
   {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm title="Are you sure to delete this task?" onConfirm={() => handleDelete(record._id)}>
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  return <Table dataSource={tasks} columns={columns} rowKey="_id" pagination={{ pageSize: 5 }} />;
}

export default TaskList;