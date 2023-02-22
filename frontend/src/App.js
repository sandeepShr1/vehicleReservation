import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/index";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Profile from "./components/Users/Profile"
import PageNotFound from "./components/PageNotFound/PageNotFound"
import Unauthorized from "./components/Unauthorized/Unauthorized"
import RequiredAuth from "./components/RequiredAuth";
import { connect } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/userActions";
import Cars from "./pages/Admin/Car/Cars";
import AddCar from "./pages/Admin/Car/AddCar";
import Admin from "./pages/Admin/Admin";
import "./App.css"


function App({ loadUser, loading, isAuthenticated, user, error }) {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  if (loading) {
    return <>Loading</>
  }
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Layout />}>

          {/* Users Routes */}
          <Route element={<RequiredAuth isAuthenticated={isAuthenticated} user={user} role="user" />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* admin Routes */}
          <Route element={<RequiredAuth isAuthenticated={isAuthenticated} user={user} role="admin" />}>
            <Route path="admin" element={<Admin />} >
              <Route index element={<Dashboard />} />
              <Route path="cars" element={<Cars />} />
              <Route path="car/add" element={<AddCar />} />
            </Route>

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
  userState: { loading, isAuthenticated, user, error }

}) => ({
  loading, isAuthenticated, user, error
});

const mapDispatchToProps = {
  loadUser
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(App);
