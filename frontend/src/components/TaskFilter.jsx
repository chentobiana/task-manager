import React, { useState } from 'react';
import { Select, DatePicker, Button } from 'antd';
import { TASK_STATUS_OPTIONS } from '../constants';

const { Option } = Select;

const TaskFilter = ({ onFilter }) => {
  const [status, setStatus] = useState('');
  const [date, setDate] = useState(null);

  const handleFilter = () => {
    onFilter({ 
      status, 
      date: date ? date.format('YYYY-MM-DD') : '' 
    });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Select
        value={status}
        onChange={setStatus}
        style={{ width: 200, marginRight: 8 }}
        placeholder="Select status"
      >
        <Option value="">All Statuses</Option>
        {TASK_STATUS_OPTIONS.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
      <DatePicker onChange={setDate} style={{ marginRight: 8 }} />
      <Button onClick={handleFilter}>Filter</Button>
    </div>
  );
};

export default TaskFilter;
