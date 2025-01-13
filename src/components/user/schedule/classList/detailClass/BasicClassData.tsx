import { useTranslation } from "react-i18next"
import { DetailSessionProps } from "../../../../../pages/user/schedule/MySchedule"

const BasicClassData: React.FC<DetailSessionProps> = (
  courseName,
  className,
  room,
  session,
  teacherName,
) => {
  const { t } = useTranslation("classList")
  return (
    <div>
      <h1>BasicClassData</h1>
    </div>
  )
}

export default BasicClassData
