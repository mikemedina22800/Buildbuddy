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
  const [form, setForm] = useState('login')
  const [login, setLogin] = useState(true)
  const [register, setRegister] = useState(false)

  useEffect(() => {
    if (form === 'login') {
      setLogin(true)
      setRegister(false)
    } else {
      setLogin(false)
      setRegister(true)
    }
  }, [form])

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
        email
      })
    }, [])
  }

  return (
    <div className="flex">
      <div className="lg:w-1/2 w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
        <img className="w-80 mb-8" src={logo} alt="logo"/>
        {login === true && <Login setForm={setForm}/>}
        {register === true && <Register setForm={setForm}/>}
        <div onClick={logInWithGoogle} className="w-96 hover:scale-[101%] duration-100 shadow-xl cursor-pointer font-bold mb-4 py-3 rounded-3xl flex items-center justify-center bg-white">
          <img className="h-5 w-5 mr-2" src={google}/>
          <h1>Log In or Register with Google</h1>
        </div>
        <div className="w-96 hover:scale-[101%] duration-100 shadow-xl cursor-pointer font-bold py-3 rounded-3xl  flex items-center justify-center bg-black text-white">
          <Apple className="!text-white"/>
          <h1>Log In or Register with Apple</h1>
        </div>
      </div>
      <img src={construction} alt="logo" className='hidden lg:block h-screen w-1/2 object-cover bg-no-repeat'/>
    </div>
  )
}

export default Auth