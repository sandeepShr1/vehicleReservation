import { Outlet } from "react-router-dom";

const Layout = () => {
      return (
            <div>
                  <div className="header">header</div>
                  <Outlet />
            </div>
      )
}

export default Layout