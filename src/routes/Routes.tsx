import { lazy, Suspense } from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import PageNotFound from "../layout/PageNotFound"
import { getAuthToken } from "../utils/handleStorage"
import AdminRoutes from "./AdminRoutes"
import { ProtectedRoute } from "./ProtectedRoute"
import UserRoutes from "./UserRoutes"

const Login = lazy(() => import("../layout/Login"))

const Routes = () => {
  const { authPermission } = getAuthToken()

  const routesNotAuthenticated = [
    {
      path: "/login",
      element: (
        <Suspense fallback={<>...</>}>
          <Login />
        </Suspense>
      ),
    },
  ]
  const routesForUser = [
    {
      path: "/",
      element: (
        <Suspense fallback={<>...</>}>
          <ProtectedRoute />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/schedule/my-schedule" replace />,
        },
        ...UserRoutes,
      ],
    },
  ]
  const routesForAdmin = [
    {
      path: "/",
      element: (
        <Suspense fallback={<>...</>}>
          <ProtectedRoute />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/student-management" replace />,
        },
        ...AdminRoutes,
      ],
    },
  ]

  const router = createBrowserRouter([
    ...routesNotAuthenticated,
    ...(authPermission === "user" ? routesForUser : []),
    ...(authPermission === "admin" ? routesForAdmin : []),
    {
      path: "*",
      element: authPermission ? <PageNotFound /> : <ProtectedRoute />,
    },
  ])

  return <RouterProvider router={router} />
}

export default Routes
