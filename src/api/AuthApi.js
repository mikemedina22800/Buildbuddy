import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { toast } from "react-toastify"

export const LoginAPI = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    toast.success('Logged in!')
    return res
  } catch(err) {
    if (String(err).includes('invalid-credential')) {
      toast.error('Invalid email or password.')
    } else {
      toast.error('An unexpected error has occurred.')
    }
    return err
  }
}

export const RegisterAPI = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    toast.success('Logged in!')
    return res
  } catch(err) {
    if (String(err).includes('invalid-email')) {
      toast.error('Invalid email.')
    } else {
      toast.error('An unexpected error has occurred.')
    }
    return err
  }
}

export const GoogleAuthAPI = async () => {
  try {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider) 
  } catch (err) {
    return err
  }
}