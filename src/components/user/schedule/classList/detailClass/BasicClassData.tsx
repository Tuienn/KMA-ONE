import { Card, Typography } from "antd"
import { useTranslation } from "react-i18next"
import { DetailSessionProps } from "../../../../../pages/user/schedule/MySchedule"
import { formatSessionCalendar_object } from "../../../../../utils/formatValue"

const BasicClassData: React.FC<DetailSessionProps> = ({
  courseName,
  className,
  room,
  session,
  teacherName,
}) => {
  const { t } = useTranslation(["calendar", "classList"])
  const { sessionCource, start, end } = formatSessionCalendar_object(session)
  const dataForm = [
    {
      title: t("cardSession.class"),
      value: className ?? (
        <p className="!my-0 text-[14px] italic text-gray-500">
          {t("classList:basicClassData.noData")}
        </p>
      ),
    },
    {
      title: t("cardSession.room"),
      value: room ?? (
        <p className="!my-0 text-[14px] italic text-gray-500">
          {t("classList:basicClassData.noData")}
        </p>
      ),
    },
    {
      title: t("cardSession.session"),
      value: sessionCource ?? (
        <p className="!my-0 text-[14px] italic text-gray-500">
          {t("classList:basicClassData.noData")}
        </p>
      ),
    },
    {
      title: t("cardSession.time"),
      value:
        start && end ? (
          `${start} - ${end}`
        ) : (
          <p className="!my-0 text-[14px] italic text-gray-500">
            {t("classList:basicClassData.noData")}
          </p>
        ),
    },
    {
      title: t("cardSession.teacher"),
      value: teacherName ?? (
        <p className="!my-0 text-[14px] italic text-gray-500">
          {t("classList:basicClassData.noData")}
        </p>
      ),
    },
  ]
  return (
    <Card
      title={<h2 className="text-wrap">{courseName}</h2>}
      styles={{
        header: {
          padding: "8px 12px 8px 12px",

          backgroundColor: "#4C95FB",
          color: "white",
        },
        body: { padding: 12 },
      }}
      className="w-full border-0"
    >
      <ul className="w-full">
        {dataForm.map((data, index) => (
          <li key={index} className="flex gap-2">
            {/* <p className="w-1/3 text-gray-500">{data.title}</p>
            <p className="w-2/3 text-wrap">{data.value}</p> */}
            <Typography.Text className="w-1/3 text-gray-500" ellipsis>
              {data.title}
            </Typography.Text>
            <Typography.Text className="w-2/3" ellipsis>
              {data.value}
            </Typography.Text>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default BasicClassData
