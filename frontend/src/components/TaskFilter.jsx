import React, { useState } from 'react';
import { Select, DatePicker, Button } from 'antd';
import { TASK_STATUS_OPTIONS } from '../constants';
import useTaskManagement from '../hooks/useTaskManagement';

const { Option } = Select;

const TaskFilter = () => {
  const [status, setStatus] = useState('All');
  const [date, setDate] = useState(null);
  const { handleFilter } = useTaskManagement();

  const onFilter = () => {
    handleFilter({ 
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
        <Option value="All">All Statuses</Option>
        {TASK_STATUS_OPTIONS.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
      <DatePicker onChange={setDate} style={{ marginRight: 8 }} />
      <Button onClick={onFilter}>Filter</Button>
    </div>
  );
};

export default TaskFilter;
