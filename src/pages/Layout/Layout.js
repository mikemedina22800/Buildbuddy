import { useState, useEffect } from "react"
import { Outlet, Link, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../firebaseConfig"
import { Home, Group, Work, Sms, Notifications, Logout, Search, Menu, AccountBox } from "@mui/icons-material"
import { Tooltip, Paper, IconButton } from "@mui/material"
import { onAuthStateChanged } from "firebase/auth"

const Layout = () => {

  const [menu, setMenu] = useState(false)

  const navigate = useNavigate()

  const toggleMenu = () => {
    menu === false ? setMenu(true) : setMenu(false)
  }

  const uid = auth?.currentUser?.uid

  useEffect(() => {
    onAuthStateChanged(auth, response => {
      if (!response?.accessToken) {
        navigate('/')
      }
    })
  }, [])

  return (
    <div className='w-screen h-screen top-0 fixed bg-gray-100'>
      <Paper className="h-20 w-screen !bg-gray-200 !rounded-none flex items-center justify-around">
        <Paper className='sm:w-96 w-72 px-4 py-2 !transition-colors flex items-center bg-white'>
          <Search/>
          <input className="w-full bg-transparent outline-none ml-2" placeholder="Search..."/>
        </Paper>
        <div className="lg:flex hidden items-center justify-between w-1/2">
          <Tooltip title="Home" placement="bottom" arrow>
            <Link to={`/${uid}`}>
              <IconButton>
                <Home className="!text-4xl"/>
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Profile" placement="bottom" arrow>
            <Link to={`/${uid}/profile`}>
              <IconButton>
                <AccountBox className="!text-4xl"/>
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Network" placement="bottom" arrow>
            <Link to={`/${uid}/network`}>
              <IconButton>
                <Group className="!text-4xl"/>
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Jobs" placement="bottom" arrow>
            <Link to={`/${uid}/jobs`}>
              <IconButton>
                <Work className="!text-4xl"/>
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Chat" placement="bottom" arrow>
            <Link to={`/${uid}/chat`}>
              <IconButton>
                <Sms className="!text-4xl"/>
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Alerts" placement="bottom" arrow>
            <Link to={`/${uid}/alerts`}>
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
        </div>
        <div className="lg:hidden">
          <Tooltip title="Menu" placement="bottom" arrow>
            <IconButton onClick={toggleMenu}>
              <Menu className="!text-4xl"/>
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
      {menu &&
          <div className="flex flex-col items-center p-5 fixed top-20 right-0 !rounded-t-none !bg-gray-200 lg:hidden" style={{
            boxShadow: "0 0 2px black",
            clipPath: "inset(0px -2px -2px -2px)"
          }}>
            <Tooltip title="Home" placement="left" arrow>
              <Link to={`/${uid}`}>
                <IconButton>
                  <Home className="!text-4xl"/>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Profile" placement="left" arrow>
              <Link to={`/${uid}/profile`}>
                <IconButton>
                  <AccountBox className="!text-4xl"/>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Network" placement="left" arrow>
              <Link to={`/${uid}/network`}>
                <IconButton>
                  <Group className="!text-4xl"/>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Jobs" placement="left" arrow>
              <Link to={`/${uid}/jobs`}>
                <IconButton>
                  <Work className="!text-4xl"/>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Chat" placement="left" arrow>
              <Link to={`/${uid}/chat`}>
                <IconButton>
                  <Sms className="!text-4xl"/>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Alerts" placement="left" arrow>
              <Link to={`/${uid}/alerts`}>
                <IconButton>
                  <Notifications className="!text-4xl"/>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Log Out" placement="left" arrow>
              <IconButton onClick={() => {signOut(auth)}}>
                <Logout className="!text-4xl"/>
              </IconButton>
            </Tooltip>
          </div>
        }
      <Outlet/>
    </div>
  )
}

export default Layout