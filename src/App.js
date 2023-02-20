import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/index";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Profile from "./components/Users/Profile"
import PageNotFound from "./components/PageNotFound/PageNotFound"
import Unauthorized from "./components/Unauthorized/Unauthorized"
import RequiredAuth from "./components/RequiredAuth";
import { connect } from "react-redux";
import { useEffect } from "react";
import { fetchMe } from "./redux/auth/authSlice";
import "./style.css";


function App({ fetchMe, loading, isAuth, user, error }) {
  useEffect(() => {
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  if (loading) {
    return <>Loading</>
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Home />} />

          {/* Users Routes */}
          <Route element={<RequiredAuth isAuth={isAuth} user={user} role="user" />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* admin Routes */}
          <Route element={<RequiredAuth isAuth={isAuth} user={user} role="admin" />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          {/* not found pages */}
          <Route path="*" element={<PageNotFound />} />
          <Route path="unauthorized" element={<Unauthorized />} />

        </Route>
      </Routes>
    </>
  );
}

const mapStateToProps = ({
  authState: { user: { loading, isAuth, user, error } },
}) => ({
  loading, isAuth, user, error
});

const mapDispatchToProps = {
  fetchMe
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(App);
