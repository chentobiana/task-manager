import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import moment from 'moment';
import { TASK_STATUS_OPTIONS } from '../constants';

const { TextArea } = Input;
const { Option } = Select;

const EditTaskForm = ({ task, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...task,
      dueDate: moment(task.dueDate)
    });
  }, [task, form]);

  const handleSubmit = (values) => {
    onSubmit({
      ...task,
      ...values,
      dueDate: values.dueDate.format('YYYY-MM-DD'),
    });
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
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
        <Button type="primary" htmlType="submit" block>Save Changes</Button>
      </Form.Item>
    </Form>
  );
};

export default EditTaskForm;