import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getCarDetails } from "../../redux/actions/carActions";
import Loading from "../Loading/index";
import styled from "styled-components";
import DateRangeComp from "../DateRange/DateRangeComp";
import format from "date-fns/format";

const CarDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  margin: 3rem 0;
  .__t1 {
    font-weight: 600;
    font-size: 5.4rem;
    color: #000000;
  }
  .__t2 {
    font-weight: 400;
    font-size: 2.8rem;
    color: #ed143d;
  }
  .__car_details {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    .__car_image {
      width: 60rem;
      img {
        width: 100%;
        border-radius: 8px;
        object-fit: cover;
      }
    }
    .__details {
      background: rgba(208, 208, 208, 0.49);
      border-radius: 1rem;
      display: flex;
      justify-content: space-around;
      ul {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 2rem 0;
        :first-child {
          li {
            list-style: none;
            font-weight: 400;
            font-size: 2.4rem;
            color: #ed143d;
          }
        }
        :last-child {
          li {
            list-style: none;
            font-weight: 400;
            font-size: 2.4rem;
            color: #1e1e1e;
          }
        }
      }
    }
  }
  .__book {
    .__book_btn {
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
  }
`;

const CarDetails = ({ getCarDetails, car, loading, error }) => {
  const [rangeDates, setRangeDates] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getCarDetails(id);
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <CarDetail>
      <p className="__t1">Great Choice</p>
      <p className="__t2">Explore all over Nepal</p>
      <div className="__car_details">
        <div className="__car_image">
          <img src={car?.images?.[0]?.url} alt="" />
        </div>
        <div className="__details">
          <ul>
            <li>Vehicle Name</li>
            <li>Model</li>
            <li>Year</li>
            <li>Seats</li>
            <li>Rate</li>
          </ul>
          <ul>
            <li>{car?.name}</li>
            <li>{car?.model}</li>
            <li>{car?.year}</li>
            <li>-</li>
            <li>Rs. {car?.price} per day</li>
          </ul>
        </div>
        <div className="__book">
          <DateRangeComp setRangeDates={setRangeDates} />
          {JSON.stringify(
            rangeDates?.map((r) => ({
              startDate: format(r.startDate, "MM/dd/yyyy"),
              endDate: format(r.endDate, "MM/dd/yyyy"),
            }))
          )}
          <button className="__book_btn">Book Now</button>
        </div>
      </div>
    </CarDetail>
  );
};
const mapStateToProps = ({ carDetails: { loading, car, error } }) => ({
  loading,
  car,
  error,
});

const mapDispatchToProps = {
  getCarDetails,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CarDetails);
