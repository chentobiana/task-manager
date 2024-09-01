// src/components/TaskFilter.jsx
import React, { useState } from 'react';

function TaskFilter({ onFilter }) {
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');

  const handleFilter = () => {
    onFilter({ status, date });
  };

  return (
    <div>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
}

export default TaskFilter;
