import { useState, useEffect } from "react"
import { Link  } from "react-router-dom";
const Blog = ({posts}) => {
   
    const [searchResults,setSearchResults] = useState([]);
    const [search,setSearch] = useState('');
    useEffect(()=>{
        if (search.trim() === "") {
            // If search is empty, show all posts
            setSearchResults([...posts].reverse());
          } else {
            const filteredResults = posts.filter(post =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));
            setSearchResults(filteredResults.reverse());
            }
    },[posts,search])
  return (
    <div>
        <form name="searchpost"  className="flex items-center gap-4 my-10" onSubmit={(e)=>e.preventDefault()}>
            <input type="search" className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" name="SearchPost" id="SearchPost" placeholder='Search Post' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </form>
        {searchResults.length ? (
            <ul>
            {searchResults.map(post=>(
                <li key={post.id} className="my-5">
                    <Link to={`/postpage/${post.id}`}>
                        <b>Title:</b> {post.title}<br/>
                        <b>Date & Time:</b> {post.datetime}<br/>
                    </Link>
                        <p><b>Description:</b>{
                            (post.body).length <= 25 
                            ? post.body 
                            : `${(post.body).slice(0,25)}...`
                            }
                        </p>
                    
                </li>
            ))}
        </ul>
        ) : (
            <p className="my-10">No Post Found</p>
        )}
        
    </div>
  )
}

export default Blog
