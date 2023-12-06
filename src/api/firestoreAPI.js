import { firestore } from '../firebaseConfig'
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore'
import { toast } from "react-toastify"

export const postAPI = async (uid, postText) => {
  try {
    await setDoc(doc(firestore, 'posts', uid), { text: postText });
    toast.success('Your post has been uploaded.');
  } catch(err) {
    toast.error('Your post failed to upload.');
  }
}

export const getPostsAPI = async () => {
  onSnapshot(collection(firestore, 'posts'), res => {
    console.log(
      res.docs.map((docs) => {
        return {...docs.data(), id: docs.id}
      })
    )
  })
}