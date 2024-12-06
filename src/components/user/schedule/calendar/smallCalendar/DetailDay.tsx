import { useTranslation } from "react-i18next"
import { DateType } from "../../../../../pages/user/schedule/MySchedule"
import DetailSession from "./DetailSession"

const DetailDay: React.FC<Omit<DateType, "year">> = ({ date, month }) => {
  const { t } = useTranslation("calendar")
  return (
    <div className="md:[calc(100%+24px)] absolute left-[-8px] mt-6 w-[calc(100%+16px)] md:left-[-12px]">
      <h3 className="mb-1 text-center">
        {t("detail session.date")} {date}, {t("detail session.month")} {month}
      </h3>
      <DetailSession
        courseName="ReactJS chill code is funny"
        className="ReactJS"
        room="A1"
        session={1}
        teacherName="Nguyen Van A"
      />
      <DetailSession
        courseName="ReactJS chill code is funny"
        className="ReactJS"
        room="A1"
        session={1}
        teacherName="Nguyen Van A"
      />
      <DetailSession
        courseName="ReactJS chill code is funny"
        className="ReactJS"
        room="A1"
        session={1}
        teacherName="Nguyen Van A"
      />
      <DetailSession
        courseName="ReactJS chill code is funny"
        className="ReactJS"
        room="A1"
        session={1}
        teacherName="Nguyen Van A"
      />
    </div>
  )
}

export default DetailDay
