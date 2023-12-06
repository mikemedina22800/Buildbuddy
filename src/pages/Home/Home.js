import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Paper, IconButton, Tooltip } from "@mui/material"
import { auth } from "../../firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import Post from "./components/Post"
import pfp from '../../images/pfp.svg'
import { getPostsAPI } from "../../api/firestoreAPI"

const Home = () => {
  const uid = useParams().id

  useEffect(() => {
    getPostsAPI(uid)
  }, [])
  
  const [isPostOpen, setIsPostOpen] = useState(false)

  const navigate = useNavigate()
  
  useEffect(() => {
    onAuthStateChanged(auth, response => {
      if (!response?.accessToken) {
        navigate('/')
      }
    })
  }, [])

  const togglePost = () => {
    isPostOpen == false ? setIsPostOpen(true) : setIsPostOpen(false)
  }

  return (
    <div className="mt-20 flex flex-col items-center">
      <Paper className="w-[48rem] h-48 flex items-center justify-center">
        <div className="flex items-center">
          <img src={pfp} className="rounded-full h-10 w-10 mr-2"/>
          <Paper onClick={togglePost} className="!bg-gray-200 !transition-colors hover:!bg-gray-100 cursor-pointer w-96 px-4 py-2 !rounded-3xl">Make a post</Paper>
        </div>
      </Paper> 
      <Post uid={uid} togglePost={togglePost} isPostOpen={isPostOpen}/>
    </div>
  )
}

export default Home