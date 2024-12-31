import { Avatar } from "antd"
import { memo } from "react"
import logoKMA from "../../../../assets/images/logoKMA.png"

interface Props {
  content: string
}

const ReceiveMessage: React.FC<Props> = ({ content }) => {
  // Xử lý chuỗi: Xóa <|im_end|>, nhận diện link và thay \n bằng <br>
  const processContent = (content: string) => {
    return content
      .replace(/<\|im_end\|>$/, "") // Xóa <|im_end|> ở cuối chuỗi
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" style="color: blue; text-decoration: underline;">$1</a>',
      ) // Chuyển link thành thẻ <a> với style
      .replace(/\n/g, "<br>") // Thay \n bằng <br>
  }

  return (
    <div className="mb-1 mt-1 inline-flex justify-start">
      <Avatar src={logoKMA} />
      <div className="ml-2 inline-block max-w-[80%] break-words rounded-xl rounded-bl-none bg-gray-200 p-2 lg:max-w-[50%]">
        <p dangerouslySetInnerHTML={{ __html: processContent(content) }} />
      </div>
    </div>
  )
}

export default memo(ReceiveMessage)
