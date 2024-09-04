import React, { useState } from 'react';
import { Select, DatePicker, Button } from 'antd';

const { Option } = Select;

function TaskFilter({ onFilter }) {
  const [status, setStatus] = useState('');
  const [date, setDate] = useState(null);

  const handleFilter = () => {
    onFilter({ status, date: date ? date.format('YYYY-MM-DD') : '' });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Select value={status} onChange={value => setStatus(value)} style={{ width: 200, marginRight: 8 }} placeholder="Select status">
        <Option value="">All Statuses</Option>
        <Option value="Pending">Pending</Option>
        <Option value="In Progress">In Progress</Option>
        <Option value="Completed">Completed</Option>
      </Select>
      <DatePicker onChange={setDate} style={{ marginRight: 8 }} />
      <Button onClick={handleFilter}>Filter</Button>
    </div>
  );
}

export default TaskFilter;