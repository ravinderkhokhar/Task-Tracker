import { useState } from 'react'
import {FaTrashAlt} from 'react-icons/fa'
import AddTask from '../components/AddTask'

const Home = ({greeting, searchTask}) => {
    const [name, setName] = useState('Ravinder')
    
    // const [tasks, setTasks] = useState([
    //     {
    //         id:1,
    //         reminder:true,
    //         title:"React Learn"
    //     },
    //     {
    //         id:2,
    //         reminder:true,
    //         title:"Tailwind Learn"
    //     },
    //     {
    //         id:3,
    //         reminder:false,
    //         title:"Project Make"
    //     },
    //     {
    //         id:4,
    //         reminder:false,
    //         title:"Upwork Profile Update"
    //     }

    // ])
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasklist')) || [])
    const handleNameChange = () =>{
      const nameArr = ['Simran','Gurnur','Ravinder','Preet'];
      const intVal = Math.floor(Math.random()*4);
      //console.log(nameArr[intVal]+"---"+nameArr+"---"+intVal)
      setName(nameArr[intVal]);
    }

    const setAndSaveTask=(newtask)=>{
        setTasks(newtask);
        localStorage.setItem('tasklist',JSON.stringify(newtask));
    }
    const handleChecked = (id) => {
        console.log(`Checked task : ${id}`)
        const updatedTasks = tasks.map((task)=>task.id === id ? {...task, reminder:!task.reminder}:task);
        setAndSaveTask(updatedTasks);
    }

    const handleDelete = (id) => {
        console.log(id);
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setAndSaveTask(updatedTasks);
    }

    const addTask = (task,reminder) => {
        const taskLength = tasks.length-1;
        console.log("Total taskLength = "+taskLength);
        console.log("Submitted : "+task);
        console.log("Submitted Reminder : "+reminder);
        const id = tasks.length ? tasks[taskLength].id+1 : 1;
        const newAddedTasks = {id,reminder,title:task};
        const updatedTasks = [...tasks,newAddedTasks];
        //setTasks(updatedTasks);
        setAndSaveTask(updatedTasks);
    }

    const filteredTask = tasks.filter((task) =>task.title.toLowerCase().includes(searchTask.toLowerCase()));
  return (
    <div className="w-full mx-auto px-4 py-6">
      <button onClick={handleNameChange} className="bg-blue-500 text-white px-4 py-2 rounded">Change Name</button>
      <h2 className="text-2xl font-bold">Hello {name}, {greeting}</h2>
      <p className="text-gray-600">Manage your tasks efficiently.</p>
      {/* <AddTask newTask={newTask} setNewTask={setNewTask} newReminder={newReminder} setNewReminder={setNewReminder} handleSubmit={handleSubmit} /> */}
      
      <AddTask addTask={addTask}/>
      {/* {tasks.length ? ( */}
      {filteredTask.length ? (
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
        ):'No Task Found'}
    </div>
  )
}

export default Home
