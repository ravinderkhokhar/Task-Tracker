import { useParams,Link, useNavigate } from "react-router-dom"
const PostPage = ({posts, setPosts,api}) => {
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() == id);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
      console.log(id)
      try{
        await api.delete(`/posts/${id}`)
        const postsList = posts.filter(post => post.id !==id);
        setPosts(postsList);
        navigate("/blog");
      } catch(err){
          console.log(`Error: ${err.message}`)
      }      
    }

    // const handleEdit = (id) =>{
    //   console.log(`Edit Id ${id}`);
    //   navigate(`/newpost/${id}`);
    // }

  return (
    <div className="my-10">
      
       {post && 
            <>  <h1 >Post Record</h1>
                <h2>{post.title}</h2>
                <p>{post.datetime}</p>
                <p>{post.body}</p>
                <Link className="bg-blue-500 text-white px-4 py-2 rounded my-5" to={`/newpost/${post.id}`}><button>Edit Button</button></Link>
                <button onClick={()=>handleDelete(post.id)} className="bg-blue-500 text-white px-4 py-2 rounded">Delete Post</button>
                {/* <button onClick={()=>handleEdit(post.id)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit Post</button> */}
            </>
       }
       {!post && 
            <>
                <h2>Post Not Found</h2>
                <Link to="/blog">Visit Blog Page</Link>
            </>
       }
    </div>
  )
}

export default PostPage
