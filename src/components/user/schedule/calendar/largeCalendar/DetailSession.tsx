import { Divider, Popover, Typography } from "antd"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { DetailSessionProps } from "../../../../../pages/user/schedule/MySchedule"
import { formatSessionCalendar_object } from "../../../../../utils/formatValue"
import BasicClassData from "../../classList/detailClass/BasicClassData"

const DetailSesion: React.FC<DetailSessionProps> = ({
  courseName,
  className,
  room,
  session,
  teacherName,
}) => {
  const { t } = useTranslation("calendar")
  const { start } = formatSessionCalendar_object(session)

  return (
    <Popover
      trigger={"click"}
      content={
        <>
          <BasicClassData
            className={className}
            courseName={courseName}
            room={room}
            session={session}
            teacherName={teacherName}
          />
          <Divider className="mb-2 mt-2" />
          <div className="pb-2 text-center">
            <Link to={"/"} className="m-auto cursor-pointer text-second">
              {t("cardSession.seeMore")}
            </Link>
          </div>
        </>
      }
      overlayInnerStyle={{ padding: 0, width: 300 }}
    >
      <li className="mb-1 w-full cursor-pointer rounded-md bg-second p-1">
        <Typography.Text ellipsis className="text-white">
          {start}: {courseName}
        </Typography.Text>
      </li>
    </Popover>
  )
}

export default DetailSesion
