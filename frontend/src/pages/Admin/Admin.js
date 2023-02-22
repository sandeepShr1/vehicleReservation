import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import "./Admin.css"

const Admin = () => {
      return (
            <div className='__dashboard'>
                  <div className="__sidebar_div">
                        <Sidebar />
                  </div>
                  <div className="__content_div">
                        <Outlet />
                  </div>

            </div>
      )
}

export default Admin