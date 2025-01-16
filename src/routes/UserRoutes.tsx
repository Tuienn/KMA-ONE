import { lazy } from "react"
import ScheduleProvider from "../context/ScheduleProvider"

import ChatProvider from "../context/ChatProvider"
import ExamSchedule from "../pages/user/schedule/ExamSchedule"
import MySchedule from "../pages/user/schedule/MySchedule"

const Scores = lazy(() => import("../pages/user/Scores"))
const DetailClass = lazy(
  () => import("../pages/user/schedule/classList/DetailClass"),
)
const FindClass = lazy(
  () => import("../pages/user/schedule/classList/FindClass"),
)
const ChatAI = lazy(() => import("../pages/user/ChatAI"))

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
    path: "/scores",
    name: "scores",
    element: <Scores />,
  },
  {
    path: "/chat-ai",
    name: "chat-ai",
    element: (
      <ChatProvider>
        <ChatAI />
      </ChatProvider>
    ),
  },
]

export default UserRoutes
