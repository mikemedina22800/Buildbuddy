import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Paper, IconButton, Tooltip } from "@mui/material"
import { auth } from "../../firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import Post from "./components/Post"

const Home = () => {
  const uid = auth.currentUser.uid

  const [post, setPost] = useState(false)

  const navigate = useNavigate()
  
  useEffect(() => {
    onAuthStateChanged(auth, response => {
      if (!response?.accessToken) {
        navigate('/')
      }
    })
  }, [])

  const togglePost = () => {
    post == false ? setPost(true) : setPost(false)
  }

  return (
    <div className="mt-20 flex flex-col items-center">
      <Paper className="w-[48rem] h-48 flex items-center justify-center">
        <div className="flex items-center">
          <div className="h-10 w-10 mr-2 flex justify-center items-center bg-white border-black border-2 rounded-full">PFP</div>
          <Paper onClick={togglePost} className="!bg-gray-200 cursor-pointer w-96 px-4 py-2 !rounded-3xl">Post</Paper>
        </div>
      </Paper> 
      {post === true && 
        <Post togglePost={togglePost}/>
      }
    </div>
  )
}

export default Home