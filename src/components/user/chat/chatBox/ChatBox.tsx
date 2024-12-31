import InputMessage from "./InputMessage"
import ListMessage from "./ListMessage"

const ChatBox: React.FC = () => {
  return (
    <div className="h-full overflow-hidden">
      <ListMessage />
      <InputMessage />
    </div>
  )
}

export default ChatBox
