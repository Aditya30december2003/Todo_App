import { useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const Left = ({ setSelectedTodo }) => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodo(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClick = (item) => {
    setSelectedTodo(item);
  };

  return (
    <div className='w-full h-[50%] lg:h-screen overflow-y-scroll'>
      <ul>
        {todo.map((item) => (
          <li key={item.id} onClick={() => handleClick(item)} className=' hover:bg-gray-200 cursor-pointer duration-300'>
            <p className='py-3 px-4 font-bold'>{item.title}</p>
            <div className='w-full h-[0.08rem] bg-gray-100'></div>  
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Left;


