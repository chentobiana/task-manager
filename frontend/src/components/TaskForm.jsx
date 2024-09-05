import React from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Select, Button, Card, Space } from 'antd';
import { CheckOutlined, CalendarOutlined, FileTextOutlined, EditOutlined } from '@ant-design/icons';
import { showNotification } from '../utils';

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
        console.log(`Task successfully added. Response: ${response.data}`);
        onTaskAdded(response.data); // Pass the added task to the parent component
        form.resetFields(); // Reset form fields after successful submission
        showNotification('success', `The task "${task.name}" has been added successfully`)


      }
    } catch (error) {
      alert('Error adding task. Please check your input.');
    }
  };

  return (
    <Card 
      title="New Task" 
      bordered={false} 
      style={{ width: '100%', maxWidth: 600, margin: '0 auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
      headStyle={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        initialValues={{ status: 'Pending' }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input the task name!' }]}
            label="Task Name"
            tooltip="Enter the name of the task"
          >
            <Input 
              placeholder="Enter task name" 
              prefix={<EditOutlined />} 
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{ required: true, message: 'Please input the description!' }]}
            label="Description"
            tooltip="Provide a brief description of the task"
          >
            <TextArea 
              placeholder="Enter task description" 
              rows={4} 
              prefix={<FileTextOutlined />} 
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            name="dueDate"
            rules={[{ required: true, message: 'Please select the due date!' }]}
            label="Due Date"
            tooltip="Choose the due date for this task"
          >
            <DatePicker 
              style={{ width: '100%', borderRadius: 8 }} 
              placeholder="Select due date"
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            tooltip="Select the current status of the task"
          >
            <Select 
              style={{ width: '100%', borderRadius: 8 }} 
              placeholder="Select status"
              suffixIcon={<CheckOutlined />}
            >
              <Option value="Pending">Pending</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              style={{ borderRadius: 8 }}
            >
              Add Task
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Card>
  );
};

export default TaskForm;