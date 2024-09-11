import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Modal } from 'antd';
import EditTaskForm from './EditTaskForm';
import { TASK_COLUMNS } from '../constants';
import useTaskManagement from '../hooks/useTaskManagement';

const TaskList = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { filteredTasks, handleDeleteTask, handleUpdateTask, loadTasks } = useTaskManagement();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleDelete = async (id) => {
    await handleDeleteTask(id);
    loadTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (editedTask) => {
    await handleUpdateTask(editedTask);
    setEditModalVisible(false);
    loadTasks();
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
