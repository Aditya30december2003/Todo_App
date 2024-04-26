import Right from './components/Right'
import Left from './components/Left'
import {useState , useEffect} from 'react'
import axios from 'axios';

function App() {
  const [selectedTodo , setSelectedTodo] = useState(null);
  const [todo , setTodo] = useState([])

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodo(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
      const updatedTodo = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodo(updatedTodo.data);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

    return (
    <>
      <div className='flex flex-col lg:flex-row items-center w-full '>
        <Left setSelectedTodo={setSelectedTodo}/>
        <Right selectedTodo={selectedTodo} setTodo={setTodo} handleDeleteTodo={handleDeleteTodo}/>
      </div>
    </>
  )
}

export default App
