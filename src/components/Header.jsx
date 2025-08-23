import { Link } from 'react-router-dom'
const Header = (props) => {
  return (
        <header className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
            <Link to="/" ><h1 className="text-xl font-bold text-gray-800">{props.title}</h1></Link>

            <nav>
              <ul className="flex space-x-6">
                  <li><Link to="/addtask" className="text-gray-700 hover:text-blue-500 font-medium"> Add Task </Link></li>
                  <li><Link to="/blog" className="text-gray-700 hover:text-blue-500 font-medium">Blog</Link></li>
                  <li><Link to="/newpost" className="text-gray-700 hover:text-blue-500 font-medium">New Post</Link></li>
                  <li><Link to="/about" className="text-gray-700 hover:text-blue-500 font-medium">About Us</Link></li>
              </ul>
            </nav>
        </header>
  )
}

export default Header