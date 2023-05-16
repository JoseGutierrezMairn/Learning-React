import React, {Fragment, useState, useRef} from 'react';
import { TodoList } from './components/TodoList';


export function App(){
    const [todos, setTodos] = useState([
        {id: 1, task: 'Tarea 1', completed: false}
    ]);

    const todoTaskRef = useRef();

    const toggleTodo = (id) => {
        const copy = [...todos];
        const update = copy.find((todo) => todo.id === id);
        update.completed = !update.completed;
        setTodos(copy);
    }

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if(task === '') return;
        setTodos((prevState) => {
          return [...prevState, {id: Math.floor(Math.random() * 1000), task: task, completed: false}];
        })
        todoTaskRef.current.value = null;
    }

    const handleDeleteTask = () => {
        const todoListCopy = [...todos];
        const updatedList = todoListCopy.filter((todo) =>  !todo.completed );
        setTodos(updatedList);
    }

    return (
    <Fragment>
        <TodoList toggleTodo={toggleTodo} todos={todos}/>
        <input ref={todoTaskRef}type="text" placeholder='Nueva Tarea'/>
        <button onClick={handleTodoAdd}>Agregar</button>
        <button onClick={handleDeleteTask}>Eliminar</button>
        <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar</div>
    </Fragment>
    );
}