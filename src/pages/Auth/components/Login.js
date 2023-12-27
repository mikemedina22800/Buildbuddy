import { useState } from "react"
import { LoginAPI } from "../../../api/authAPI"
import { Paper, Tooltip } from "@mui/material"
import { Help } from "@mui/icons-material"
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"

const Login = ({openRegister, openResetPassword}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inputType, setInputType] = useState('password')

  const login = (e) => {
    e.preventDefault()
    LoginAPI(email, password).then((res) => {
      console.log(res)
    })
  }

  const toggleVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  return (
    <form onSubmit={login} className="flex items-center flex-col">
      <Paper className="sm:w-96 w-80 px-4 py-2 mb-4">
        <input type="email" className="w-full outline-none" placeholder="Email" value={email} required onChange={(e) => {setEmail(e.target.value)}}/>
      </Paper>
      <Paper className="sm:w-96 w-80 px-4 py-2 flex justify-between">
        <input type={inputType} className="w-full outline-none" placeholder="Password" value={password} required onChange={(e) => {setPassword(e.target.value)}}/>
        <div className="flex items-center !text-2xl">
          <div className="mr-1 cursor-pointer flex items-center" onClick={toggleVisibility}>
            {inputType === 'password' && <EyeFilled/>}
            {inputType === 'text' && <EyeInvisibleFilled/>}
          </div>
          <Tooltip className="!cursor-pointer" onClick={openResetPassword} title="Forgot password?" placement="right" arrow>
            <Help/>
          </Tooltip>
        </div>
      </Paper>
      <button className="bg-blue-600 text-xl rounded-2xl px-6 py-3 text-white font-bold my-8" type="submit">Log In</button>
    </form>
  )
}

export default Login