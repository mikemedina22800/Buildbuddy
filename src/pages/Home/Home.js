import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Paper } from "@mui/material"
import { auth } from "../../firebaseConfig"
import Post from "./components/Post"
import pfp from '../../images/pfp.png'
import { getPostsAPI } from "../../api/firestoreAPI"

const Home = () => {
  const path = useParams().id
  const uid = auth?.currentUser?.uid
  const posts = getPostsAPI(uid)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (path != uid) {
      navigate(`/${uid}`)
    }
  }, [location])

  const [isPostOpen, setIsPostOpen] = useState(false)

  const togglePost = () => {
    isPostOpen == false ? setIsPostOpen(true) : setIsPostOpen(false)
  }

  return (
    <div className="mt-20 flex flex-col items-center">
      <Paper className="w-[48rem] h-48 flex items-center justify-center !bg-gray-200">
        <div className="flex items-center">
          <img src={pfp} className="rounded-full h-10 w-10 mr-2"/>
          <Paper onClick={togglePost} className="!bg-white  cursor-pointer w-96 px-4 py-2 !rounded-3xl">Make a post</Paper>
        </div>
      </Paper> 
      <Post uid={uid} togglePost={togglePost} isPostOpen={isPostOpen}/>
    </div>
  )
}

export default Home