import React, {Fragment, useState, useRef} from 'react';
import { TodoList } from './components/TodoList';


class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tasks: [
                {
                    id: 1,
                    task: 'Tarea 1',
                    completed: false
                }
            ],
            newTask: ''
        }
        this.inputChanging = this.inputChanging.bind(this);
        this.toggleTodo = this.toggleTodo.bind(this);
        this.handleTodoAdd = this.handleTodoAdd.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
    }

    toggleTodo = (id) => {
        const copy = [...this.state.tasks];
        const update = copy.find((todo) => todo.id === id);
        update.completed = !update.completed;
        this.setState({tasks: copy});
    }

    handleTodoAdd = () => {
        
        const task = this.state.newTask;
        if(task === '') return;
        this.setState((prevState) => {
          return {newTask: '', tasks: [...prevState.tasks, {id: Math.floor(Math.random() * 1000), task: task, completed: false}]};
        })
    }

    handleDeleteTask = () => {
        const todoListCopy = [...this.state.tasks];
        const updatedList = todoListCopy.filter((todo) =>  !todo.completed );
        this.setState({tasks: updatedList});
    }

    inputChanging(event){
        
        this.setState({newTask: event.target.value});
    }


    render(){

        return (
        <Fragment>
            <TodoList toggleTodo={this.toggleTodo} todos={this.state.tasks}/>
            <input value={this.state.newTask} onChange={this.inputChanging} type="text" placeholder='Nueva Tarea'/>
            <button onClick={this.handleTodoAdd}>Agregar</button>
            <button onClick={this.handleDeleteTask}>Eliminar</button>
            <div>Te quedan {this.state.tasks.filter((todo) => !todo.completed).length} tareas por terminar</div>
        </Fragment>
        );
    }

    
}
export default App;