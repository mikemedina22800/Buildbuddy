import { useState } from "react"
import { IconButton, Tooltip } from "@mui/material"
import { Image, CalendarMonth, Celebration, EmojiEmotions, Work, BarChart, Description, AssignmentInd } from "@mui/icons-material"
import { postAPI } from "../../../api/firestoreAPI"
import Modal from "antd/es/modal/Modal"
import pfp from '../../../images/pfp.png'

const Post = ({uid, togglePost, isPostOpen}) => {

  const [text, setText] = useState('')

  const makePost = (e) => {
    e.preventDefault()
    postAPI(uid, text)
    togglePost()
  }

  return (
    <Modal open={isPostOpen} onCancel={togglePost} footer={null}>
      <div className="flex items-center">
        <img src={pfp} className="rounded-full mr-2 h-10 w-10"/>
        <div className="text-2xl font-bold">Name</div>
      </div>
      <form onSubmit={makePost}>
        <textarea 
          className="w-full resize-none h-96 p-5 mt-5 outline-none" 
          placeholder="What do you want to talk about?" 
          value={text} 
          onChange={(e) => {setText(e.target.value)}}
        />
        <div className="flex w-full justify-end">
          <Tooltip title="Add Emoji" placement="top" arrow>
            <IconButton className="!w-fit">
              <EmojiEmotions className="!text-4xl"/> 
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex justify-between items-center w-96">
          <Tooltip title="Add media" placement="bottom" arrow>
            <IconButton>
              <Image className="!text-4xl"/> 
            </IconButton>
          </Tooltip>
          <Tooltip title="Create an event" placement="bottom" arrow>
            <IconButton>
              <CalendarMonth className="!text-4xl"/> 
            </IconButton>
          </Tooltip>
          <Tooltip title="Celebrate an occasion" placement="bottom" arrow>
            <IconButton>
              <Celebration className="!text-4xl"/> 
            </IconButton>
          </Tooltip>
          <Tooltip title="Share that you're hiring" placement="bottom" arrow>
            <IconButton>
              <Work className="!text-4xl"/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Create a Poll" placement="bottom" arrow>
            <IconButton>
              <BarChart className="!text-4xl"/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Add a document" placement="bottom" arrow>
            <IconButton>
              <Description className="!text-4xl"/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Find an expert" placement="bottom" arrow>
            <IconButton>
              <AssignmentInd className="!text-4xl"/>
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex justify-end">
          <button type="submit" className={`${text === '' ? 'bg-gray-400 pointer-events-none' : 'bg-blue-600'} duration-200 rounded px-5 py-1 w-fit text-white font-bold outline-none`}>Post</button>
        </div>
      </form>
    </Modal>
  )
}

export default Post