import * as actionType from "../constants/messageConstants";

export const messageReducer = (state = { messages: [], message: {} }, action) => {
      switch (action.type) {
            case actionType.NEW_MESSAGE_REQUEST:
            case actionType.ALL_MESSAGE_REQUEST:

                  return {
                        ...state,
                        loading: true
                  }
            case actionType.NEW_MESSAGE_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        success: action.payload.success,
                  }
            case actionType.ALL_MESSAGE_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        messages: action.payload.contacts
                  }


            case actionType.NEW_MESSAGE_FAIL:
            case actionType.ALL_MESSAGE_FAIL:

                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case actionType.NEW_MESSAGE_RESET:

                  return {
                        ...state,
                        isDeleted: false,
                        success: null,
                        message: null
                  }
            case actionType.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  };


            default:
                  return state;
      }
}
