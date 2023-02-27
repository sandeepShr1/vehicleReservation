import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styled from "styled-components";
import backgroundImage from "../../assets/Background.jpg";
import { clearError, getCar } from "../../redux/actions/carActions";
import { connect } from "react-redux";
import CarCard from "../../components/carCard/CarCard";
import Loading from "../../components/Loading/index";
import toast from "react-hot-toast";
import bgImg from "../../assets/bg.jpg";
import Footer from "../../components/Footer/Footer";

const HomePage = styled.div`
  max-width: 1440px;
  .__home_page {
    width: 100%;
    .__banner {
      position: relative;
      img {
        width: 100%;
      }
      .__banner_text {
        width: 30%;
        position: absolute;
        top: 25%;
        left: 30%;
        transform: translate(-50%, 0%);
        display: flex;
        flex-direction: column;
        gap: 2rem;
        @media (max-width: 426px) {
          width: 40%;
          top: 6%;
        }

        span {
          color: #ffffff;
          :first-child {
            font-family: "Inter";
            font-style: normal;
            font-weight: 700;
            font-size: 5rem;
          }
          :nth-child(2) {
            font-family: "Inter";
            font-style: normal;
            font-weight: 700;
            font-size: 2.2rem;
          }
        }
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          width: 18rem;
          height: 5.6rem;
          background: #ed143d;
          border-radius: 8px;
          border: none;
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-size: 1.6rem;
          color: #ffffff;
          cursor: pointer;
          :hover {
            background: #aa4759;
          }
        }
      }
    }
    > p {
      margin: 2rem 0;
      text-align: center;
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 5rem;
      color: #ed143d;
    }
    .__feature_cars {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 3rem;
      margin: 1rem 0;
      width: 100%;
    }
    .__why_us {
      margin-top: 2rem;
      background-image: url(${(props) => props.bgImg});
      width: 100%;
      height: min-content;
      & p {
        padding-top: 4rem;
        text-align: center;
        font-family: "Poppins";
        font-style: normal;
        font-weight: 600;
        font-size: 5rem;
        color: #ed143d;
      }
      .__features {
        margin: 2.5rem 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-family: "Poppins";
        font-style: normal;
        font-weight: 600;
        font-size: 2rem;
        color: #ffffff;
        @media (max-width: 426px) {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 2rem;
        }
      }
      .__paragraph {
        margin-top: 5rem;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          width: 80%;
          font-family: "Poppins";
          font-style: normal;
          font-weight: 400;
          font-size: 1.8rem;
          line-height: 41px;
          text-align: center;
        }
      }
    }
    
  }
`;

const Index = ({
  user,
  isAuthenticated,
  logout,
  loading,
  cars,
  error,
  getCar,
  isError,
}) => {
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }

    getCar();
  }, [error, toast]);
  if (loading) {
    <Loading />;
  }
  return (
    <HomePage bgImg={bgImg}>
      <Navbar user={user} isAuthenticated={isAuthenticated} logout={logout} />
      <div className="__home_page">
        <div className="__banner">
          <img src={backgroundImage} alt="" />
          <div className="__banner_text">
            <span>Find your drive</span>
            <span>Explore the Nepal's largest car sharing marketplace</span>
            <a href="#cars">Book Now</a>
          </div>
        </div>
        <p>Get a ride from here</p>
        <div className="__feature_cars" id="cars">
          {cars ? (
            cars?.map((car) => <CarCard car={car} key={car._id} />)
          ) : (
            <Loading />
          )}
        </div>
        <div className="__why_us">
          <p>Why our products?</p>
          <div className="__features">
            <ul>
              <li>Easy and quick</li>
              <li>All Nepal Permits</li>
              <li>Limited Liability</li>
            </ul>
            <ul>
              <li>Clean & Well-Maintained Fleet</li>
              <li>Unlimited Kilometers </li>
              <li>Driver Facility</li>
            </ul>
            <ul>
              <li>Unlimited Kilometers</li>
              <li> Driver Facility</li>
              <li>Privacy & Freedom</li>
            </ul>
          </div>
          <div className="__paragraph">
            <span>
              Our services are affordable, convenient, and safe You can rent a
              car from Self Drive Nepal at any time convenient to you, and it'll
              be delivered to your doorstep. In addition to offering an hourly
              rate or daily rate according to the package you select, Self Drive
              Nepal offers flexible car rental services. Using our Smart App or
              website, you can rent a car monthly, get unlimited kilometres, or
              even purchase a package for your trip. Our fleet of cars is
              insured, so while you're cruising down open roads, you'll be safe
              and sound Our services are affordable, convenient, and safe You
              can rent a car from Self Drive Nepal at any time convenient to
              you, and it'll be delivered to your doorstep. In addition to
              offering an hourly rate or daily rate according to the package you
              select, Self Drive Nepal offers flexible car rental services.
              Using our Smart App or website, you can rent a car monthly, get
              unlimited kilometres, or even purchase a package for your trip.
              Our fleet of cars is insured, so while you're cruising down open
              roads, you'll be safe and sound
            </span>
          </div>
        </div>
        <Footer />
      </div>
    </HomePage>
  );
};

const mapStateToProps = ({ carsState: { loading, cars, error, isError } }) => ({
  loading,
  cars,
  error,
  isError,
});

const mapDispatchToProps = {
  getCar,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Index);
