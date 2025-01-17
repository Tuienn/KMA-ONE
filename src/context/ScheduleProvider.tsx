import { useQuery } from "@tanstack/react-query"
import { App } from "antd"
import { createContext, useContext, useEffect } from "react"
import { useTranslation } from "react-i18next"
import apiService from "../api/APIService"
import { DateType } from "../pages/user/schedule/MySchedule"
import {
  convertStar_EndToArrayCalendar,
  getStartEndSchedule,
} from "../utils/formatValue"
import { getAuthToken } from "../utils/handleStorage"

const ScheduleContext = createContext({
  start_endCalendar: [] as DateType[],
  arraySchedule: [] as any[],
})

interface Props {
  children: React.ReactNode
}

const ScheduleProvider: React.FC<Props> = ({ children }) => {
  const { authStudentCode } = getAuthToken()
  const { t } = useTranslation("notification")
  const { notification } = App.useApp()

  const queryMySchedule = useQuery({
    queryKey: ["GET", "my-schedule"],
    queryFn: async () =>
      apiService("get", "/student/Schedules", {
        studentCode: authStudentCode,
      }),
    staleTime: Infinity,
  })

  useEffect(() => {
    if (queryMySchedule.isError) {
      notification.error({
        message: t("api.title"),
        description: t("api.get.error"),
      })
    }
  }, [queryMySchedule.isError])

  const arraySchedule = queryMySchedule.isSuccess
    ? queryMySchedule.data.years
    : []

  const getStart_endCalendar = () => {
    const { start, end } = getStartEndSchedule(arraySchedule)

    return convertStar_EndToArrayCalendar(
      start.month,
      start.year,
      end.month,
      end.year,
    )
  }

  const start_endCalendar = getStart_endCalendar()

  return (
    <ScheduleContext.Provider
      value={{
        start_endCalendar,
        arraySchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}

export const UseSchedule = () => {
  return useContext(ScheduleContext)
}

export default ScheduleProvider
