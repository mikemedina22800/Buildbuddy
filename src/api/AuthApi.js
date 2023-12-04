import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'

export const LoginAPI = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    return response
  } catch(err) {
    return `Error ${err.code}`
  }
}

export const RegisterAPI = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    return response
  } catch(err) {
    return `Error ${err.code}`
  }
}