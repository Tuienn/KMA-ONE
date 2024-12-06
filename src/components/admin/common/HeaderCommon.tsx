import { PlusCircleOutlined } from "@ant-design/icons"
import { Button } from "antd"

interface Props {
  title: string
  button: string
  buttonClick: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderCommon: React.FC<Props> = ({ title, button, buttonClick }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-medium">{title}</h2>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => buttonClick(true)}
      >
        {button}
      </Button>
    </div>
  )
}

export default HeaderCommon
