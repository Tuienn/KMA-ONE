import {
  CaretDownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons"
import { App, Button, DatePicker } from "antd"
import dayjs, { Dayjs } from "dayjs"
import React from "react"
import { useTranslation } from "react-i18next"
import { UseSchedule } from "../../../../context/ScheduleProvider"
import { DateType } from "../../../../pages/user/schedule/MySchedule"
import {
  getNextMonthYear,
  getPreviousMonthYear,
} from "../../../../utils/common"

interface Props {
  dateSlide: DateType
  setDateSlide: React.Dispatch<React.SetStateAction<DateType>>
}

const CalendarControl: React.FC<Props> = ({ dateSlide, setDateSlide }) => {
  const { t } = useTranslation(["calendar", "notification"])
  const { start_endCalendar } = UseSchedule()
  const start = start_endCalendar[0]
  const end = start_endCalendar[start_endCalendar.length - 1]
  const { message } = App.useApp()

  const months = [
    t("month.0"),
    t("month.1"),
    t("month.2"),
    t("month.3"),
    t("month.4"),
    t("month.5"),
    t("month.6"),
    t("month.7"),
    t("month.8"),
    t("month.9"),
    t("month.10"),
    t("month.11"),
  ]
  const fullMonths = [
    t("month full.0"),
    t("month full.1"),
    t("month full.2"),
    t("month full.3"),
    t("month full.4"),
    t("month full.5"),
    t("month full.6"),
    t("month full.7"),
    t("month full.8"),
    t("month full.9"),
    t("month full.10"),
    t("month full.11"),
  ]

  return (
    <div className="mb-2 flex cursor-pointer justify-between border-b-2 border-second px-0 pb-2 pt-0 font-bold md:mb-0">
      <div className="relative cursor-pointer">
        <div className="flex gap-1 md:text-2xl">
          <h2 className="xl:hidden">
            {months[dateSlide.month - 1]}, {dateSlide.year}
          </h2>
          <h2 className="hidden xl:block">
            {fullMonths[dateSlide.month - 1]}, {dateSlide.year}
          </h2>
          <CaretDownOutlined />
        </div>
        <DatePicker.MonthPicker
          className="absolute top-0 h-full w-full p-0 opacity-0"
          placeholder=""
          minDate={dayjs(`${start.year}-${start.month}-01`)}
          maxDate={dayjs(`${end.year}-${end.month}-01`)}
          onChange={(value: Dayjs) => {
            setDateSlide({
              month: value.month() + 1,
              year: value.year(),
            })
          }}
          allowClear={false}
          defaultValue={dayjs(`${dateSlide.year}-${dateSlide.month}-01`)}
        />
      </div>
      <div className="flex cursor-pointer items-center gap-3">
        <Button
          icon={<LeftOutlined />}
          className="px-2"
          onClick={() => {
            const previous = getPreviousMonthYear(
              dateSlide.month,
              dateSlide.year,
            )
            if (
              previous.year < start.year ||
              (previous.year === start.year && previous.month < start.month)
            ) {
              message.error(t("notification:calendar.over range"), 1)
              return
            }
            setDateSlide(previous)
          }}
        >
          <span className="!hidden md:!inline-block">
            {t("button.previous")}
          </span>
        </Button>
        <Button
          icon={<RightOutlined />}
          iconPosition="end"
          className="px-2"
          onClick={() => {
            const next = getNextMonthYear(dateSlide.month, dateSlide.year)
            if (
              next.year > end.year ||
              (next.year === end.year && next.month > end.month)
            ) {
              message.error(t("notification:calendar.over range"), 1)
              return
            }
            setDateSlide(next)
          }}
        >
          <span className="!hidden md:!inline-block">{t("button.next")}</span>
        </Button>
      </div>
    </div>
  )
}

export default CalendarControl
