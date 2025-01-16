import { Dispatch, memo, SetStateAction } from "react"
import { DateType } from "../../../../../pages/user/schedule/MySchedule"
import { getCurrentDate } from "../../../../../utils/common"
import { getArrayCalendar } from "../../../../../utils/formatValue"

interface Props extends DateType {
  selectedDate: DateType
  setSelectedDate: Dispatch<SetStateAction<DateType>>
}

const currentDate = getCurrentDate()

const AMonth: React.FC<Props> = ({
  month,
  year,
  selectedDate,
  setSelectedDate,
}) => {
  const arrayCalendar = getArrayCalendar(month, year)

  // console.log("month", month, "year", year, arrayCalendar)

  const isCurrentDate = (date: number) => {
    return (
      date === currentDate.date &&
      month === currentDate.month &&
      year === currentDate.year
    )
  }

  const isSelectDate = (date: number) => {
    return (
      date === selectedDate.date &&
      month === selectedDate.month &&
      year === selectedDate.year
    )
  }

  return (
    <>
      <div className="grid grid-cols-7 grid-rows-6 gap-y-1">
        {arrayCalendar.map((date: number, index: number) => (
          <div className="" key={index}>
            <div
              className={`m-auto h-7 w-7 cursor-pointer rounded-full text-center font-medium leading-7 md:h-10 md:w-10 md:text-[17px] md:leading-10 ${isCurrentDate(date) && "bg-second text-white"} ${isSelectDate(date) && !isCurrentDate(date) && "bg-slate-200"}`}
              onClick={() => {
                if (date !== 0) {
                  setSelectedDate({ month, year, date })
                }
              }}
            >
              {date != 0 && date}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default memo(AMonth)
