import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  RiDashboardFill,
  RiUser3Fill,
  RiCarFill,
  RiContactsBookUploadFill,
} from "react-icons/ri";

const SidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 60%;
  .__welcome {
    text-align: center;
    span {
      font-weight: 600;
      font-size: 2.8rem;
      color: #000000;
    }
  }
  .__sidebar_links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 3rem;
    span {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: baseline;
      a {
        text-decoration: none;
        font-weight: 300;
        font-size: 2rem;
        color: #1e1e1e;
      }
    }
  }
`;

const Sidebar = ({ user }) => {
  return (
    <SidebarDiv>
      <div className="__welcome">
        <span>Welcome {user?.name}</span>
      </div>
      <div className="__sidebar_links">
        <span>
          <RiDashboardFill size={20} />
          <Link to="/admin">Dashboard</Link>
        </span>
        <span>
          <RiUser3Fill size={20} />
          <Link to="/admin/user">Users</Link>
        </span>
        <span>
          <RiCarFill size={20} />
          <Link to="/admin/cars">Vehicles</Link>
        </span>
        <span>
          <RiContactsBookUploadFill size={20} />
          <Link to="/admin/bookings">Booking</Link>
        </span>
      </div>
    </SidebarDiv>
  );
};
const mapStateToProps = ({
  userState: { loading, isAuthenticated, user, error },
}) => ({
  loading,
  isAuthenticated,
  user,
  error,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Sidebar);
