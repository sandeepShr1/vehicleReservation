import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Line } from "react-chartjs-2";

import styled from "styled-components";
import { connect } from "react-redux";
import { clearError, getAllUsers } from "../../../redux/actions/userActions";
import { getAdminCars } from "../../../redux/actions/carActions";
import { getOrderList } from "../../../redux/actions/orderAction";
import Loading from "../../../components/Loading/index";
import toast from "react-hot-toast";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";

const DashboardDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4rem;
  .__t2 {
    font-weight: 600;
    font-size: 2.8rem;
    color: #ed143d;
    margin: 2rem 0;
  }
  .__analytics {
    display: flex;
    justify-content: space-between;
    width: 70%;
    a {
      text-decoration: none;
      box-shadow: -1px 3px 23px -5px rgba(0, 0, 0, 0.75);
      -webkit-box-shadow: -1px 3px 23px -5px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: -1px 3px 23px 4px rgba(0, 0, 0, 0.75);
      background-color: #ed143d;
      color: white;
      border-radius: 9px;
      width: 10rem;
      height: 5rem;
      font-weight: 600;
      font-size: 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      :hover {
        background-color: #f16d86;
      }
    }
  }
  .__pi_chart {
    width: 40%;
  }
  .__line_chart {
    width: 70%;
  }
`;

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({
  loading,
  error,
  users,
  getAllUsers,
  getAdminCars,
  getOrderList,
  orderList,
  cars,
}) => {
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
    getAllUsers();
    getAdminCars();
    getOrderList();
  }, [error, toast]);
  if (loading) {
    return <Loading />;
  }
  const data = {
    labels: ["Users", "booking"],
    datasets: [
      {
        label: "Bookings / Users",
        data: [users?.length, orderList?.length],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  let totalAmount = 0;
  orderList && orderList.forEach((item) => (totalAmount += item.price));
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };
  if (loading) {
    return <Loading />
  }
  return (
    <DashboardDiv>
      <p className="__t2">Dashboard</p>

      <div className="__analytics">
        <Link to="/admin/user">
          <span>Users</span>
          <span>{users?.length}</span>
        </Link>
        <Link to="/admin/bookings">
          <span>Bookings</span>
          <span>{orderList?.length}</span>
        </Link>
        <Link to="/admin/cars">
          <span>Cars</span>
          <span>{cars?.length}</span>
        </Link>
      </div>
      <div className="__pi_chart">
        <Pie data={data} />
      </div>
      <div className="__line_chart">
        <Line data={lineState} />
      </div>
    </DashboardDiv>
  );
};

const mapStateToProps = ({
  users: { loading, users, error },
  orderList: { orderList },
  carsState: { cars },
}) => ({
  loading,
  error,
  users,
  orderList,
  cars,
});

const mapDispatchToProps = {
  getAllUsers,
  getAdminCars,
  getOrderList,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Dashboard);
