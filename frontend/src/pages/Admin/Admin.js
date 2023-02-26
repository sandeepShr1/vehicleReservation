import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import styled from 'styled-components';

const AdminDashboard = styled.div`
display: flex;
.__sidebar_div{
      height: 93vh;
      width: 20%;
}
.__content_div{
      margin-top: 5rem;
      width: 80%;
}
`;

const Admin = () => {
      return (
            <AdminDashboard>
                  <div className="__sidebar_div">
                        <Sidebar />
                  </div>
                  <div className="__content_div">
                        <Outlet />
                  </div>

            </AdminDashboard>
      )
}

export default Admin