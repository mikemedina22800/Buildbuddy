import { useState } from "react"
import { LoginAPI } from "../../../api/authAPI"
import { Paper, Tooltip } from "@mui/material"
import { Help } from "@mui/icons-material"
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"

const Login = ({setForm}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inputType, setInputType] = useState('password')

  const login = (e) => {
    e.preventDefault()
    LoginAPI(email, password).then((response) => {
      console.log(response)
    })
  }

  const toggleVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  return (
    <form onSubmit={login} >
      <Paper className="w-96 px-4 py-2 mb-4">
        <input type="email" className="w-full outline-none" placeholder="Email" value={email} required onChange={(e) => {setEmail(e.target.value)}}/>
      </Paper>
      <Paper className="w-96 px-4 py-2 flex justify-between mb-2">
        <input type={inputType} className="w-full outline-none" placeholder="Password" value={password} required onChange={(e) => {setPassword(e.target.value)}}/>
        <div className="flex items-center !text-2xl">
          <div className="mr-1 cursor-pointer flex items-center" onClick={toggleVisibility}>
            {inputType === 'password' && <EyeFilled/>}
            {inputType === 'text' && <EyeInvisibleFilled/>}
          </div>
          <Tooltip className="!cursor-pointer" title="Forgot password?" placement="right" arrow>
            <Help/>
          </Tooltip>
        </div>
      </Paper>
      <div className="w-96 flex justify-between mt-4 mb-8 text-white font-bold">
        <button className="bg-blue-600 rounded-3xl px-4 py-2" type="submit">Log In</button>
        <button className="bg-blue-600 rounded-3xl px-4 py-2" onClick={() => {setForm('register')}} variant="contained">Register</button>
      </div>
    </form>
  )
}

export default Login