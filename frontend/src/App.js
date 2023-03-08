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
import { loadUser, logout } from "./redux/actions/userActions";
import AdminCars from "./pages/Admin/Car/Cars";
import AddCar from "./pages/Admin/Car/AddCar";
import Admin from "./pages/Admin/Admin";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading/index"
import CarDetails from "./components/CarDetails/CarDetails";
import Cars from "./pages/Cars/Cars";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Booking from "./components/Booking/Booking";
import MyBooking from "./components/Booking/MyBooking";
import AdminBooking from "./pages/Admin/Booking/Booking"
import Users from "./pages/Admin/Users/Users";



function App({ loadUser, loading, isAuthenticated, user, error, logout }) {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  if (loading) {
    return <><Loading /></>
  }
  return (
    <div className="main_container">
      <Toaster toastOptions={{ duration: 3000 }} position="bottom-right" />

      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} logout={logout} />} />
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} user={user} logout={logout} />}>
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Users Routes */}
          <Route element={<RequiredAuth isAuthenticated={isAuthenticated} user={user} role="user" />}>
            <Route path="profile" element={<Profile />} />
            <Route path="booking/new" element={<Booking />} />
            <Route path="mybooking" element={<MyBooking />} />
          </Route>
          {/* admin Routes */}
          <Route element={<RequiredAuth isAuthenticated={isAuthenticated} user={user} role="admin" />}>
            <Route path="admin" element={<Admin />} >
              <Route index element={<Dashboard />} />
              <Route path="cars" element={<AdminCars />} />
              <Route path="car/add" element={<AddCar />} />
              <Route path="car/:id" element={<AddCar />} />
              <Route path="bookings" element={<AdminBooking />} />
              <Route path="user" element={<Users />} />
            </Route>

          </Route>

          {/* not found pages */}
          <Route path="*" element={<PageNotFound />} />
          <Route path="unauthorized" element={<Unauthorized />} />

        </Route>
      </Routes>
    </div>
  );
}

const mapStateToProps = ({
  userState: { loading, isAuthenticated, user, error }

}) => ({
  loading, isAuthenticated, user, error
});

const mapDispatchToProps = {
  loadUser,
  logout
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(App);
