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

const ChatContext = createContext({
  messages: [] as Message[],
  isChatAI: true,
  addMessage: (message: Message) => {},
})

const ChatProvider: React.FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])
  let isChatAI = true

  const valueContext = {
    messages,
    isChatAI,
    addMessage: (message: Message) => {
      setMessages((prev) => [...prev, message])
    },
  }

  return (
    <ChatContext.Provider value={valueContext}>{children}</ChatContext.Provider>
  )
}

export const UseChat = () => {
  return useContext(ChatContext)
}

export default ChatProvider
