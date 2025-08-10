import { FaPlus } from "react-icons/fa"
import { useState } from 'react'
const AddTask = ({addTask}) => {
    
    const [newTask, setNewTask] = useState('');
    const [newReminder, setNewReminder] = useState(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!newTask) return;
        
        addTask(newTask,newReminder);
        setNewTask('');
        setNewReminder(false);
    }
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md mt-10">
      <h1 className="text-xl font-bold mb-4">Add Task</h1>
      <form name="addform" className="flex items-center gap-4" onSubmit={handleSubmit}>
        <label htmlFor="reminder" className="flex items-center space-x-2">
            <input type="checkbox" id="reminder" name="reminder" className="w-5 h-5 accent-green-500 cursor-pointer" checked={newReminder} onChange={(e)=>setNewReminder(e.target.checked)}/>
            <span className="text-gray-700">Set Reminder</span>
        </label>
            <input type="text" autoFocus id="addtask" name="addtask" placeholder="Add Task" className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newTask} onChange={(e)=>setNewTask(e.target.value)}/>            
            <button type="submit" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition">
                <FaPlus/> Add Task
            </button>
      </form>
    </div>
  )
}

export default AddTask
