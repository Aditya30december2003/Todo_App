import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodo(response.data);
    } catch (error) {
      console.error('Error fetching todo list:', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
      console.log(`Deleted todo with ID ${todoId}`);

      // Update the todo list after deletion
      const updatedTodoList = todo.filter((item) => item.id !== todoId);
      setTodo(updatedTodoList);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCompletedTodo = async (todoId) => {
    try {
      const updatedData = { completed: true };
      await axios.patch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, updatedData);
      console.log(`Marked todo with ID ${todoId} as completed`);

      // Update the completed status in the todo list
      const updatedTodoList = todo.map((item) =>
        item.id === todoId ? { ...item, completed: true } : item
      );
      setTodo(updatedTodoList);
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const Left = () => (
    <div className='w-full h-screen overflow-y-scroll'>
      <ul>
        {todo.map((item) => (
          <li key={item.id} onClick={() => setSelectedTodo(item)} className={item.completed ?'hover:bg-gray-200 bg-green-400 cursor-pointer duration-300':'hover:bg-gray-200 cursor-pointer duration-300'}>
            <p className='py-3 px-4 font-bold'>{item.title}</p>
            <div className='w-full h-[0.08rem] bg-gray-100'></div>  
            {/* { (
              <span className='text-green-500 font-bold ml-2'>&#10003;</span>
            ) : null} */}
          </li>
        ))}
      </ul>
    </div>
  );

  const Right = () => (
    <div className='w-full h-[50%] lg:h-screen'>
      {selectedTodo && (
        <div className='my-[40%] mx-auto w-[50%] '>
          <h1 className='font-bold'>Title: <span className='font-thin'>{selectedTodo.title}</span></h1>
          <h1 className='font-bold'>User Id: <span className='font-thin'>{selectedTodo.userId}</span></h1>
          <div className='flex flex-row justify-center gap-5 mt-5'>
            <button onClick={() => handleDeleteTodo(selectedTodo.id)} className='bg-red-500 px-5 font-thin py-2 rounded-md text-white'>Delete</button>
            <button onClick={() => handleCompletedTodo(selectedTodo.id)} className='bg-green-600 px-5 py-2 font-thin rounded-md text-white'>Completed</button>
          </div>
           {/* Display completed status */}
        </div>
      )}
    </div>
  );

  return (
    <div className='flex items-center w-full'>
      <Left />
      <Right />
    </div>
  );
}

export default App;
