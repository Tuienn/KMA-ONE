import { Navigate, Outlet } from "react-router-dom"
import PathProvider from "../context/PathProvider"
import LayoutBasic from "../layout/LayoutBasic"
import { getDataStorage } from "../utils/handleStorage"

export const ProtectedRoute = () => {
  const token = getDataStorage("token")
  if (!token) {
    return <Navigate to="/login" />
  } else {
    if (new Date().getTime() - token.expiredTime > 604800000) {
      // A week
      localStorage.removeItem("token")
      return <Navigate to="/login" />
    }
  }
  return (
    <PathProvider>
      <LayoutBasic>
        <Outlet />
      </LayoutBasic>
    </PathProvider>
  )
}
