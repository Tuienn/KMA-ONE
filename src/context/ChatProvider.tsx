import React, { createContext, useContext, useState } from "react"

export interface Message {
  content: string
  isSendMessage: boolean
  otherImage?: string
  otherId?: string | number
}

interface Props {
  children: React.ReactNode
}

interface ChatContextType {
  messages: Message[]
  isChatAI: boolean
  addMessage: (message: Message) => void
}

// Provide an initial value with correct function signatures
const ChatContext = createContext<ChatContextType>({
  messages: [],
  isChatAI: true,
  addMessage: () => {}, // Placeholder function
})

const ChatProvider: React.FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const isChatAI = true

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  const valueContext: ChatContextType = {
    messages,
    isChatAI,
    addMessage,
  }

  return (
    <ChatContext.Provider value={valueContext}>{children}</ChatContext.Provider>
  )
}

export const UseChat = () => {
  return useContext(ChatContext)
}

export default ChatProvider
