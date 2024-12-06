import { lazy } from "react"
import ScheduleProvider from "../context/ScheduleProvider"
import FindClass from "../pages/user/schedule/ClassList/FindClass"
import ExamSchedule from "../pages/user/schedule/ExamSchedule"
import MySchedule from "../pages/user/schedule/MySchedule"

const LookUpPoints = lazy(() => import("../pages/user/points/LookUpPoints"))
const DetailClass = lazy(
  () => import("../pages/user/schedule/ClassList/DetailClass"),
)

const UserRoutes = [
  {
    path: "/schedule/my-schedule",
    name: "my-schedule",
    element: (
      <ScheduleProvider>
        <MySchedule />
      </ScheduleProvider>
    ),
  },
  {
    path: "/schedule/class-list/find-class",
    name: "class-list",
    element: <FindClass />,
  },
  {
    path: "/schedule/class-list/:classId",
    name: "detail-class",
    element: <DetailClass />,
  },
  {
    path: "/schedule/exam-schedule",
    name: "exam-schedule",
    element: <ExamSchedule />,
  },
  {
    path: "/points/look-up-points",
    name: "look-up-points",
    element: <LookUpPoints />,
  },
]

export default UserRoutes
