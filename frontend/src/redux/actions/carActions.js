import axios from "axios";

import * as actionTypes from "../constants/carConstants";

export const getCar = (keyword = "", currentPage = 1, price = [0, 1000000], category, ratings = 0) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.ALL_CAR_REQUEST });

            let link = `/api/v1/cars?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

            if (category) {
                  link = `/api/v1/cars?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
            }
            const { data } = await axios.get(link);

            dispatch({
                  type: actionTypes.ALL_CAR_SUCCESS,
                  payload: data
            })

      } catch (error) {
            dispatch({
                  type: actionTypes.ALL_CAR_FAIL,
                  payload: error.response.data.message
            })
      }
}

// get cars lists admin
export const getAdminCars = () => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.ADMIN_CAR_REQUEST })
            const { data } = await axios.get('/api/v1/admin/cars');

            dispatch({ type: actionTypes.ADMIN_CAR_SUCCESS, payload: data.cars })
      } catch (error) {
            dispatch({ type: actionTypes.ADMIN_CAR_FAIL, payload: error.response.data.message })
      }
}

// create a car admin

export const createCar = (carData) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.NEW_CAR_REQUEST });

            const config = { headers: { "Content-Type": "multipart/form-data" } };
            const { data } = await axios.post("/api/v1/admin/car/new", carData, config);


            dispatch({
                  type: actionTypes.NEW_CAR_SUCCESS,
                  payload: data
            })

      } catch (error) {
            dispatch({
                  type: actionTypes.NEW_CAR_FAIL,
                  payload: error.response.data.message
            })
      }
}
// Update a car admin

export const updateCar = (id, carData) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.UPDATE_CAR_REQUEST });

            const config = { headers: { "Content-Type": "multipart/form-data" } };
            const { data } = await axios.put(`/api/v1/admin/update/${id}`, carData, config);


            dispatch({
                  type: actionTypes.UPDATE_CAR_SUCCESS,
                  payload: data.success
            });

      } catch (error) {
            dispatch({
                  type: actionTypes.UPDATE_CAR_FAIL,
                  payload: error.response.data.message
            });
      }
}

// Get Cars Details
export const getCarDetails = (id) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.CAR_DETAILS_REQUEST });

            const { data } = await axios.get(`/api/v1/car/${id}`);
            dispatch({
                  type: actionTypes.CAR_DETAILS_SUCCESS,
                  payload: data,
            });
      } catch (error) {
            dispatch({
                  type: actionTypes.CAR_DETAILS_FAIL,
                  payload: error.response.data.message,
            });
      }
};
// Delete Car
export const deleteCar = (id) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.DELETE_CAR_REQUEST });

            const { data } = await axios.delete(`/api/v1/admin/car/${id}`);

            dispatch({
                  type: actionTypes.DELETE_CAR_SUCCESS,
                  payload: data.success,
            });
      } catch (error) {
            dispatch({
                  type: actionTypes.DELETE_CAR_FAIL,
                  payload: error.response.data.message,
            });
      }
};
// Get Cars Details
export const newReview = (reviewData) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.NEW_REVIEWS_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } }
            const { data } = await axios.put("/api/v1/review", reviewData, config);

            dispatch({
                  type: actionTypes.NEW_REVIEWS_SUCCESS,
                  payload: data.success,
            });
      } catch (error) {
            dispatch({
                  type: actionTypes.NEW_REVIEWS_FAIL,
                  payload: error.response.data.message
            });
      }
};

// get reviews admin
export const getAllReviews = (id) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.GET_REVIEWS_REQUEST });

            const { data } = await axios.get(`/api/v1/reviews?id=${id}`)

            dispatch({
                  type: actionTypes.GET_REVIEWS_SUCCESS,
                  payload: data.reviews
            })

      } catch (error) {
            dispatch({
                  type: actionTypes.GET_REVIEWS_FAIL,
                  payload: error.response.data.message
            })
      }
}
// delete reviews admin
export const deleteReview = (reviewId, carId) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.DELETE_REVIEWS_REQUEST });

            const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&carId=${carId}`)

            dispatch({
                  type: actionTypes.DELETE_REVIEWS_SUCCESS,
                  payload: data.success
            })

      } catch (error) {
            dispatch({
                  type: actionTypes.DELETE_REVIEWS_FAIL,
                  payload: error.response.data.message
            })
      }
}

// clearing errors
export const clearError = () => async (dispatch) => {
      dispatch({
            type: actionTypes.CLEAR_ERRORS
      })
}