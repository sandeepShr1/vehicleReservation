import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (loginCred, { rejectWithValue }) => {
      try {
            const url = "api/v1/login";
            const config = { headers: { "Content-Type": "application/json" } }
            const { data } = await axios.post(url, loginCred, config);

            return data;
      } catch (err) {
            if (!err.response) {
                  throw err
            }

            return rejectWithValue(err.response.data)
      }


});

export const register = createAsyncThunk("auth/register", async (loginCred, { rejectWithValue }) => {
      try {
            const url = "api/v1/register";
            const config = { headers: { "Content-Type": "multipart/form-data" } }
            const { data } = await axios.post(url, loginCred, config);

            return data;
      } catch (err) {
            if (!err.response) {
                  throw err
            }

            return rejectWithValue(err.response.data)
      }


});
export const fetchMe = createAsyncThunk("auth/fetchme", async (args, { rejectWithValue }) => {
      try {
            const url = "api/v1/me";
            const config = { headers: { "Content-Type": "application/json" } }
            const { data } = await axios.get(url, config);

            return data;
      } catch (err) {
            if (!err.response) {
                  throw err
            }

            return rejectWithValue(err.response.data)
      }


});
export const logout = createAsyncThunk("auth/logout", async (args, { rejectWithValue }) => {
      try {
            const url = "api/v1/logout";
            const config = { headers: { "Content-Type": "application/json" } }
            const { data } = await axios.get(url, config);

            return data;
      } catch (err) {
            if (!err.response) {
                  throw err
            }

            return rejectWithValue(err.response.data)
      }


});


const loginSlice = createSlice(({
      name: "auth",
      initialState: {
            user: {
                  loading: false,
                  isAuth: false,
                  error: "",
                  user: null
            }
      },
      extraReducers: {
            [register.pending]: (state, action) => {
                  state.user = { loading: true }
            },
            [register.fulfilled]: (state, action) => {
                  state.user = { loading: false, isAuth: true, user: action.payload?.user }
            },
            [register.rejected]: (state, action) => {
                  state.user = { loading: false, isAuth: false, error: action.payload?.message }
            },
            [login.pending]: (state, action) => {
                  state.user = { loading: true }
            },
            [login.fulfilled]: (state, action) => {
                  state.user = { loading: false, isAuth: true, user: action.payload?.user }
            },
            [login.rejected]: (state, action) => {
                  state.user = { loading: false, isAuth: false, error: action.payload?.message }
            }
            , [fetchMe.pending]: (state, action) => {
                  state.user = { loading: true }
            },
            [fetchMe.fulfilled]: (state, action) => {
                  state.user = { loading: false, isAuth: true, user: action.payload?.user }
            },
            [fetchMe.rejected]: (state, action) => {
                  state.user = { loading: false, isAuth: false, error: action.payload?.message }
            },
            [logout.pending]: (state, action) => {
                  state.user = { loading: true }
            },
            [logout.fulfilled]: (state, action) => {
                  state.user = { loading: false, isAuth: false, user: null }
            },
            [logout.rejected]: (state, action) => {
                  state.user = { loading: false, isAuth: false, error: action.payload?.message }
            },

      }
}))
export default loginSlice.reducer;