import { Paper, IconButton, Tooltip } from "@mui/material"
import { Close, Image, CalendarMonth, Celebration, EmojiEmotions, Work, BarChart, Description, AssignmentInd } from "@mui/icons-material"
import { postStatus } from "../../../api/firestoreAPI"

const Post = ({ togglePost }) => {
  return (
    <div className="fixed z-50 top-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
      <Paper className="w-[48rem] h-[36rem] p-5 flex flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 mr-2 flex justify-center items-center bg-white border-black border-2 rounded-full">PFP</div>
            <div className="text-2xl font-bold">Name</div>
          </div>
          <IconButton onClick={togglePost}>
            <Close className="!text-4xl"/>
          </IconButton>
        </div>
        <form>
          <textarea className="w-full resize-none h-96 p-5 mt-5 outline-none" placeholder="What do you want to talk about?"/>
          <IconButton className="!w-fit">
            <EmojiEmotions className="!text-4xl"/> 
          </IconButton>
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
          <div className="flex justify-end cursor-pointer">
            <button type="submit" className="bg-blue-600 rounded-3xl px-4 py-1 w-fit text-white font-bold outline-none">Post</button>
          </div>
        </form>
      </Paper>
    </div>
  )
}

export default Post