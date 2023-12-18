import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import pfp from '../../../images/pfp.png'
import { auth, storage } from "../../../firebaseConfig"
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { toast } from "react-toastify"
import empty from "../../../images/empty.jpeg"
import { Tooltip, IconButton } from "@mui/material"
import { HistoryEdu } from "@mui/icons-material"

const Header = ({ profilePic, setProfilePic, banner, setBanner, name, togglePost }) => {
  const [newProfilePic, setNewProfilePic] = useState(null)
  const [newBanner, setNewBanner] = useState(null)

  const path = useParams().id
  const uid = auth?.currentUser?.uid
  const navigate = useNavigate()
  const location = useLocation()

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
    <div>
      <Tooltip title="Update Banner" placement="bottom" arrow>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {setNewBanner(e.target.files[0])}} 
          className="h-48 w-full bg-cover hover:cursor-pointer text-transparent" 
          style={{backgroundImage:`url(${ banner ? banner : empty })`}}
        />
      </Tooltip>
      <div className="flex px-10">
        <Tooltip title="Update Profile Picture" placement="bottom" arrow>
          <input 
            type="file"
            accept="image/*" 
            onChange={(e) => {setNewProfilePic(e.target.files[0])}} 
            className="hover:cursor-pointer rounded-full w-32 h-32 -translate-y-16 bg-cover cursor-pointer text-transparent" 
            style={{backgroundImage:`url(${ profilePic ? profilePic : pfp })`}}
          />
        </Tooltip>
        <div className="translate-x-4 -translate-y-6 flex items-center">
          <h1 className="!text-4xl font-bold mr-2">{name}</h1>
          <Tooltip title="Make a Post" placement="bottom" arrow>
            <IconButton onClick={togglePost}>
              <HistoryEdu className="!text-5xl"/>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Header