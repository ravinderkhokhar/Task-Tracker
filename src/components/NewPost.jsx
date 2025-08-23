import { useNavigate, useParams } from "react-router-dom"
import {format} from 'date-fns';
import { useEffect, useState } from "react";
const NewPost = ({posts, setPosts, api}) => {
  const {id} = useParams();
  const navigate = useNavigate()
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const isEditMode = Boolean(id);

  useEffect(() =>{
    if(isEditMode && Array.isArray(posts)  && posts.length > 0) {
      const postsToEdit = posts.find(post => (post.id != null) && String(post.id) === String(id));
      if(postsToEdit) {
        setPostTitle(postsToEdit.title);
        setPostBody(postsToEdit.body);
      }
    }
  },[id,posts,isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const datetime = format(now, "MMMM dd, yyyy HH:mm:ss"); 
    if(isEditMode) {
      const updatedPost =  {id,title:postTitle,body:postBody,datetime}
      try {
          const response = await api.put(`/posts/${id}`, updatedPost);
          setPosts(posts.map(post => post.id === id ? {...response.data}:post))
          setPostBody('');
          setPostTitle('');
          navigate("/blog");
      } catch (err) {
        console.log(`Error: ${err.message}`)
      }
    } else {
      const postLength = posts.length-1;
      const id = posts.length ? (Number(posts[postLength].id)+1).toString() : 1;
      const newPost = {id,title:postTitle,datetime,body:postBody};   
      console.log("Post title : "+postTitle)
      console.log("Post body : "+postBody)
      try {
        const repsonse = await api.post('/posts', newPost);
        const allPosts = [...posts, repsonse.data];
        console.log("Post Length : "+id)   
        setPosts(allPosts);
        console.log("allPosts : "+allPosts)
        setPostTitle('');
        setPostBody('');    
        navigate('/blog');
      } catch(err){
        console.log(`Error: ${err.message}`)
      } 
    }
       
  }
  return (
    <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 my-10" onSubmit={handleSubmit}>
      <label htmlFor="posttitle" className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
      <input type="text" name="posttitle" id="posttitle" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
      placeholder="Enter post title" required value={postTitle} onChange={(e) => setPostTitle(e.target.value)}/>
      <textarea rows={5} cols={10} name="postdes" id="postdes" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
      placeholder="Write your description..." required value={postBody} onChange={(e) => setPostBody(e.target.value)}/>
      <button type="submit" name="submit"  className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition">Submit</button>
    </form>
  )
}

export default NewPost
