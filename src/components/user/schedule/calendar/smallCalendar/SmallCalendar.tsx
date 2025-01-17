import Carousel, { CarouselRef } from "antd/es/carousel"
import { forwardRef, memo, useMemo, useState } from "react"
import { UseSchedule } from "../../../../../context/ScheduleProvider"
import { DateType } from "../../../../../pages/user/schedule/MySchedule"
import { getCurrentDate, getSlideCalendar } from "../../../../../utils/common"
import AMonth from "./AMonth"
import DetailDay from "./DetailDay"

type Props = object

const SmallCalendar = forwardRef<CarouselRef, Props>((_, carouselRef) => {
  const currentDate = useMemo(() => getCurrentDate(), [])
  const { start_endCalendar } = UseSchedule()
  const [selectedDate, setSelectedDate] = useState<DateType>({
    month: currentDate.month,
    year: currentDate.year,
    date: currentDate.date,
  })

  return (
    <div className="relative">
      <Carousel
        ref={carouselRef}
        dots={false}
        infinite={false}
        speed={400}
        touchMove={false}
        lazyLoad="anticipated"
        initialSlide={getSlideCalendar(
          currentDate.month,
          currentDate.year,
          start_endCalendar,
        )}
      >
        {start_endCalendar.map((date: DateType, index: number) => (
          <AMonth
            key={index}
            month={date.month}
            year={date.year}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        ))}
      </Carousel>
      <DetailDay
        year={selectedDate.year}
        month={selectedDate.month}
        date={selectedDate.date}
      />
    </div>
  )
})

export default memo(SmallCalendar)
