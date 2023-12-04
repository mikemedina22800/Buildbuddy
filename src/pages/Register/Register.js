import { useState } from "react"
import { Button, Paper } from "@mui/material"
import { Link } from "react-router-dom"
import { RegisterAPI } from "../../api/AuthApi"

const Register = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errorDisplay, setErrorDisplay] = useState('hidden')
  const [errorMessage, setErrorMessage] = useState('')


  const register = (e) => {
    if (password === confirm) {
      e.preventDefault()
      RegisterAPI(email, password).then((response) => {
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
    } else {
      setErrorDisplay('flex')
      setErrorMessage('Passwords do not match.')
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="mb-8 h-20 w-20 flex justify-center items-center border-black border-2 rounded-full">Logo</div>
      <form onSubmit={register}>
        <Paper className="w-96 px-4 py-2">
          <input type="email" disableUnderline className="w-full outline-none" placeholder="Email" value={email} required onChange={(e) => {setEmail(e.target.value)}}/>
        </Paper>
        <Paper className="w-96 px-4 py-2 my-8">
          <input 
            type="password" 
            className="w-full outline-none" 
            placeholder="Password" 
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$" 
            title="12 or more characters inluding lowercase letters, uppercase letters, numbers, and symbols." 
            value={password} 
            required 
            onChange={(e) => {setPassword(e.target.value)}}
          />
        </Paper>
        <Paper className="w-96 px-4 py-2">
          <input
              type="password" 
              className="w-full outline-none" 
              placeholder="Password" 
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$" 
              title="12 or more characters inluding lowercase letters, uppercase letters, numbers, and symbols." 
              value={confirm} 
              required 
              onChange={(e) => {setConfirm(e.target.value)}}
            />
        </Paper>
        <div className="w-96 flex justify-between my-8">
          <Button type="submit" variant="contained">Register</Button>
          <Link to='/login'>
            <Button variant="contained">Login</Button>
          </Link>
        </div>
        <p className={`${errorDisplay} text-red-600 font-bold`}>{errorMessage}</p>
      </form>
    </div>
  )
}

export default Register