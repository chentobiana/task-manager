import React, { useState } from 'react';
import { Table, Popconfirm, Button, Modal } from 'antd';
import axios from 'axios';
import { showNotification } from '../utils';
import EditTaskForm from './EditTaskForm';

const TaskList = ({ tasks, onDeleteTask, onEditTask }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      onDeleteTask(id);
      showNotification('success', 'The task has been removed successfully');
    } catch (error) {
      console.error('Error deleting task:', error.response ? error.response.data : error.message);
      showNotification('error', 'Error deleting task.');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditModalVisible(true);
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false);
    setEditingTask(null);
  };

  const handleEditSubmit = async (editedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${editedTask._id}`, editedTask);
      onEditTask(response.data);
      setEditModalVisible(false);
      showNotification('success', 'The task has been updated successfully');
    } catch (error) {
      console.error('Error updating task:', error.response ? error.response.data : error.message);
      showNotification('error', 'Error updating task.');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) =>
        editingTaskId === record._id ? (
          <Input
            value={editingValues.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) =>
        editingTaskId === record._id ? (
          <TextArea
            value={editingValues.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (text, record) =>
        editingTaskId === record._id ? (
          <DatePicker
            value={editingValues.dueDate}
            onChange={(date) => handleChange('dueDate', date)}
          />
        ) : (
          moment(text).format('YYYY-MM-DD')
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) =>
        editingTaskId === record._id ? (
          <Select
            value={editingValues.status}
            onChange={(value) => handleChange('status', value)}
          >
            <Option value="Pending">Pending</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        ) : (
          text
        ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
          <Popconfirm title="Are you sure to delete this task?" onConfirm={() => handleDelete(record._id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={tasks} columns={columns} rowKey="_id" pagination={{ pageSize: 5 }} />
      <Modal
        title="Edit Task"
        visible={editModalVisible}
        onCancel={handleEditModalClose}
        footer={null}
      >
        {editingTask && <EditTaskForm task={editingTask} onSubmit={handleEditSubmit} />}
      </Modal>
    </>
  );
}


export default TaskList;