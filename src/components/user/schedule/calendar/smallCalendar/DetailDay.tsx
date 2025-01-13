import { Divider } from "antd"
import { useTranslation } from "react-i18next"
import { DateType } from "../../../../../pages/user/schedule/MySchedule"
import DetailSession from "./DetailSession"

const DetailDay: React.FC<Omit<DateType, "year">> = ({ date, month }) => {
  const { t } = useTranslation("calendar")
  return (
    <div className="absolute left-[-8px] mt-2 w-[calc(100%+16px)] md:left-[-12px] md:w-[calc(100%+24px)]">
      <Divider style={{ borderColor: "gray" }} variant="dashed">
        <h3>
          {t("detailSession.date")} {date}, {t("detailSession.month")} {month}
        </h3>
      </Divider>
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
