import { Navigate, Outlet } from "react-router"

import { useAppSelector } from "@/redux/hooks"

const ProtectedRoute = () => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized)

  return isAuthorized ? <Outlet /> : <Navigate to="/auth" />
}

export default ProtectedRoute
