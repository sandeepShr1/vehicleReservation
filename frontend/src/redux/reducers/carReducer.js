import * as actionTypes from "../constants/carConstants";



// new car reducer admin
export const newCarReducer = (state = { car: {} }, action) => {
      switch (action.type) {
            case actionTypes.NEW_CAR_REQUEST:
                  return {
                        ...state,
                        loading: true,
                  };
            case actionTypes.NEW_CAR_SUCCESS:
                  return {
                        loading: false,
                        success: action.payload.success,
                        car: action.payload.car,
                  };
            case actionTypes.NEW_CAR_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload,
                  };
            case actionTypes.NEW_CAR_RESET:
                  return {
                        ...state,
                        success: false,
                  };
            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  };
            default:
                  return state;
      }
};

// get cars
export const carsReducer = (state = { cars: [] }, action) => {
      switch (action.type) {
            case actionTypes.ALL_CAR_REQUEST:
            case actionTypes.ADMIN_CAR_REQUEST:
                  return {
                        loading: true,
                        cars: [],
                  }

            case actionTypes.ALL_CAR_SUCCESS:
                  return {
                        loading: false,
                        cars: action.payload.cars,
                        carsCount: action.payload.carsCount,
                        resultPerPage: action.payload.resultPerPage,
                        filteredCarsCount: action.payload.filteredCarsCount,
                        isError: false
                  }
            case actionTypes.ADMIN_CAR_SUCCESS:
                  return {
                        loading: false,
                        cars: action.payload
                  }
            case actionTypes.ALL_CAR_FAIL:
            case actionTypes.ADMIN_CAR_FAIL:
                  return {
                        loading: false,
                        isError: true,
                        error: action.payload,
                  }
            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        isError: false,
                        error: null
                  }

            default:
                  return state;
      }
};

export const carDetailsReducer = (state = { car: {}, similarCars: [] }, action) => {
      switch (action.type) {
            case actionTypes.CAR_DETAILS_REQUEST:
                  return {
                        loading: true,
                        ...state
                  };
            case actionTypes.CAR_DETAILS_SUCCESS:
                  return {
                        loading: false,
                        car: action.payload.car,
                        similarCars: action.payload.similarCars,
                  };
            case actionTypes.CAR_DETAILS_FAIL:
                  return {
                        loading: false,
                        error: action.payload,
                  };

            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  };
            default:
                  return state;
      }
};

// review reducer
export const newReviewReducer = (state = {}, action) => {
      switch (action.type) {
            case actionTypes.NEW_REVIEWS_REQUEST:
                  return {
                        loading: true,
                        ...state
                  };
            case actionTypes.NEW_REVIEWS_SUCCESS:
                  return {
                        loading: false,
                        success: action.payload,
                  };
            case actionTypes.NEW_REVIEWS_FAIL:
                  return {
                        loading: false,
                        error: action.payload,
                  };
            case actionTypes.NEW_REVIEWS_RESET:
                  return {
                        loading: false,
                        success: false,
                  };

            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  };
            default:
                  return state;
      }
};

// Delete car admin

export const carReducer = (state = {}, action) => {
      switch (action.type) {
            case actionTypes.DELETE_CAR_REQUEST:
            case actionTypes.UPDATE_CAR_REQUEST:
                  return {
                        ...state,
                        loading: true,
                  };
            case actionTypes.DELETE_CAR_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isDeleted: action.payload,
                  };

            case actionTypes.UPDATE_CAR_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: action.payload
                  }

            case actionTypes.DELETE_CAR_FAIL:
            case actionTypes.UPDATE_CAR_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload,
                  };
            case actionTypes.DELETE_CAR_RESET:
                  return {
                        ...state,
                        isDeleted: false,
                  };

            case actionTypes.UPDATE_CAR_RESET:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: false
                  }

            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  };
            default:
                  return state;
      }
};

// get Reviews admin
export const reviewsReducer = (state = { reviews: [] }, action) => {
      switch (action.type) {
            case actionTypes.GET_REVIEWS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case actionTypes.GET_REVIEWS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        reviews: action.payload
                  }
            case actionTypes.GET_REVIEWS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }

            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null
                  }

            default:
                  return state;
      }
}

// delete review reducer
export const deleteReviewReducer = (state = {}, action) => {
      switch (action.type) {
            case actionTypes.DELETE_REVIEWS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case actionTypes.DELETE_REVIEWS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isDeleted: action.payload
                  }
            case actionTypes.DELETE_REVIEWS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }

            case actionTypes.DELETE_REVIEWS_RESET:
                  return {
                        ...state,
                        loading: false,
                        isDeleted: false
                  }
            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null
                  }

            default:
                  return state;
      }
}
