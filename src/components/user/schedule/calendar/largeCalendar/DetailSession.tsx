import { Card, Divider, Popover, Typography } from "antd"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { DetailSessionProps } from "../../../../../pages/user/schedule/MySchedule"
import { formatSessionCalendar_object } from "../../../../../utils/formatValue"

const DetailSesion: React.FC<DetailSessionProps> = ({
  courseName,
  className,
  room,
  session,
  teacherName,
}) => {
  const { t } = useTranslation("calendar")
  const { sessionCource, start, end } = formatSessionCalendar_object(session)
  const dataForm = [
    { title: t("cardSession.class"), value: className },
    { title: t("cardSession.room"), value: room },
    { title: t("cardSession.session"), value: sessionCource },
    { title: t("cardSession.time"), value: `${start} - ${end}` },
    { title: t("cardSession.teacher"), value: teacherName },
  ]

  return (
    <Popover
      trigger={"click"}
      content={
        <Card
          title={<h2>{courseName}</h2>}
          styles={{
            header: {
              paddingRight: 12,
              paddingLeft: 12,
              backgroundColor: "#4C95FB",
              color: "white",
            },
            body: { padding: 12 },
          }}
          className="border-0"
        >
          {dataForm.map((data, index) => (
            <div key={index} className="flex justify-between">
              <span className="w-1/3 text-gray-500">{data.title}</span>
              <span className="w-2/3">{data.value}</span>
            </div>
          ))}
          <Divider className="mb-3 mt-3" />
          <div className="text-center">
            <Link to={"/"} className="m-auto cursor-pointer text-second">
              {t("cardSession.seeMore")}
            </Link>
          </div>
        </Card>
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
