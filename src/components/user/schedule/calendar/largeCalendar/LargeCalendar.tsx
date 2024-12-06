import Carousel, { CarouselRef } from "antd/es/carousel"
import { forwardRef, useMemo } from "react"
import { UseSchedule } from "../../../../../context/ScheduleProvider"
import { DateType } from "../../../../../pages/user/schedule/MySchedule"
import { getCurrentDate, getSlideCalendar } from "../../../../../utils/common"
import AMonth from "./AMonth"

interface Props {}

const LargeCalendar = forwardRef<CarouselRef, Props>((_, carouselRef) => {
  const currentDate = useMemo(() => getCurrentDate(), [])
  const { start_endCalendar } = UseSchedule()
  return (
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
        <AMonth key={index} month={date.month} year={date.year} />
      ))}
    </Carousel>
  )
})

export default LargeCalendar
