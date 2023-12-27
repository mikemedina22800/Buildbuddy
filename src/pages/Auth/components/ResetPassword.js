import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { toast } from "react-toastify";
import { Paper } from "@mui/material";
import { ArrowCircleLeft } from "@mui/icons-material";

const ResetPassword = ({openLogin}) => {
  const [email, setEmail] = useState('')

  const sendResetLink = async (e) => {
    e.preventDefault()
    sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.success('Password reset link sent!')
    })
    .catch((err) => {
      if (err.code === 'auth/invalid-email') {
        toast.error('Account with this email does not exist.')
      } else {
        toast.error('Password reset link failed to send.')
      }
    });
  }
  
  return (
    <div className="flex flex-col items-center px-10">
      <h1 className="font-bold text-center">Enter your account email to recieve a password reset link.</h1>
      <form className="flex flex-col items-center" onSubmit={sendResetLink}>
        <Paper className="sm:w-96 w-80 px-4 py-2 my-8">
          <input type="email" className="w-full outline-none" placeholder="Email" value={email} required onChange={(e) => {setEmail(e.target.value)}}/>
        </Paper>
        <div className="flex justify-between w-full">
          <div onClick={openLogin}>
            <ArrowCircleLeft className="!text-6xl !text-blue-600 cursor-pointer"/>
          </div>
          <button className="bg-blue-600 text-xl rounded-2xl px-6 py-3 text-white font-bold mb-8" type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword