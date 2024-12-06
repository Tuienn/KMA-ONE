import { DateType } from "../../../../../pages/user/schedule/MySchedule"
import { getCurrentDate } from "../../../../../utils/common"
import { getArrayCalendar } from "../../../../../utils/formatValue"
import DetailSession from "./DetailSession"

const AMonth: React.FC<DateType> = ({ month, year }) => {
  const arrayCalendar = getArrayCalendar(month, year)
  const currentDate = getCurrentDate()

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
        <div key={index}>
          <div
            className={`m-auto mt-0 h-8 w-8 cursor-pointer rounded-full text-center font-medium leading-8 md:text-[17px] ${isCurrentDate(date) && "bg-second text-white"}`}
          >
            {date != 0 && date}
          </div>
          {isCurrentDate(date) && (
            <ul
              className="p-1::webkit-scrollbar-hidden mt-1 box-border h-[calc(100%-32px)] overflow-y-auto"
              style={{
                scrollbarWidth: "none",
                scrollbarGutter: "stable",
              }}
            >
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
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export default AMonth
