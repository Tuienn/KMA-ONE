import _ from "lodash"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { UseChat } from "../../../../context/ChatProvider"
import ReceiveMessage from "./ReceiveMessage"
import SendMessage from "./SendMessage"

const ListMessage: React.FC = () => {
  const { t } = useTranslation("chat")
  const { messages } = UseChat()
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      ref={messagesContainerRef}
      className="p-1::webkit-scrollbar-hidden h-[93%] overflow-y-scroll scroll-smooth rounded-lg bg-white p-2"
    >
      {_.isEmpty(messages) ? (
        <div className="flex h-full items-center justify-center">
          <h2 className="text-center text-2xl font-semibold text-gray-400 md:text-3xl">
            {t("chat ai.no content")}
          </h2>
        </div>
      ) : (
        <div>
          {messages.map((message, index) =>
            message.isSendMessage ? (
              <SendMessage key={index} content={message.content} />
            ) : (
              <ReceiveMessage key={index} content={message.content} />
            ),
          )}
        </div>
      )}
    </div>
  )
}

export default ListMessage
