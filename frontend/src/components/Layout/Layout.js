import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = ({ isAuthenticated, user, logout }) => {
      return (
            <div className="div">
                  <Navbar isAuthenticated={isAuthenticated} user={user} logout={logout} />
                  <Outlet />
            </div>
      )
}

export default Layout;