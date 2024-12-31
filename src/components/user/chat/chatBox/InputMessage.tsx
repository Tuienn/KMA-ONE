import { SendOutlined } from "@ant-design/icons"
import { useMutation } from "@tanstack/react-query"
import { Mentions, Spin } from "antd"
import axios from "axios"
import { useRef, useState } from "react"
import { UseChat } from "../../../../context/ChatProvider"

const InputMessage: React.FC = () => {
  const refInput = useRef<any>(null) // Ref để tham chiếu đến Mentions
  const [value, setValue] = useState<string>("")
  const { addMessage } = UseChat()

  const mutationSendMessage = useMutation({
    mutationKey: ["POST", "sendMessage"],
    mutationFn: async (data: any) =>
      axios.post(import.meta.env["VITE_PYTHON_API_URL"], data, {
        timeout: 30000,
      }),
    onSuccess: (res: any) => {
      addMessage({ content: res.data.response, isSendMessage: false })
    },
  })

  const handleSendMessage = () => {
    addMessage({ content: value, isSendMessage: true })
    setValue("")
    refInput.current.focus()
    mutationSendMessage.mutate({ query: value })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-[7%] items-center justify-center">
      <Spin spinning={mutationSendMessage.isPending} fullscreen />
      <div className="flex w-full max-w-[900px] items-center gap-2 md:gap-4">
        <Mentions
          allowClear
          placeholder="Aa"
          ref={refInput}
          value={value}
          onChange={(value: string) => setValue(value)}
          onKeyDown={handleKeyDown}
          notFoundContent={null}
          spellCheck={false}
        />
        <SendOutlined
          className="cursor-pointer text-2xl text-second"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  )
}

export default InputMessage
