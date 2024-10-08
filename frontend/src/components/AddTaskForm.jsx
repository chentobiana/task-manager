import React from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import { TASK_STATUS_OPTIONS } from '../constants';
import { createTask } from '../api/taskApi';
import { handleApiError, showNotification } from '../utils';
import useTaskManagement from '../hooks/useTaskManagement';

const { TextArea } = Input;
const { Option } = Select;

const AddTaskForm = ({ setIsModalVisible }) => {
  const [form] = Form.useForm();
  const { handleAddTask } = useTaskManagement();

  const handleSubmit = async (values) => {
    try {
      const newTask = await createTask({
        ...values,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
      });
      handleAddTask(newTask);
      setIsModalVisible(false)
      form.resetFields();
      showNotification('success', `The task "${newTask.name}" has been added successfully`);
    } catch (error) {
      handleApiError("add a task", error);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{ status: 'Pending' }}
    >
      <Form.Item
        name="name"
        label="Task Name"
        rules={[{ required: true, message: 'Please input the task name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true, message: 'Please select the due date!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="status" label="Status">
        <Select>
          {TASK_STATUS_OPTIONS.map(option => (
            <Option key={option.value} value={option.value}>{option.label}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>Add Task</Button>
      </Form.Item>
    </Form>
  );
};

export default AddTaskForm;