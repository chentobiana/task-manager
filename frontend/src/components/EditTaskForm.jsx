import React from 'react';
import { Form, Input, DatePicker, Select, Button, Space } from 'antd';
import { CheckOutlined, CalendarOutlined, FileTextOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

function EditTaskForm({ task, onSubmit }) {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      ...task,
      dueDate: moment(task.dueDate)
    });
  }, [task]);

  const handleSubmit = (values) => {
    const editedTask = {
      ...task,
      name: values.name,
      description: values.description,
      dueDate: values.dueDate.format('YYYY-MM-DD'),
      status: values.status,
    };
    onSubmit(editedTask);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      size="large"
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input the task name!' }]}
          label="Task Name"
          tooltip="Edit the name of the task"
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
          tooltip="Edit the description of the task"
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
          tooltip="Edit the due date for this task"
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
          tooltip="Edit the current status of the task"
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
            Save Changes
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
}

export default EditTaskForm;