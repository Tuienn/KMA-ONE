import { UseChat } from "../../../../context/ChatProvider"

const NoChat: React.FC = () => {
  const { isChatAI } = UseChat()

  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-400">
        {isChatAI ? "No chat with AI" : "No chat with App"}
      </h1>
    </div>
  )
}

export default NoChat
