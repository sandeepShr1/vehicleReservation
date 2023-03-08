import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  getOrderList,
  deleteOrder,
  clearError,
} from "../../../redux/actions/orderAction";
import Loading from "../../../components/Loading/index";
import styled from "styled-components";
import format from "date-fns/format";
import { getCar } from "../../../redux/actions/carActions";
import { getAllUsers } from "../../../redux/actions/userActions";
import toast from "react-hot-toast";
import { DELETE_ORDERS_RESET } from "../../../redux/constants/orderConstants";
import { AiTwotoneDelete } from "react-icons/ai";

const BookingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .__t2 {
    font-weight: 400;
    font-size: 2.8rem;
    color: #ed143d;
    margin: 2rem 0;
  }
`;

const StyledTable = styled.table`
  border-spacing: 0;
  width: 80%;
  margin-top: 1rem;
  border-radius: 8px;
  background-color: #d6d6d6;
  ._table_head {
    padding: 2rem 0;
    height: 5rem;
    color: #fff;
    background: #6c7ae0;
    display: table-row;
  }
  .__td_name {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: start;
  }
  tr {
    :hover {
      background-color: #a0a8e4;
    }
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }
  th,
  td {
    text-align: start;
    margin: 0;
    padding: 0.5rem;
    :last-child {
      border-right: 0;
    }
    span {
      cursor: pointer;
    }
  }
  .__actions {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 2rem;
  }
  .__cancel_btn {
    background: transparent;
    border-radius: 9px;
    width: 6rem;
    height: 4rem;
    color: #ed143d;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    cursor: pointer;
  }
`;

const Booking = ({
  loading,
  error,
  orderList,
  getOrderList,
  carLoading,
  cars,
  carError,
  getCar,
  usersLoading,
  users,
  usersError,
  getAllUsers,
  deleteOrder,
  deleteError,
  isDeleted,
  clearError,
}) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    deleteOrder(id);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
    if (deleteError) {
      toast.error(deleteError);
      clearError();
    }
    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      dispatch({ type: DELETE_ORDERS_RESET });
    }
    getOrderList();
    getCar();
    getAllUsers();
  }, [dispatch, toast, error, deleteError, isDeleted]);
  if (loading || carLoading || usersLoading) {
    return <Loading />;
  }

  return (
    <BookingDiv>
      <p className="__t2">Booking</p>
      <StyledTable>
        <thead>
          <tr className="_table_head">
            <th>Name</th>
            <th>Model</th>
            <th>Booked by</th>
            <th>From</th>
            <th>To</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderList &&
            orderList?.map((order) => (
              <tr key={order.id}>
                <td className="__td_name">
                  <img
                    src={
                      cars &&
                      cars?.find((c) => c._id === order.car)?.images?.[0]?.url
                    }
                    alt=""
                    width={50}
                  />
                  {cars && cars?.find((c) => c._id === order.car)?.name}
                </td>
                <td>{cars && cars?.find((c) => c._id === order.car)?.model}</td>
                <td>
                  {users && users?.find((u) => u._id === order.user)?.name}
                </td>
                <td>{format(new Date(order.from), "MM/dd/yyyy")}</td>
                <td>{format(new Date(order.to), "MM/dd/yyyy")}</td>
                <td>{order.price}</td>
                <td>{order?.paymentInfo?.status}</td>
                <td>
                  <button
                    className="__cancel_btn"
                    onClick={() => handleDelete(order?._id)}
                  >
                    <AiTwotoneDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </StyledTable>
    </BookingDiv>
  );
};
const mapStateToProps = ({
  orderList: { loading, error, orderList },
  carsState: { loading: carLoading, cars, error: carError },
  users: { loading: usersLoading, users, error: usersError },
  order: { error: deleteError, isDeleted },
}) => ({
  loading,
  error,
  orderList,
  carLoading,
  cars,
  carError,
  usersLoading,
  users,
  usersError,
  deleteError,
  isDeleted,
});

const mapDispatchToProps = {
  getOrderList,
  getCar,
  getAllUsers,
  deleteOrder,
  clearError,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Booking);
