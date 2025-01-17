import { UseSchedule } from "../../../../../context/ScheduleProvider"
import { DateType } from "../../../../../pages/user/schedule/MySchedule"
import { getCurrentDate } from "../../../../../utils/common"
import {
  getArrayCalendar,
  getScheduleByMonth,
  getScheduleDayDetail,
} from "../../../../../utils/formatValue"
import DetailSession from "./DetailSession"

const AMonth: React.FC<DateType> = ({ month, year }) => {
  const arrayCalendar = getArrayCalendar(month, year)
  const currentDate = getCurrentDate()
  const { arraySchedule } = UseSchedule()

  const scheduleByMonth = getScheduleByMonth(arraySchedule, month, year)

  const isCurrentDate = (date: number) => {
    return (
      date === currentDate.date &&
      month === currentDate.month &&
      year === currentDate.year
    )
  }

  return (
    <div className="grid h-[calc(100vh-213.6px)] grid-cols-7 grid-rows-6">
      {arrayCalendar.map((date: number, index: number) => (
        <div key={index} className={`p-1`}>
          <div
            className={`m-auto mt-0 h-8 w-8 ${date !== 0 && "cursor-pointer"} rounded-full text-center font-medium leading-8 md:text-[17px] ${isCurrentDate(date) && "bg-second text-white"}`}
          >
            {date != 0 && date}
          </div>
          {getScheduleDayDetail(scheduleByMonth, date) && (
            <ul
              className="p-1::webkit-scrollbar-hidden mt-1 box-border h-[calc(100%-32px)] overflow-y-auto"
              style={{
                scrollbarWidth: "none",
                scrollbarGutter: "stable",
              }}
            >
              {getScheduleDayDetail(scheduleByMonth, date)?.map((item: any) => (
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
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export default AMonth
