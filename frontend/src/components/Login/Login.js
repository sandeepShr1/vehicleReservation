import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { clearError, login } from "../../redux/actions/userActions";
import styled from "styled-components";
import img from "../../assets/BG.png";
import toast from "react-hot-toast";
import Loading from "../Loading/index";

const LoginDiv = styled.div`
  width: 100vw !important;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .__form_login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 70%;
    background-color: #f8fafc;
    @media (max-width: 426px) {
      width: 90%;
      flex-direction: column;
    }
    .__login_left {
      width: 40%;
      height: 100%;
      position: relative;
      div {
        width: 70%;
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-50%, 0%);
        display: flex;
        flex-direction: column;
        gap: 2rem;

        span {
          color: white;
          :first-child {
            font-size: 3rem;
            font-weight: 600;
            font-size: 4rem;
          }
          :last-child {
            width: 80%;
            font-style: normal;
            font-weight: 400;
            font-size: 1.6rem;
            color: #cbd5e1;
          }
        }
      }
      @media (max-width: 426px) {
        width: 100%;
        display: none;
      }

      img {
        height: 100%;
        max-width: 111%;
        object-fit: contain;
      }
    }
    .__login_right {
      width: 60%;
      height: 100%;
      display: flex;
      justify-content: center;
      padding-left: 10rem;
      flex-direction: column;
      gap: 10rem;
      @media (max-width: 1025px) {
        gap: 8rem;
      }
      @media (max-width: 769px) {
        gap: 0;
      }
      @media (max-width: 426px) {
        width: 100%;
        height: 100%;
        padding-left: 0rem;
        align-items: center;
      }

      .__login_title {
        color: #090914;
        font-size: 5rem;
        font-weight: 600;
        width: fit-content;
        letter-spacing: 1px;
      }
      .__login__form {
        height: 50%;
        width: 70%;
        gap: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        div {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          p {
            font-style: normal;
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
          }
          input {
            width: 100%;
            padding: 2rem;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
          }
        }
        .__login_btn {
          margin-top: 2rem;
          padding: 1.6rem;
          gap: 1rem;
          font-size: 1.6rem;
          width: 14.4rem;
          height: 6.5rem;
          border: none;
          background: #ed143d;
          border-radius: 9px;
          color: #f8fafc;
        }
        a {
          text-decoration: none;
          font-size: 1.4rem;
          color: #64748b;
          span {
            font-size: 1.4rem;
            color: #ed143d;
          }
        }
      }
    }
  }
`;

const Login = ({
  login,
  loading,
  isAuthenticated,
  user,
  error,
  clearError,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
    if (isAuthenticated) {
      toast.success("Logged in successfully!!");
      history(from, { replace: true });
    }
  }, [error, isAuthenticated, from, error, toast, history, clearError]);
  if (loading) {
    return <Loading />;
  }
  return (
    <LoginDiv>
      <div className="__form_login">
        <div className="__login_left">
          <img src={img} alt="" />
          <div>
            <span>Are you excited for your Trip ?</span>
            <span>Explore the Nepal’s Largest Car Sharing Marketplace</span>
          </div>
        </div>
        <div className="__login_right">
          <p className="__login_title">Welcome Back</p>
          <form action="" className="__login__form">
            <div>
              <p>Email Address</p>
              <input
                type="text"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <p>Password</p>
              <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link to="#" style={{ textAlign: "right" }}>
              <span>Forgot password?</span>
            </Link>
            <button className="__login_btn" onClick={handleLogin}>
              Login
            </button>
            <Link to="/register">
              Don't have an account? <span>Create free account</span>
            </Link>
          </form>
        </div>
      </div>
    </LoginDiv>
  );
};
const mapStateToProps = ({
  userState: { loading, isAuthenticated, user, error },
}) => ({
  loading,
  isAuthenticated,
  user,
  error,
});

const mapDispatchToProps = {
  login,
  clearError,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Login);
