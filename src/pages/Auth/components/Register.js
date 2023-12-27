import { useState } from "react"
import { Paper } from "@mui/material"
import { RegisterAPI } from "../../../api/authAPI"
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"
import { toast } from "react-toastify"
import { db } from "../../../firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { IconButton, Tooltip } from "@mui/material"
import { ArrowCircleLeft, Handyman, Person, CheckCircle } from "@mui/icons-material"
import clientIcon from '../../../images/clientIcon.png'
import vendorIcon from '../../../images/vendorIcon.png'

const Register = ({openLogin}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [inputType, setInputType] = useState('password')
  const [accountTypeSelect, setAccountTypeSelect] = useState(true)
  const [inputBoxes, setInputBoxes] = useState(false)
  const [accountType, setAccountType] = useState('')

  const register = (e) => {
    e.preventDefault()
    if (password === confirm) {
      e.preventDefault()
      RegisterAPI(email, password).then((res) => {
        const { uid } = res.user
        setDoc(doc(db, 'users', uid), {
          name: `${firstName} ${lastName}`,
          email,
          uid,
          account_type: accountType
        });
      })
    } else {
      toast.error('Passwords do not match.')
    }
  }

  const toggleVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  const navigate = () => {
    if (accountTypeSelect === false) { 
      setAccountTypeSelect(true)
      setInputBoxes(false)
    } else {
      setAccountTypeSelect(false)
      setInputBoxes(true)
    }
  }

  return (
    <form onSubmit={register} className="flex items-center flex-col">
      {accountTypeSelect && 
        <div className="flex flex-col items-center font-bold text-2xl">
          <h1>Are you a client or a vendor?</h1>
          <div className="flex items-center justify-between w-96 mt-8">
            <div>
              {accountType === 'Client' && <CheckCircle className="fixed text-[lime]"/>}
              <Tooltip onClick={() => {setAccountType('Client')}} title="Client" placement="bottom" arrow>
                <IconButton>
                  <div className="h-40 w-40 flex justify-center">
                    <img className="h-32" src={clientIcon}/>
                  </div>
                </IconButton>
              </Tooltip>
            </div>
            <div>
              {accountType === 'Vendor' && <CheckCircle className="fixed text-[lime]"/>}
              <Tooltip onClick={() => {setAccountType('Vendor')}}  title="Vendor" placement="bottom" arrow>
                <IconButton>
                  <div className="h-40 w-40 flex justify-center">
                    <img className="h-32" src={vendorIcon}/>
                  </div>
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <button onClick={navigate} className={`${accountType === '' ? 'bg-gray-400 pointer-events-none' : 'bg-blue-600'} text-white my-8 type="submit bg-blue-600 text-xl rounded-2xl px-6 py-3`}>Next Step</button>
        </div>
      }
      {inputBoxes &&
        <div className="flex flex-col items-center sm:w-96 w-80 mb-8">
          <Paper className="w-full px-4 py-2">
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
          <Paper className="w-full px-4 py-2 my-4">
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
          <Paper className="w-full px-4 py-2 mb-4">
            <input 
              type="email" 
              className="w-full outline-none" 
              placeholder="Email" value={email} 
              required onChange={(e) => {setEmail(e.target.value)}}
            />
          </Paper>
          <Paper className="w-full px-4 py-2 flex justify-between">
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
        <Paper className="w-full px-4 py-2 flex justify-between mt-4">
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
        <div className="flex justify-between items-center mt-8 w-full">
          <ArrowCircleLeft onClick={navigate} className="!text-6xl !text-blue-600 cursor-pointer"/>
          <button className="bg-blue-600 text-xl rounded-2xl px-6 py-3 text-white font-bold" type="submit">Register</button>
        </div>      
      </div>
      }
    </form>
  )
}

export default Register