import React, { useContext, useState } from 'react';
import { Table, Popconfirm, Button, Modal } from 'antd';
import EditTaskForm from './EditTaskForm';
import { deleteTask, updateTask } from '../api/taskApi';
import { showNotification, handleApiError } from '../utils';
import { TASK_COLUMNS } from '../constants';
import useTaskManagement from '../hooks/useTaskManagement';
import { StateContext } from '../StateProvider';

const TaskList = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { handleUpdateTask, handleDeleteTask } = useTaskManagement();
  const { filteredTasks } = useContext(StateContext);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      handleDeleteTask(id);
      showNotification('success', 'The task has been removed successfully');
    } catch (error) {
      handleApiError("delete a task", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (editedTask) => {
    try {
      const updatedTask = await updateTask(editedTask._id, editedTask);
      handleUpdateTask(updatedTask);
      setEditModalVisible(false);
      showNotification('success', 'The task has been updated successfully');
    } catch (error) {
      handleApiError("edit a task", error);
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
      <Table dataSource={filteredTasks} columns={columns} rowKey="_id" pagination={{ pageSize: 5 }} />
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