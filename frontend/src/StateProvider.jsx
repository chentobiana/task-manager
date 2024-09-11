import React, { useState, createContext, useEffect } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);

    return (
      <StateContext.Provider value={{ filteredTasks, setFilteredTasks, tasks, setTasks }}>
        {children}
      </StateContext.Provider> 
    );
  };