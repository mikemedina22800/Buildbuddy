import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../firebaseConfig"
import { Home, Group, Work, Sms, Notifications, Logout, Search } from "@mui/icons-material"
import { Tooltip, Paper, IconButton } from "@mui/material"

const Layout = () => {

  const logOut = () => {
    signOut(auth)
  }

  return (
    <div className="bottom-0 w-screen h-screen fixed bg-gray-200">
      <nav className="h-20 w-screen bg-white flex items-center justify-around">
        <div className="flex items-center">
          <div className="h-10 w-10 mr-4 flex justify-center items-center bg-white border-black border-2 rounded-full">Logo</div>
          <Paper className="w-96 px-4 py-2 !bg-gray-200 flex items-center">
            <Search/>
            <input className="w-full bg-transparent outline-none ml-2" placeholder="Search..."/>
          </Paper>
        </div>
        <Tooltip title="Home" placement="bottom" arrow>
          <Link to="/user">
            <IconButton>
              <Home className="!text-4xl"/>
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Network" placement="bottom" arrow>
          <Link to="/user/network">
            <IconButton>
              <Group className="!text-4xl"/>
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Jobs" placement="bottom" arrow>
          <Link to="/user/jobs">
            <IconButton>
              <Work className="!text-4xl"/>
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Chat" placement="bottom" arrow>
          <Link to="/user/chat">
            <IconButton>
              <Sms className="!text-4xl"/>
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Alerts" placement="bottom" arrow>
          <Link to="/user/alerts">
            <IconButton>
              <Notifications className="!text-4xl"/>
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip onClick={logOut} title="Log Out" placement="bottom" arrow>
          <IconButton>
            <Logout className="!text-4xl"/>
          </IconButton>
        </Tooltip>
      </nav>
      <Outlet/>
    </div>
  )
}

export default Layout