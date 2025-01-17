import { Divider } from "antd"
import { useTranslation } from "react-i18next"
import { UseSchedule } from "../../../../../context/ScheduleProvider"
import { DateType } from "../../../../../pages/user/schedule/MySchedule"
import {
  getScheduleByMonth,
  getScheduleDayDetail,
} from "../../../../../utils/formatValue"
import DetailSession from "./DetailSession"

const DetailDay: React.FC<DateType> = ({ date, month, year }) => {
  const { arraySchedule } = UseSchedule()
  const scheduleByMonth = getScheduleByMonth(arraySchedule, month, year)
  const dayDetail =
    date !== undefined ? getScheduleDayDetail(scheduleByMonth, date) : []

  const { t } = useTranslation("calendar")
  return (
    <div className="absolute left-[-8px] mt-2 w-[calc(100%+16px)] md:left-[-12px] md:w-[calc(100%+24px)]">
      <Divider style={{ borderColor: "gray" }} variant="dashed">
        <h3>
          {t("detailSession.date")} {date}, {t("detailSession.month")} {month}
        </h3>
      </Divider>
      {dayDetail?.map((item: any) => (
        <DetailSession
          key={item.classId}
          classId={item.classId}
          courseName={item.course}
          className={item.class}
          room={item.room}
          session={item.session}
          teacherName={item.teacherName}
        />
      ))}
    </div>
  )
}

export default DetailDay
