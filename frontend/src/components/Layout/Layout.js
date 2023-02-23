import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
      return (
            <div className="div">
                  <Navbar />
                  <Outlet />
            </div>
      )
}

export default Layout