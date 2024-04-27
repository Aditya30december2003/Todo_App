import React from 'react';
import axios from 'axios';

const Right = ({ selectedTodo, setTodo }) => {
  const handleDelete = async () => {
    try {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${selectedTodo.id}`);
        const updatedTodo = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTodo(updatedTodo.data);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
  };

  const handleCompleted = async () => {
    const updatedData = { completed: true }; 
    try {
      const response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${selectedTodo.id}`, updatedData);
      console.log('Todo status updated:', response.data);

      
      setTodo((prevTodo) =>
        prevTodo.map((item) =>
          item.id === selectedTodo.id ? { ...item, completed: true } : item
        )
      );
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  return (
    <div className='w-full h-[50%] lg:h-screen'>
      <div className='my-[40%] mx-auto w-[50%] '>
        <h1 className='font-bold '>Title: <span className='font-thin'>{selectedTodo ? selectedTodo.title : ''}</span></h1>
        <h1 className='font-bold '>User Id: <span className='font-thin'>{selectedTodo ? selectedTodo.userId : ''}</span></h1>
        <div className='flex flex-row justify-center gap-5 mt-5'>
          <button onClick={handleDelete} className='bg-red-500 px-5 font-thin py-2 rounded-md text-white'>Delete</button>
          <button onClick={handleCompleted} className='bg-green-600 px-5 py-2 font-thin rounded-md text-white'>Completed</button>
        </div>
      </div>
    </div>
  );
};

export default Right;


