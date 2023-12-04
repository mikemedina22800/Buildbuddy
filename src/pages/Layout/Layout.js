import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"

const Layout = () => {
  return (
    <div className="bg-gray-200 top-0 w-screen h-screen fixed">
      <nav className="bg-white z-50 fixed top-0 h-20 w-screen flex justify-around items-center">
        <Link to = ''>
          <h1>Home</h1>
        </Link>
        <Link to = '/login'> 
          <h1>Login</h1>
        </Link>
        <Link to = '/register'> 
          <h1>Register</h1>
        </Link>
      </nav>
      <Outlet/>
    </div>
  )
}

export default Layout