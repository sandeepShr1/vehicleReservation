import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminCars, clearError } from "../../../redux/actions/carActions";
import styled from "styled-components";
import Loading from "../../../components/Loading/index";
import { RiDeleteBin7Fill, RiEdit2Fill } from "react-icons/ri";

const VehicleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  p {
    /* text-align: center; */
    font-weight: 500;
    font-size: 3.6rem;
    color: #ed143d;
  }
  .__table {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    a {
      text-decoration: none;
      padding: 1.5rem 2rem;
      background-color: yellow;
      background: #ed143d;
      border-radius: 9px;
      color: #fff;
      font-weight: 600;
      font-size: 1.6rem;
    }
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

const Cars = ({ getAdminCars, clearError, loading, error, cars }) => {
  useEffect(() => {
    if (error) {
      // alert.error(error);
      clearError();
    }
    // if (deleteError) {
    //       alert.error(deleteError);
    //       dispatch(clearError());
    // }
    // if (isDeleted) {
    //       alert.success("Product Deleted Successfully");
    //       history("/admin/dashboard");
    //       dispatch({ type: DELETE_PRODUCT_RESET });
    // }

    getAdminCars();
  }, [error]);
  if (loading) {
    return <Loading />;
  }
  return (
    <VehicleDiv>
      <p>Vehicles</p>
      <div className="__table">
        <Link to="/admin/car/add">Add Car</Link>
        <StyledTable>
          <thead>
            <tr className="_table_head">
              <th>Name</th>
              <th>Model</th>
              <th>Year</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars &&
              cars?.map((car) => (
                <tr key={car.id}>
                  <td className="__td_name">
                    <img src={car?.images?.[0]?.url} alt="" width={50} />
                    {car.name}
                  </td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>{car.price}</td>
                  <td>
                    <span className="__actions">
                      <RiDeleteBin7Fill size={16} />
                      <RiEdit2Fill size={16} />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </StyledTable>
      </div>
    </VehicleDiv>
  );
};
const mapStateToProps = ({ carsState: { loading, error, cars } }) => ({
  loading,
  error,
  cars,
});

const mapDispatchToProps = {
  getAdminCars,
  clearError,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Cars);
