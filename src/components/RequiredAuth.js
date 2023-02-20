import { useLocation, Navigate, Outlet } from "react-router-dom";


const RequiredAuth = ({ isAuth, user, role }) => {
      const location = useLocation();

      if (!isAuth) {
            return <Navigate to="/login" state={{ from: location }} replace />
      }
      if (isAuth && role === "admin" && user.role !== "admin") {
            return <Navigate to="/unauthorized" state={{ from: location }} replace />
      }
      return <Outlet />
}

export default RequiredAuth;
