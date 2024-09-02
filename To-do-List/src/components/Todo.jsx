import React, { useState, useRef, useEffect } from 'react';
import icon from "../assets/todo_icon.png";
import TodoList from './TodoList';
import axios from 'axios';

const Todo = () => {
    const [todoList, setTodoList] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/todo');
                setTodoList(response.data);
            } catch (error) {
                console.error("There was an error fetching the todos!", error);
            }
        };
        fetchTodos();
    }, []);

    const add = async () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === "") {
            return null;
        }

        const newTodo = { text: inputText };
        try {
            const response = await axios.post('http://localhost:5050/api/todo/create', newTodo);
            setTodoList([...todoList, response.data]);
            inputRef.current.value = "";
        } catch (error) {
            console.error("There was an error adding the todo!", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5050/api/todo/delete/${id}`);
            setTodoList(prev => prev.filter(todo => todo._id !== id));
        } catch (error) {
            console.error("There was an error deleting the todo!", error);
        }
    };

    const toggle = (id) => {
        setTodoList(prevTodos => prevTodos.map(todo => {
            if (todo._id === id) {
                return { ...todo, isComplete: !todo.isComplete };
            }
            return todo;
        }));
    };

    return (
        <div className='bg-blue-400 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
            <div className='flex items-center mt-7 gap-2'>
                <img src={icon} alt="" className='w-8' />
                <h1 className='text-3xl font-semibold color'>TO-DO LIST</h1>
            </div>

            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
                    type="text" placeholder='Add your Task...' name='text' />

                <button onClick={add} className='border-none rounded-full bg-blue-950 w-32 h-14 text-white text-lg font-medium cursor-pointer'>
                    ADD +
                </button>
            </div>

            <div>
                {todoList.map((item) => (
                    <TodoList key={item._id} text={item.text} id={item._id}
                        isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
                ))}
            </div>
        </div>
    );
};

export default Todo;
