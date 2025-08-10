const SearchTask = ({searchTask,setSearchTask}) => {
  return (
    <div>
      <form name="addform" className="flex items-center gap-4" onSubmit={(e)=>e.preventDefault()}>
            <input type="text" autoFocus id="searchtask" name="searchtask" placeholder="Search Task" className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTask} onChange={(e)=>setSearchTask(e.target.value)}/> 
      </form>
    </div>
  )
}

export default SearchTask
