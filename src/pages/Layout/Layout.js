import { useEffect, useState } from "react"
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../firebaseConfig"
import { Home, Group, Work, Sms, Notifications, Logout, Search } from "@mui/icons-material"
import { Tooltip, Paper, IconButton } from "@mui/material"
import pfp from '../../images/pfp.svg'
import bgImage from '../../images/construction.png'


const Layout = () => {
  const uid = useParams().id
  
  const location = useLocation()
  
  const navigate = useNavigate()

  useEffect(() => {
    if (uid != auth.currentUser?.uid) {
      navigate('/')
    }
  }, [location])

  return (
    <div className='w-screen h-screen top-0 fixed bg-cover' style={{backgroundImage:`url(${bgImage})`}}>
      <Paper className="h-20 w-screen !bg-gray-200 !rounded-none flex items-center justify-around">
        <div className="flex items-center">
          <img src={pfp} className="rounded-full mr-2 h-10 w-10"/>
          <Paper className='w-96 px-4 py-2 !transition-colors flex items-center bg-white'>
            <Search/>
            <input className="w-full bg-transparent outline-none ml-2" placeholder="Search..."/>
          </Paper>
        </div>
        <Tooltip title="Home" placement="bottom" arrow>
          <Link to={`/user/${uid}`}>
            <IconButton>
              <Home className="!text-4xl"/>
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Network" placement="bottom" arrow>
          <Link to={`/user/${uid}/network`}>
            <IconButton>
              <Group className="!text-4xl"/>
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Jobs" placement="bottom" arrow>
          <Link to={`/user/${uid}/jobs`}>
            <IconButton>
              <Work className="!text-4xl"/>
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Chat" placement="bottom" arrow>
          <Link to={`/user/${uid}/chat`}>
            <IconButton>
              <Sms className="!text-4xl"/>
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Alerts" placement="bottom" arrow>
          <Link to={`/user/${uid}/alerts`}>
            <IconButton>
              <Notifications className="!text-4xl"/>
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Log Out" placement="bottom" arrow>
          <IconButton onClick={() => {signOut(auth)}}>
            <Logout className="!text-4xl"/>
          </IconButton>
        </Tooltip>
      </Paper>
      <Outlet/>
    </div>
  )
}

export default Layout