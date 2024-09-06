import React, { useState } from 'react';
import { Table, Popconfirm, Button, Modal } from 'antd';
import EditTaskForm from './EditTaskForm';
import { deleteTask, updateTask } from '../api/taskApi';
import { showNotification } from '../utils';
import { TASK_COLUMNS } from '../constants';

const TaskList = ({ tasks, onDeleteTask, onEditTask }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      onDeleteTask(id);
      showNotification('success', 'The task has been removed successfully');
    } catch (error) {
      showNotification('error', 'Error deleting task.');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (editedTask) => {
    try {
      const updatedTask = await updateTask(editedTask._id, editedTask);
      onEditTask(updatedTask);
      setEditModalVisible(false);
      showNotification('success', 'The task has been updated successfully');
    } catch (error) {
      showNotification('error', 'Error updating task.');
    }
  };

  const actionColumn = {
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
  };

  const columns = [...TASK_COLUMNS, actionColumn];

  return (
    <>
      <Table dataSource={tasks} columns={columns} rowKey="_id" pagination={{ pageSize: 5 }} />
      <Modal
        title="Edit Task"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        {editingTask && <EditTaskForm task={editingTask} onSubmit={handleEditSubmit} />}
      </Modal>
    </>
  );
};

export default TaskList;