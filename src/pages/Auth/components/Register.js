import { useState } from "react"
import { Paper } from "@mui/material"
import { RegisterAPI } from "../../../api/authAPI"
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"
import { toast } from "react-toastify"
import { db, storage } from "../../../firebaseConfig"
import { doc, setDoc } from "firebase/firestore"

const Register = ({setForm}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [inputType, setInputType] = useState('password')

  const register = (e) => {
    e.preventDefault()
    if (password === confirm) {
      e.preventDefault()
      RegisterAPI(email, password).then((res) => {
        const { uid } = res.user
        setDoc(doc(db, 'users', uid), {
          name: `${firstName} ${lastName}`,
          email
        });
      })
    } else {
      toast.error('Passwords do not match.')
    }
  }

  const toggleVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  return (
    <form onSubmit={register}>
      <Paper className="w-96 px-4 py-2">
        <input 
          type='text' 
          className="w-full outline-none" 
          pattern="[A-za-z]+" 
          placeholder="First Name" 
          value={firstName} 
          required 
          onChange={(e) => {setFirstName(e.target.value)}}
        />
      </Paper>
      <Paper className="w-96 px-4 py-2 my-4">
        <input 
          type='text' 
          className="w-full outline-none" 
          pattern="[A-za-z]+" 
          placeholder="Last Name" 
          value={lastName} 
          required 
          onChange={(e) => {setLastName(e.target.value)}}
        />
      </Paper>
      <Paper className="w-96 px-4 py-2 mb-4">
        <input 
          type="email" 
          className="w-full outline-none" 
          placeholder="Email" value={email} 
          required onChange={(e) => {setEmail(e.target.value)}}
        />
      </Paper>
      <Paper className="w-96 px-4 py-2 flex justify-between">
      <input 
        type={inputType} 
        className="w-full outline-none" 
        placeholder="Password" 
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$" 
        title="12 or more characters inluding lowercase letters, uppercase letters, numbers, and symbols." 
        value={password} 
        required 
        onChange={(e) => {setPassword(e.target.value)}}
      />
      <div className="cursor-pointer text-2xl flex items-center" onClick={toggleVisibility}>
        {inputType === 'password' && <EyeFilled/>}
        {inputType === 'text' && <EyeInvisibleFilled/>}
      </div>
    </Paper>
    <Paper className="w-96 px-4 py-2 flex justify-between my-4">
      <input
        type={inputType}  
        className="w-full outline-none" 
        placeholder="Confirm Password" 
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$" 
        title="12 or more characters inluding lowercase letters, uppercase letters, numbers, and symbols." 
        value={confirm} 
        required 
        onChange={(e) => {setConfirm(e.target.value)}}
      />
      <div className="cursor-pointer text-2xl flex items-center" onClick={toggleVisibility}>
        {inputType === 'password' && <EyeFilled/>}
        {inputType === 'text' && <EyeInvisibleFilled/>}
      </div>
      </Paper>
      <div className="w-96 flex justify-between mb-8 text-white font-bold">
        <button className="bg-blue-600 rounded-3xl px-4 py-2" type="submit">Register</button>
        <button className="bg-blue-600 rounded-3xl px-4 py-2" onClick={() => {setForm('login')}}>Log In</button>
      </div>
    </form>
  )
}

export default Register