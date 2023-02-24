import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  a {
    text-decoration: none;
    .car-card {
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: calc(25% - 10px);
      cursor: pointer;
      transform: scale(1, 1);
      transition: transform 0.5s ease;
      color: #324d67;
      :hover {
        transform: scale(1.1, 1.1);
      }
      .car-image {
        border-radius: 8px;
        background-color: #ebebeb;
        transform: scale(1, 1);
        transition: transform 0.5s ease;
      }
      .car-price {
        font-weight: 800;
        margin-top: 6px;
        color: black;
      }

      .car-name {
        font-weight: 500;
      }

      .car-card > div {
        margin: 0.5vmax;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
`;

const CarCard = ({ car }) => {
  return (
    <Card>
      <Link to={`/car/${car?._id}`}>
        <div className="car-card">
          <img
            src={car?.images[0].url}
            alt={car?.name}
            width={250}
            height={250}
            loading="lazy"
            className="car-image"
          />
          <p className="car-name">{car?.name}</p>
          <p className="car-price">रू {car?.price} per day</p>
        </div>
      </Link>
    </Card>
  );
};

export default CarCard;
