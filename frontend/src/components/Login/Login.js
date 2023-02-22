import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../../redux/actions/userActions";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import styled from "styled-components";
import img from "../../assets/BG.png";

const LoginDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .__form_login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 90%;
    background-color: #f8fafc;
    .__login_left {
      width: 40%;
      height: 100%;

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
      gap: 15rem;

      .__login_title {
        color: #090914;
        font-size: 5rem;
        font-weight: 600;
        width: fit-content;
        letter-spacing: -2px;
      }
      .__login__form {
        height: 50%;
        width: 70%;
        gap: 3rem;
        display: flex;
        flex-direction: column;
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
          padding: 16px;
          gap: 10px;
          font-size: 1.6rem;
          width: 144px;
          height: 65.64px;
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

const Login = ({ login, loading, isAuthenticated, user, error }) => {
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
    // if (error) {
    //       alert(error);
    // }
    if (isAuthenticated) {
      history(from, { replace: true });
    }
  }, [error, isAuthenticated, from]);
  if (loading) {
    return <>loading</>;
  }
  return (
    <LoginDiv>
      <div className="__form_login">
        <div className="__login_left">
          <img src={img} alt="" />
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
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Login);
