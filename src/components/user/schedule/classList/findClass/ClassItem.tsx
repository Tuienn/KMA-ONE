import { RightOutlined } from "@ant-design/icons"
import { Badge, Button, Typography } from "antd"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { ClassItemProps } from "./GroupClassItem"

const ClassItem: React.FC<ClassItemProps> = ({ id, name, course }) => {
  const { t } = useTranslation("classList")
  const navigate = useNavigate()

  return (
    <div className="overflow-hidden rounded-lg bg-white duration-200 hover:translate-y-[-5px]">
      <img
        src="https://portal.actvn.edu.vn/images/background-course.png"
        className="w-full"
      />
      <div className="p-2 md:p-3">
        <div className="font-medium">
          <Typography.Paragraph ellipsis={{}} className="!mb-0 md:!text-[16px]">
            <Badge status="success" className="mr-2" />
            {course}
          </Typography.Paragraph>
        </div>
        <div className="flex items-center justify-between md:!text-[16px]">
          <div>
            <Badge status="warning" className="mr-2" />
            {name}
          </div>
          <Button
            type="link"
            className="gap-[1px] px-0"
            icon={<RightOutlined />}
            iconPosition="end"
            onClick={() => navigate(`/schedule/class-list/${id}`)}
          >
            {t("findClass.detail")}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ClassItem
