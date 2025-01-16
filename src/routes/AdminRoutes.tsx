import { lazy } from "react"
import { Navigate } from "react-router-dom"
import StudentManagement from "../pages/admin/StudentManagement"

const CourseManagement = lazy(() => import("../pages/admin/CourseManagement"))

const ScoreManagement = lazy(() => import("../pages/admin/ScoreManagement"))

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
    path: "/score-management/:mode",
    name: "score-management",
    element: <ScoreManagement />,
  },
  {
    path: "/score-management",
    element: <Navigate to="/score-management/list-by-student" replace />,
  },
]

export default AdminRoutes
