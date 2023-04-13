import axios from "axios";

import * as actionType from "../constants/messageConstants";

export const createMessage = (messageData) => async (dispatch) => {
      try {
            dispatch({ type: actionType.NEW_MESSAGE_REQUEST });

            const config = { header: { "Content-Type": "multipart/form-data" } };
            const { data } = await axios.post("/api/v1/message/new", messageData, config);

            dispatch({
                  type: actionType.NEW_MESSAGE_SUCCESS,
                  payload: data
            })

      } catch (error) {
            dispatch({
                  type: actionType.NEW_MESSAGE_FAIL,
                  payload: error.response.data.message
            })
      }



}

// get message
export const getMessage = () => async (dispatch) => {
      try {
            dispatch({ type: actionType.ALL_MESSAGE_REQUEST });

            const { data } = await axios.get("/api/v1/admin/message");

            dispatch({
                  type: actionType.ALL_MESSAGE_SUCCESS,
                  payload: data
            })

      } catch (error) {
            dispatch({
                  type: actionType.ALL_MESSAGE_FAIL,
                  payload: error.response.data.message
            })
      }
}


// clearing errors
export const clearError = () => async (dispatch) => {
      dispatch({
            type: actionType.CLEAR_ERRORS
      })
}