import React from 'react';

export function TodoItem({ todo, toggleTodo }) {
  const handleTodoClick = () => {
    toggleTodo(todo.id);
  }
  return (
    <li>
      {todo.task}
      <input type="checkbox" checked={todo.completed} onChange={handleTodoClick}/>
    </li>
  )
}