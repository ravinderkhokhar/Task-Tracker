import { useState,useEffect } from 'react'
import {FaTrashAlt} from 'react-icons/fa'
import AddTask from '../components/AddTask'
import apiRequest from './apiRequest'
import SearchTask from './SearchTask';
const Home = ({greeting, API_URL}) => {
    const [name, setName] = useState('Ravinder')
    const [searchTask, setSearchTask] = useState('');
    const [isloading, setIsLoading]=useState(true);
    const [fetchError, setFetchError] = useState(null);
    // const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasklist')) || [])
    // useEffect(()=>{
    //     localStorage.setItem('tasklist',JSON.stringify(tasks));
    // },[tasks])

    const [tasks, setTasks] = useState([])
    useEffect(()=>{
        console.log(API_URL)
        const fetchItems = async () =>{
            try {
                 const response = await fetch(API_URL);
                 const listTasks = await response.json();
                 console.log(listTasks);
                 setTasks(listTasks);      
            } catch(err) {
                console.log(err.stack)
            } finally{
                setIsLoading(false);
            }          
        }
        setTimeout(()=>{
            (async () => await fetchItems())();
        },2000)
        
    },[])
    const handleNameChange = () =>{
      const nameArr = ['Simran','Gurnur','Ravinder','Preet'];
      const intVal = Math.floor(Math.random()*4);
      setName(nameArr[intVal]);
    }
    const handleChecked = async (id) => {
        console.log(`Checked task : ${id}`)
        const updatedTasks = tasks.map((task)=>task.id === id ? {...task, reminder:!task.reminder}:task);
        setTasks(updatedTasks);

        const myTask = updatedTasks.filter(task => task.id === id);
        const updateOptions ={
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({reminder:myTask[0].reminder})
        };

        const reqUrl= `${API_URL}/${id}`;
        console.log(reqUrl);
        const result = await apiRequest(reqUrl,updateOptions);
        if(result) setFetchError(result);
    }

    const handleDelete = async (id) => {
        console.log(id);
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);

        const deleteOption ={
            method: 'DELETE'
        }

        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOption);
        if(result) setFetchError(result);
    }

    const addTask = async (task,reminder) => {
        const taskLength = tasks.length-1;
        console.log("Total taskLength = "+taskLength);
        console.log("Submitted : "+task);
        console.log("Submitted Reminder : "+reminder);
        const id = tasks.length ? tasks[taskLength].id+1 : 1;
        const newAddedTasks = {id,reminder,title:task};
        const updatedTasks = [...tasks,newAddedTasks];
        //setTasks(updatedTasks);
        setTasks(updatedTasks);

        const postOptions = {
            method:"POST",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newAddedTasks)
        }

        const result = await apiRequest(API_URL,postOptions);
        if(result) setFetchError(result);
    }

    const filteredTask = tasks.filter((task) =>task.title.toLowerCase().includes(searchTask.toLowerCase()));
  return (
    <div className="w-full mx-auto px-4 py-6">
      <button onClick={handleNameChange} className="bg-blue-500 text-white px-4 py-2 rounded">Change Name</button>
      <h2 className="text-2xl font-bold">Hello {name}, {greeting}</h2>
      <p className="text-gray-600">Manage your tasks efficiently.</p>
      {/* <AddTask newTask={newTask} setNewTask={setNewTask} newReminder={newReminder} setNewReminder={setNewReminder} handleSubmit={handleSubmit} /> */}
      <SearchTask searchTask={searchTask} setSearchTask={setSearchTask}/>
      <AddTask addTask={addTask}/>
      {/* {tasks.length ? ( */}
      {isloading && <p>Loading Tasks...</p>}
      {!isloading && filteredTask.length >0 && (
        <ul className="space-y-2 mt-10">
            {/* {tasks.map((task)=>( */}
            {filteredTask.map((task)=>(
                <li key={task.id} className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition">
                    <div className="flex items-center gap-3">
                        <input type='checkbox' checked={task.reminder} className="w-5 h-5 accent-green-500 cursor-pointer" onChange={() =>handleChecked(task.id)}/>
                        <span className="text-lg">{task.title}</span>
                    </div>
                    {/* <FaTrashAlt role="button" tabIndex="0" /> */}
                    <button className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition" onClick={()=>handleDelete(task.id)}>
                        <FaTrashAlt/> Delete
                    </button>
                </li>
            ))}
        </ul>
        )}
         {!isloading && filteredTask.length ===0 && <p>No Task Found</p>}
    </div>
  )
}

export default Home
