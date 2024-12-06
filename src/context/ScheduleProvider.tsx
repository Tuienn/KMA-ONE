import { createContext, useContext } from "react"
import { DateType } from "../pages/user/schedule/MySchedule"
import { convertStar_EndToArrayCalendar } from "../utils/formatValue"

const ScheduleContext = createContext({
  start_endCalendar: [] as DateType[],
})

interface Props {
  children: React.ReactNode
}

const ScheduleProvider: React.FC<Props> = ({ children }) => {
  const start = { month: 5, year: 2024 }
  const end = { month: 1, year: 2025 }
  const start_endCalendar = convertStar_EndToArrayCalendar(
    start.month,
    start.year,
    end.month,
    end.year,
  )

  return (
    <ScheduleContext.Provider value={{ start_endCalendar }}>
      {children}
    </ScheduleContext.Provider>
  )
}

export const UseSchedule = () => {
  return useContext(ScheduleContext)
}

export default ScheduleProvider
