import { Grid } from "antd"
import { CarouselRef } from "antd/es/carousel"
import { createContext, useLayoutEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import CalendarControl from "../../../components/user/schedule/calendar/CalendarControl"
import LargeCalendar from "../../../components/user/schedule/calendar/largeCalendar/LargeCalendar"
import SmallCalendar from "../../../components/user/schedule/calendar/smallCalendar/SmallCalendar"
import { UseSchedule } from "../../../context/ScheduleProvider"
import { getCurrentDate, getSlideCalendar } from "../../../utils/common"

export interface DateType {
  date?: number
  month: number
  year: number
}

export interface DetailSessionProps {
  courseName: string
  className: string
  room: string
  session: number
  teacherName?: string
}

const currentDate = getCurrentDate()

const ScheduleContext = createContext({
  start_endCalendar: [] as DateType[],
})

const MySchedule: React.FC = () => {
  const { t } = useTranslation(["calendar", "notification"])

  const [dateSlide, setDateSlide] = useState<DateType>({
    month: currentDate.month,
    year: currentDate.year,
  } as DateType)

  // const calendarRef = useRef<CarouselRef>(null)
  const { lg, xl, xxl } = Grid.useBreakpoint()
  const isLargeScreen = lg || xl || xxl

  const carouselRef = useRef<CarouselRef>(null)
  const { start_endCalendar } = UseSchedule()

  const days = [
    t("day.1"),
    t("day.2"),
    t("day.3"),
    t("day.4"),
    t("day.5"),
    t("day.6"),
    t("day.0"),
  ]
  const fullDays = [
    t("dayFull.1"),
    t("dayFull.2"),
    t("dayFull.3"),
    t("dayFull.4"),
    t("dayFull.5"),
    t("dayFull.6"),
    t("dayFull.0"),
  ]

  useLayoutEffect(() => {
    carouselRef.current?.goTo(
      getSlideCalendar(dateSlide.month, dateSlide.year, start_endCalendar),
    )
  }, [dateSlide])

  return (
    <div className={`flex flex-col rounded-lg bg-white p-2 md:p-3`}>
      <CalendarControl setDateSlide={setDateSlide} dateSlide={dateSlide} />
      <div className="flex justify-around pb-0">
        {days.map((day: string) => (
          <div
            key={day}
            className={`mb-2 h-6 w-7 text-center font-bold leading-6 text-gray-400 md:h-11 md:w-11 md:text-lg md:leading-[44px] xl:hidden`}
          >
            {day}
          </div>
        ))}
        {fullDays.map((day: string) => (
          <div
            key={day}
            className={`mb-2 hidden flex-1 text-center font-bold text-gray-400 md:text-lg md:leading-[44px] xl:block`}
          >
            {day}
          </div>
        ))}
      </div>
      {!isLargeScreen && <SmallCalendar ref={carouselRef} />}
      {isLargeScreen && <LargeCalendar ref={carouselRef} />}
    </div>
  )
}

export { ScheduleContext }
export default MySchedule
