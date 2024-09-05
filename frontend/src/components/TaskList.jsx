import React, { useState } from 'react';
import { Table, Button, Input, DatePicker, Select, Popconfirm } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { showNotification } from '../utils';



const TaskList = ({ tasks, onDeleteTask, onTaskUpdate}) => {
  const [editingTaskId, setEditingTaskId] = useState(null); // Track the task being edited
  const [editingValues, setEditingValues] = useState({}); // Track the current editing values
  const { TextArea } = Input;
  const { Option } = Select;

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

  const handleEditClick = (record) => {
    setEditingTaskId(record._id);
    setEditingValues({ ...record, dueDate: moment(record.dueDate) });
  };

  const handleSaveClick = async (record) => {
    try {
      const updatedTask = {
        ...editingValues,
        dueDate: editingValues.dueDate.format('YYYY-MM-DD'),
      };
      console.log('Updating task with ID:', record._id, 'and data:', updatedTask); // Log the data being sent
      await axios.put(`http://localhost:5000/api/tasks/${record._id}`, updatedTask);
      onTaskUpdate(updatedTask);
      showNotification('success', `The task "${updatedTask.name}" has been updated successfully`);
    } catch (error) {
      console.error('Error updating task:', error);
      console.error('Error response data:', error.response ? error.response.data : 'No response data');
      alert('Error updating task.');;
    } finally {
      setEditingTaskId(null); // Exit editing mode
    }
  };

  const handleChange = (key, value) => {
    setEditingValues({ ...editingValues, [key]: value });
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
      render: (_, record) =>
        editingTaskId === record._id ? (
          <Button type="primary" onClick={() => handleSaveClick(record)}>
            Save
          </Button>
        ) : (
          <>
          <Button onClick={() => handleEditClick(record)}>Edit</Button>
          <Popconfirm title="Are you sure to delete this task?" onConfirm={() => handleDelete(record._id)}>
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
          </>
        ),
    },
  ];

  return <Table dataSource={tasks} columns={columns} rowKey="_id" pagination={{ pageSize: 5 }} />;
};


export default TaskList;