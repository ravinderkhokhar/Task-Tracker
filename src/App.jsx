import Header from './components/Header'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import AddTask from './components/AddTask'
import About from './components/About'
import Home from './components/Home';
import Footer from './components/Footer';
import Blog from './components/Blog';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import { useEffect, useState} from 'react';
import api from './api/posts.jsx';
function App() {  
  const API_URL = 'http://localhost:5000/tasks';
  // const [posts,setPosts] = useState([
  //     {
  //         id:1,
  //         title:'post1',
  //         body: "test post 1 test post 1 test post 1 test post 1",
  //         datetime: "July 01, 2022 11:17:36 AM"
  //     },
  //     {
  //         id:2,
  //         title:'post2',
  //         body: "test post 2 test post 2 test post 2 test post 2",
  //         datetime: "July 01, 2023 11:17:36 AM"
  //     },
  //     {
  //         id:3,
  //         title:'post3',
  //         body: "test post 3 test post 3 test post 3 test post 3",
  //         datetime: "July 01, 2024 11:17:36 AM"
  //     },
  //     {
  //         id:4,
  //         title:'post4',
  //         body: "test post 4 test post 4 test post 4 test post 4",
  //         datetime: "July 01, 2025 11:17:36 AM"
  //     },
  //     {
  //         id:5,
  //         title:'post5',
  //         body: "test post 5 test post 5 test post 5 test post 5",
  //         datetime: "Dec 01, 2025 11:17:36 AM"
  //     }
  // ])


  const [posts,setPosts] = useState([]);
  useEffect(()=>{
    const fetchPosts = async() => {
      try{
          const response = await api.get('/posts');
          //if(response && response.data) {
              setPosts(response.data);
          //}
      } catch(err) {
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`)
        }        
      }
    }
    fetchPosts();
  },[])
  return (
    <>
      <Router>
        <div className="w-full mx-auto px-4 py-6 pb-0">
          <Header title="Tasks List"/>
          <Routes>
            {/* <Route path='/'  Component={<Home greeting="Welcome to Task Tracker" />} /> */}
            <Route path='/'  element={<Home greeting="Welcome to Task Tracker" API_URL={API_URL}/>} />
            <Route path='/addtask' Component={AddTask} />
            <Route path='/about' Component={About} />
            <Route path='/postpage/:id' element={<PostPage posts={posts} setPosts={setPosts} api={api}/>} />
            <Route path='/blog' element={<Blog posts={posts}/>} />
            <Route path='/newpost' element={<NewPost posts={posts} setPosts={setPosts} api={api}/>} />
            <Route path='/newpost/:id' element={<NewPost posts={posts} setPosts={setPosts} api={api}/>} />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </>
  )
}

export default App
