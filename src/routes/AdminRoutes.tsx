import { lazy } from "react"
import StudentManagement from "../pages/admin/StudentManagement"

const CourseManagement = lazy(() => import("../pages/admin/CourseManagement"))
const ScheduleManagement = lazy(
  () => import("../pages/admin/ScheduleManagement"),
)
const ScoreManagement = lazy(() => import("../pages/admin/ScoreManagement"))
const NotifManagement = lazy(() => import("../pages/admin/NotifManagement"))

const AdminRoutes = [
  {
    path: "/student-management",
    name: "student-management",
    element: <StudentManagement />,
  },
  {
    path: "/course-management",
    name: "course-management",
    element: <CourseManagement />,
  },
  {
    path: "/schedule-management",
    name: "schedule-management",
    element: <ScheduleManagement />,
  },
  {
    path: "/score-management",
    name: "score-management",
    element: <ScoreManagement />,
  },
  {
    path: "/notification-management",
    name: "notification-management",
    element: <NotifManagement />,
  },
]

export default AdminRoutes
