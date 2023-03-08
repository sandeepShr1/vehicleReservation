import React, { useEffect, useState } from "react";
import styled from "styled-components";
import format from "date-fns/format";
import Loading from "../../components/Loading/index";
import { connect } from "react-redux";
import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";
import { createOrder } from "../../redux/actions/orderAction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BookingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .__book_btn {
      margin: 2rem 0;
      padding: 1.6rem 2rem;
      border: none;
      background: #ed143d;
      border-radius: 9px;
      color: #ffffff;
      font-size: 1.6rem;
      cursor: pointer;
      :hover {
        background: #c03952;
      }
    }
`;

const StyledTable = styled.table`
  border-spacing: 1.4rem;
  width: 80%;
  margin-top: 1rem;
  border-radius: 8px;
  background-color: #d6d6d6;
  border-collapse: collapse;

  .__td_name {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    height: inherit;
  }
  tr {
    border-bottom: 1px solid #a0a8e4;
    height: 7rem;
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
`;

const Booking = ({ user, createOrder, loading, error, order }) => {
  const history = useNavigate();
  const [item, setItem] = useState([]);
  console.log(process.env.REACT_APP_PUBLIC_KEY, "sjsj")
  useEffect(() => {
    setItem(JSON.parse(localStorage.getItem("booking")));
  }, []);

  if (item?.length === 0) {
    return <Loading />;
  }
  const startDate = format(
    new Date(item?.rangeDates?.[0]?.startDate),
    "MM/dd/yyyy"
  );
  const endDate = format(
    new Date(item?.rangeDates?.[0]?.endDate),
    "MM/dd/yyyy"
  );
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  const todayDays = Math.round(
    Math.abs((new Date(startDate) - new Date(endDate)) / oneDay) + 1
  );
  const totalAmt =
    todayDays === 0 ? item?.car.price : item?.car.price * todayDays;
  const payload = {
    amount: totalAmt * 100,
  };
  let config = {
    // replace this key with yours
    publicKey: process.env.REACT_APP_PUBLIC_KEY,
    productIdentity: item?.car._id,
    productName: item?.car.name,
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        let data = {
          token: payload.token,
          car: item?.car.name,
          car_id: item?.car._id,
          amount: payload.amount,
        };
        let config = {
          headers: {
            Authorization:
              process.env.REACT_APP_SECRET_KEY,
          },
        };

        axios
          .post("/api/v1/payment/verify/", data, config)
          .then((response) => {
            if (response.data.success) {
              const orderData = {
                car: data.car_id,
                from: startDate,
                to: endDate,
                status: "paid",
                price: totalAmt,
                paymentInfo: {
                  id: data.token,
                  status: "succeeded",
                },
              };
              createOrder(orderData);
              toast.success("booked successfully");
              history("../mybooking", { replace: true });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
  let checkout = new KhaltiCheckout(config);

  return (
    <BookingDiv>
      <StyledTable>
        <thead>
          <tr>
            <th>Name</th>
            <td className="__td_name">
              <img src={item?.car?.images?.[0]?.url} alt="" width={50} />
              {item?.car.name}
            </td>
          </tr>
          <tr>
            <th>Model</th>
            <td>{item?.car.model}</td>
          </tr>
          <tr>
            <th>Year</th>
            <td>{item?.car.year}</td>
          </tr>
          <tr>
            <th>Price per day</th>
            <td>{item?.car.price}</td>
          </tr>

          <tr>
            <th>From</th>
            <td>{startDate}</td>
          </tr>
          <tr>
            <th>To</th>
            <td>{endDate}</td>
          </tr>
          <tr>
            <th>Days</th>
            <td>{todayDays}</td>
          </tr>
          <tr>
            <th>Total price</th>
            <td>Rs. {totalAmt}</td>
          </tr>
        </thead>
      </StyledTable>
      <button
        className="__book_btn"
        onClick={() => {
          checkout.show(payload);
        }}
      >
        Book now
      </button>
    </BookingDiv>
  );
};

const mapStateToProps = ({
  userState: { user },
  newOrder: { loading, error, order },
}) => ({
  user,
  loading,
  error,
  order,
});

const mapDispatchToProps = {
  createOrder,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Booking);
