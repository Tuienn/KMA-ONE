import { memo } from "react"

interface Props {
  content: string
}

const SendMessage: React.FC<Props> = ({ content }) => {
  return (
    <div className="flex justify-end">
      <div className="mb-1 mr-0 mt-1 inline-block max-w-[80%] break-words rounded-xl rounded-br-none bg-second p-2 text-white lg:max-w-[50%]">
        <p>{content}</p>
      </div>
    </div>
  )
}

export default memo(SendMessage)
