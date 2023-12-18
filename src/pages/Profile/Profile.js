import { useState, useEffect } from "react"
import { Paper, Tooltip } from "@mui/material"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import pfp from '../../images/pfp.png'
import { auth } from "../../firebaseConfig"
import { storage } from "../../firebaseConfig"
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { toast } from "react-toastify"

const Profile = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [newProfilePic, setNewProfilePic] = useState(null)
  const [banner, setBanner] = useState(null)
  const [newBanner, setNewBanner] = useState(null)

  const path = useParams().id
  const uid = auth?.currentUser?.uid
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const imagesRef = ref(storage, `${path}/`)
    listAll(imagesRef).then((res) => {
      console.log(res)
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

  useEffect(() => {
    if (path != uid) {
      navigate(`/${uid}/profile`)
    }
  }, [location])
  
  const updateProfilePic = async () => {
    const imageRef = ref(storage, `${path}/profile_pic`)
    try {
      uploadBytes(imageRef, newProfilePic).then(() => {
        toast.success('Your profile picture was updated!')
      })
    } catch {
      toast.error('Your profile picture failed to update.')
    }
  }

  const updatebanner = async () => {
    const imageRef = ref(storage, `${path}/banner`)
    try {
      uploadBytes(imageRef, newBanner).then(() => {
        toast.success('Your banner was updated!')
      })
    } catch {
      toast.error('Your banner failed to update.')
    }
  }

  useEffect(() => {
    if (newProfilePic) {
      updateProfilePic()
    }
  }, [newProfilePic])

  useEffect(() => {
    if (newBanner) {
      updatebanner()
    }
  }, [newBanner])

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <Paper className="w-[64rem] h-[32rem] !bg-gray-200">
        <Tooltip title="Update Banner" placement="top" arrow>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {setNewBanner(e.target.files[0])}} 
            className="h-48 w-full bg-gray-400 bg-cover hover:cursor-pointer text-transparent" 
            style={{backgroundImage:`url(${banner})`}}
          />
        </Tooltip>
        <Tooltip title="Update Profile Picture" placement="top" arrow>
          <input 
            type="file"
            accept="image/*" 
            onChange={(e) => {setNewProfilePic(e.target.files[0])}} 
            className="hover:cursor-pointer rounded-full w-32 h-32 ml-4 -translate-y-16 bg-cover cursor-pointer text-transparent" 
            style={{backgroundImage:`url(${ profilePic ? profilePic : pfp })`}}
          />
        </Tooltip>
      </Paper>
    </div>
  )
}

export default Profile