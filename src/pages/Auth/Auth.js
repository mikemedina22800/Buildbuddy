import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
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
  
  const toggleForm = () => {
    login === true ? setLogin(false) : setLogin(true)
    register === true ? setRegister(false) : setRegister(true)
  }

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

  return (
    <div className="flex">
      <div className="lg:w-1/2 w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
        <img className="w-80 m-8" src={logo} alt="logo"/>
        {login === true && <Login toggleForm={toggleForm}/>}
        {register === true && <Register toggleForm={toggleForm}/>}
        <div onClick={logInWithGoogle} className="sm:w-96 w-80 hover:scale-[105%] duration-100 shadow-xl cursor-pointer font-bold mb-4 py-3 rounded-3xl flex items-center justify-center bg-white">
          <img className="h-5 w-5 mr-2" src={google}/>
          <h1>Log In or Register with Google</h1>
        </div>
        <div className="sm:w-96 w-80 hover:scale-[105%] duration-100 shadow-xl cursor-pointer font-bold py-3 rounded-3xl flex items-center justify-center bg-black text-white">
          <Apple className="!text-white mr-2"/>
          <h1>Log In or Register with Apple</h1>
        </div>
      </div>
      <img src={construction} alt="logo" className='hidden lg:block h-screen w-1/2 object-cover bg-no-repeat'/>
    </div>
  )
}

export default Auth