import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth/authSlice";

export default configureStore({
      reducer: {
            authState: AuthReducer,
      }
})