import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getAdminCars, clearError } from "../../../redux/actions/carActions"

const Cars = ({ getAdminCars, clearError, loading, error, cars }) => {

      useEffect(() => {
            if (error) {
                  // alert.error(error);
                  clearError()
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
      return (
            <div>
                  <p>Cars</p>
                  <Link to="/admin/car/add" >
                        Add Car
                  </Link>
                  <div>
                        <table>
                              <thead>
                                    <tr>
                                          <th>Name</th>
                                          <th>Model</th>
                                          <th>Year</th>
                                          <th>Price</th>



                                    </tr>
                              </thead>
                              <tbody>
                                    {cars && cars?.map(car => (
                                          <tr key={car.id}>
                                                <td>
                                                      <img src={car?.images?.[0]?.url} alt="" />
                                                      {car.name}</td>
                                                <td>{car.model}</td>
                                                <td>{car.year}</td>
                                                <td>{car.price}</td>


                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  </div>
            </div>
      )
}
const mapStateToProps = ({
      carsState: { loading, error, cars }

}) => ({
      loading, error, cars
});

const mapDispatchToProps = {
      getAdminCars,
      clearError
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Cars);