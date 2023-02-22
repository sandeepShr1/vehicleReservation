import { useLocation, Navigate, Outlet } from "react-router-dom";


const RequiredAuth = ({ isAuthenticated, user, role }) => {
      const location = useLocation();

      if (!isAuthenticated) {
            return <Navigate to="/login" state={{ from: location }} replace />
      }
      if (isAuthenticated && role === "admin" && user.role !== "admin") {
            return <Navigate to="/unauthorized" state={{ from: location }} replace />
      }
      return <Outlet />
}

export default RequiredAuth;
