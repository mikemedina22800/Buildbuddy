import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import ResetPassword from "./components/ResetPassword"
import google from './../../images/google.svg'
import { GoogleAuthAPI } from "../../api/authAPI"
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from "../../firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { Apple } from "@mui/icons-material"
import logo from "../../images/bblogo.png"
import construction from "../../images/construction.png"

const Auth = () => {
  const [login, setLogin] = useState(true)
  const [register, setRegister] = useState(false)
  const [resetPassword, setResetPassword] = useState(false)

  const navigate = useNavigate()
  
  useEffect(() => {
    onAuthStateChanged(auth, res => {
      if (res?.accessToken) {
        navigate(`/${auth.currentUser.uid}`)
      }
    })
  }, [])

  const logInWithGoogle = () => {
    GoogleAuthAPI().then((res) => {
      console.log(res)
      const uid = res.user.uid
      const name = res.user.displayName
      const email = res.user.email
      setDoc(doc(db, 'users', uid), {
        name,
        email,
        uid
      })
    }, [])
  }

  const openLogin = () => {
    setRegister(false)
    setResetPassword(false)
    setLogin(true)
  }

  const openRegister = () => {
    setLogin(false)
    setResetPassword(false)
    setRegister(true)
  }

  const openResetPassowrd = () => {
    setRegister(false)
    setLogin(false)
    setResetPassword(true)
  }

  return (
    <div className="flex">
      <div className="lg:w-1/2 w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
        <img className="w-80 mb-8" src={logo} alt="logo"/>
        {login === true && <Login openResetPassword={openResetPassowrd}/>}
        {register === true && <Register/>}
        {resetPassword === true && <ResetPassword openLogin={openLogin}/>}
        {register === false && <h1 className="font-bold">Don't have an account? Click <span className="text-blue-600 cursor-pointer" onClick={openRegister}>here</span> to register.</h1>}
        {login === false && resetPassword == false && <h1 className="font-bold">Already have an account? Click <span className="text-blue-600 cursor-pointer" onClick={openLogin}>here</span> to log in.</h1>}
      </div>
      <img src={construction} alt="logo" className='hidden lg:block h-screen w-1/2 object-cover bg-no-repeat'/>
    </div>
  )
}

export default Auth