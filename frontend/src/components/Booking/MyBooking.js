import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getMyOrders } from "../../redux/actions/orderAction";
import Loading from "../../components/Loading/index";
import styled from "styled-components";
import format from "date-fns/format";
import { getCar } from "../../redux/actions/carActions";

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
    justify-content: center;
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
    text-align: center;
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
    justify-content: center;
    gap: 2rem;
  }
`;

const MyBooking = ({
  loading,
  error,
  orders,
  getMyOrders,
  carLoading,
  cars,
  carError,
  getCar,
}) => {
  useEffect(() => {
    getMyOrders();
    getCar();
  }, []);
  if (loading || carLoading) {
    return <Loading />;
  }
  return (
    <BookingDiv>
      <p className="__t2">My Orders</p>
      <StyledTable>
        <thead>
          <tr className="_table_head">
            <th>Name</th>
            <th>Model</th>
            <th>From</th>
            <th>To</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders?.map((order) => (
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
                <td>{format(new Date(order.from), "MM/dd/yyyy")}</td>
                <td>{format(new Date(order.to), "MM/dd/yyyy")}</td>
                <td>{order.price}</td>
              </tr>
            ))}
        </tbody>
      </StyledTable>
    </BookingDiv>
  );
};
const mapStateToProps = ({
  myOrders: { loading, error, orders },
  carsState: { loading: carLoading, cars, error: carError },
}) => ({
  loading,
  error,
  orders,
  carLoading,
  cars,
  carError,
});

const mapDispatchToProps = {
  getMyOrders,
  getCar,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(MyBooking);
