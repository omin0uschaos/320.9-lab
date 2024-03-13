import React, { useState, useReducer } from 'react';
import './App.css';
import Task from './components/Task';
import sampleData from './data/sampleData';
import generateID from './utilities/idGen';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  COMPLETE_TODO: 'complete-todo',
  DELETE_TODO: 'delete-todo',
  EDIT_TODO: 'edit-todo',
  CLEAR_TODO: 'clear-todo'
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.title)];
    case ACTIONS.COMPLETE_TODO:
      return todos.map(task => {
        if (task.id === action.payload.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter(task => task.id !== action.payload.id);
    case ACTIONS.EDIT_TODO:
      return todos.map(task => {
        if (task.id === action.payload.id) {
          return { ...task, title: action.payload.title };
        }
        return task;
      });
    case ACTIONS.CLEAR_TODO:
      return [];
    default:
      return todos;
  }
}

function newTodo(title) {
  return { id: generateID(), title: title, completed: false };
}

function App() {
  const [todos, dispatch] = useReducer(reducer, sampleData);
  const [title, setTitle] = useState('');
  const [clearButton, setClearButton] = useState(false)

  function handleSubmit(e) {
    dispatch({ type: ACTIONS.ADD_TODO, payload: { title: title } });
    e.preventDefault();
    setTitle('');
  }
  const handleClearData = (e) => {
    dispatch({ type: ACTIONS.CLEAR_TODO });
    e.preventDefault();
    setClearButton(true);
  };

  return (
    <>
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" className='addTaskInput' placeholder='Add Task' value={title} onChange={e => setTitle(e.target.value)} required />
        <button type="submit">Add</button><br />
        <button onClick={handleClearData} style={{ display: clearButton ? 'none' : 'inline' }}>Clear Sample Data</button>
      </form>
      <ul>
        {todos.length > 0 && todos.slice(0).reverse().map(task => (
          <Task key={task.id} task={task} dispatch={dispatch} />
        ))}
      </ul>
    </>
  );
}

export default App;
