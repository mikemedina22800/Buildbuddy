import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Background from "./components/Background"
import google from './../../images/google.svg'
import apple from './../../images/apple.svg'
import { GoogleAuthAPI } from "../../api/authAPI"
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { firestore } from "../../firebaseConfig"
import { doc, setDoc } from "firebase/firestore"

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
    onAuthStateChanged(auth, response => {
      if (response?.accessToken) {
        navigate('/user')
      }
    })
  }, [])

  const logInWithGoogle = () => {
    GoogleAuthAPI().then((response) => {
      console.log(response)
      const uid = response.user.uid
      const name = response.user.displayName
      const email = response.user.email
      setDoc(doc(firestore, 'users', uid), {
        name,
        email
      })
    }, [])
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="h-20 w-20 flex justify-center items-center bg-white border-black border-2 rounded-full mb-8">Logo</div>
        {login === true && <Login setForm={setForm}/>}
        {register === true && <Register setForm={setForm}/>}
        <div onClick={logInWithGoogle} className="w-96 cursor-pointer font-bold mb-4 py-3 rounded-3xl flex items-center justify-center bg-white">
          <img className="h-5 w-5 mr-2" src={google}/>
          <h1>Log In or Register with Google</h1>
          </div>
        <div className="w-96 cursor-pointer font-bold py-3 rounded-3xl  flex items-center justify-center bg-black text-white">
          <img className="h-5 w-5 mr-2 bg-black" src={apple}/>
          <h1>Log In or Register with Apple</h1>
        </div>
      </div>
      <Background/>
    </>
  )
}

export default Auth