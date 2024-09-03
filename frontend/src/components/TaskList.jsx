import React from 'react';
import { Table, Popconfirm } from 'antd';
import axios from 'axios';

function TaskList({ tasks, onDeleteTask }) {
  const handleDelete = async (id) => {
    try {
      console.log(`Attempting to delete task with ID: ${id}`); // Log the ID being sent for deletion
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      onDeleteTask(id); // Remove task from the state after successful deletion
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
        <Popconfirm title="Are you sure to delete this task?" onConfirm={() => handleDelete(record.id)}>
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  return <Table dataSource={tasks} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />;
}

export default TaskList;