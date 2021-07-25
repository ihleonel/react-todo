import React, { Fragment, useState, useRef, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { TodoList } from './components/TodoList';

const KEY = 'todoApp.todos';

export function App() {
  const [todos, setTodos] = useState([]);

  const todoTaskRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));

    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodo = [...todos];
    const todo = newTodo.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodo);
  }

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === '') return;

    setTodos(prevTodo => {
      return [...prevTodo, {id: uuid(), task, completed: false}]
    });

    todoTaskRef.current.value = null;
  }

  const handleClearAll = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
      <button onClick={handleTodoAdd}>+</button>
      <button onClick={handleClearAll}>-</button>
      <div>Te quedas {todos.filter(todo => !todo.completed).length} tareas por terminar</div>
    </Fragment>
  );
}
