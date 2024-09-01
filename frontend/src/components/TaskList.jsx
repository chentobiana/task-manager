// src/components/TaskList.jsx
import React from 'react';

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Status: {task.status}</p>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
