import React from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Select, Button } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

function TaskForm({ onTaskAdded }) {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const task = {
      name: values.name,
      description: values.description,
      dueDate: values.dueDate.format('YYYY-MM-DD'),
      status: values.status,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      if (response.status === 200) {
        onTaskAdded(response.data); // Pass the added task to the parent component
        form.resetFields(); // Reset form fields after successful submission
      }
    } catch (error) {
      alert('Error adding task. Please check your input.');
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="inline">
      <Form.Item name="name" rules={[{ required: true, message: 'Please input the task name!' }]}>
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
        <TextArea placeholder="Description" />
      </Form.Item>
      <Form.Item name="dueDate" rules={[{ required: true, message: 'Please select the due date!' }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="status" initialValue="Pending">
        <Select>
          <Option value="Pending">Pending</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Add Task</Button>
      </Form.Item>
    </Form>
  );
}

export default TaskForm;
