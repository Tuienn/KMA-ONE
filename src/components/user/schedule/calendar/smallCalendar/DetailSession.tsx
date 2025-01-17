import { RightOutlined } from "@ant-design/icons"
import { Badge } from "antd"
import { useNavigate } from "react-router-dom"
import { DetailSessionProps } from "../../../../../pages/user/schedule/MySchedule"
import { formatSessionCalendar_object } from "../../../../../utils/formatValue"

const DetailSession: React.FC<DetailSessionProps> = ({
  courseName,
  className,
  room,
  session,
  teacherName,
  classId,
}) => {
  const { start, end } = formatSessionCalendar_object(session)
  const navigate = useNavigate()

  return (
    <div
      className="mb-3 flex rounded-lg bg-blue-100 p-2 md:p-3"
      onClick={() => navigate(`/schedule/class-list/${classId}`)}
    >
      <div className="flex w-1/6 flex-col justify-center text-gray-500">
        <p className="text-center">{start}</p>
        <p className="text-center">|</p> <p className="text-center">{end}</p>
      </div>
      <div className="flex w-[calc(83.333334%-14px)] flex-col justify-center">
        <div className="pl-2">
          <p>
            {courseName} ({className})
          </p>
          <p>
            <Badge status="success" className="mr-2" />
            {room}
          </p>
          <p>
            <Badge status="warning" className="mr-2" />
            {teacherName}
          </p>
        </div>
      </div>
      <div className="flex flex-1 cursor-pointer justify-end">
        <RightOutlined />
      </div>
    </div>
  )
}

export default DetailSession
