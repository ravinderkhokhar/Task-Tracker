import Header from './components/Header'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import AddTask from './components/AddTask'
import About from './components/About'
import Home from './components/Home';
import Footer from './components/Footer';
import SearchTask from './components/SearchTask';
import { useState } from 'react'
function App() {
  const [searchTask, setSearchTask] = useState('');
  return (
    <>
      <Router>
        <div className="w-full mx-auto px-4 py-6 pb-0">
          <Header title="Tasks List"/>
          <SearchTask searchTask={searchTask} setSearchTask={setSearchTask}/>
          <Routes>
            {/* <Route path='/'  Component={<Home greeting="Welcome to Task Tracker" />} /> */}
            <Route path='/'  element={<Home greeting="Welcome to Task Tracker" searchTask={searchTask}/>} />
            <Route path='/addtask' Component={AddTask} />
            <Route path='/about' Component={About} />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </>
  )
}

export default App
