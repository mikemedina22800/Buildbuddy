import { db } from '../firebaseConfig'
import { collection, doc, setDoc, getDocs } from 'firebase/firestore'
import { toast } from "react-toastify"

export const post = async (uid, text) => {
  const timestamp = new Date().getTime()
  const postId = `${uid}${timestamp}`
  try {
    const docRef = doc(db, 'posts', postId);
    await setDoc(docRef, { uid, text, timestamp });
    toast.success('Your post has been uploaded!');
  } catch (err) {
    toast.error('Your post failed to upload.');
    console.log(err);
  }
}

export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const getUserData = async (uid) => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot.docs.map((doc) => {
    if (doc.uid === uid) {
      return doc.data()
    }
  });
}