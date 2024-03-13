import React, { useState } from 'react';
import { ACTIONS } from '../App';

function Task({ task, dispatch }) {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: task.id, title: editedTitle } });
    setEditMode(false);
  };
  

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditMode(false);
  };


  return (
    <li>
      {editMode ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span style={{ color: task.completed ? '#AAA' : '#000', textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <div>
            <button onClick={() => dispatch({ type: ACTIONS.COMPLETE_TODO, payload: { id: task.id } })}>Complete</button>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: task.id } })} style={{ display: !task.completed ? 'none' : 'inline' }}>Delete</button>
            <button onClick={handleEdit}>Edit</button>
          </div>
        </>
      )}
    </li>
  );
}

export default Task;
