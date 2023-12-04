import { useState } from "react"
import { LoginAPI } from "../../api/AuthApi"
import { Button, Paper, Input } from "@mui/material"
import { Link } from "react-router-dom"

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorDisplay, setErrorDisplay] = useState('hidden')
  const [errorMessage, setErrorMessage] = useState('')

  const login = (e) => {
    e.preventDefault()
    LoginAPI(email, password).then((response) => {
      console.log(response)
      if (response.includes('Error')) {
        setErrorDisplay('flex')
        if (response.includes('400')) {
          setErrorMessage('Invalid email or password.')
        } else {
          setErrorMessage('An unexpected error has occurred.')
        }
      }
    })
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="mb-8 h-20 w-20 flex justify-center items-center border-black border-2 rounded-full">Logo</div>
      <form onSubmit={login} >
        <Paper className="w-96 px-4 py-2">
          <Input type="email" disableUnderline className="w-96" placeholder="Email" value={email} required onChange={(e) => {setEmail(e.target.value)}}/>
        </Paper>
        <Paper className="w-96 px-4 py-2 my-8">
          <Input type="password" disableUnderline className="w-96" placeholder="Password" value={password} required onChange={(e) => {setPassword(e.target.value)}}/>
        </Paper>
        <div className="w-96 flex justify-between mb-8">
          <Button type="submit" variant="contained">Login</Button>
          <Link to='/register'>
            <Button variant="contained">Register</Button>
          </Link>
        </div>
        <p className={`text-[red] font-bold ${errorDisplay}`}>{errorMessage}</p>
      </form>
    </div>
  )
}

export default Login