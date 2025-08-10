import {Link} from 'react-router-dom'

const Footer = () => {
    const today = new Date();
  return (
    <footer>
      <div className="text-center mt-8">
        {/* <p>Copyright &copy; {`${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`}</p> */}
        <p>Copyright &copy; {`${today.getFullYear()}`}</p>
        <Link to="/about" className="text-blue-600 underline">
            About
        </Link>
      </div>
    </footer>
  )
}

export default Footer
