import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { auth, storage } from "../../firebaseConfig"
import Post from "./components/Post"
import Header from "./components/Header"
import { getUserData } from "../../api/firestoreAPI"
import { ref, listAll, getDownloadURL } from 'firebase/storage'

const Profile = () => {
  const path = useParams().id
  const uid = auth?.currentUser?.uid
  const navigate = useNavigate()
  const location = useLocation()
  const [profilePic, setProfilePic] = useState(null)
  const [banner, setBanner] = useState(null)

  useEffect(() => {
    const imagesRef = ref(storage, `${path}/`)
    listAll(imagesRef).then((res) => {
      res.items.map((file) => {
        if (file._location.path_.includes('profile_pic')) {
          getDownloadURL(file).then((url) => {
            setProfilePic(url)
          })
        } if (file._location.path_.includes('banner')) {
          getDownloadURL(file).then((url) => {
            setBanner(url)
          })
        }
      })
    })
  }, [profilePic, banner])
  
  const [name, setName] = useState(null)
  const [isPostOpen, setIsPostOpen] = useState(false)

  useEffect(() => {
    getUserData().then((res) => {
      console.log(res)
      setName(res[0].name)
    })
  }, [])

  useEffect(() => {
    if (path != uid) {
      navigate(`/${uid}/profile`)
    }
  }, [location])

  const togglePost = () => {
    isPostOpen == false ? setIsPostOpen(true) : setIsPostOpen(false)
  }

  return (
    <div className="w-screen h-[calc(100vh-5rem)] !bg-gray-200 justify-center">
      <Header
        profilePic={profilePic} 
        setProfilePic={setProfilePic}
        banner={banner}
        setBanner={setBanner}
        name={name}
        togglePost={togglePost}
      />
      <Post 
        uid={uid} 
        togglePost={togglePost} 
        isPostOpen={isPostOpen} 
        name={name} 
        profilePic={profilePic} 
      />
    </div>
  )
}

export default Profile