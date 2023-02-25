import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { register } from "../../redux/actions/userActions";
import { useNavigate, Link, useLocation } from "react-router-dom";
import profileDefault from "../../assets/profile.jpg";
import styled from "styled-components";
import img from "../../assets/BG (1).png";
import toast from "react-hot-toast";
import Loading from "../Loading/index"

const RegisterDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .__form_register {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 80%;
    background-color: #f8fafc;
    @media (max-width: 426px) {
      width: 90%;
      flex-direction: column;
    }
    .__register_left {
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
    .__register_right {
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
        gap: 4rem;
      }

      .__register_title {
        color: #090914;
        font-size: 4rem;
        font-weight: 600;
        width: fit-content;
        letter-spacing: 1px;
      }
      .__register__form {
        height: 50%;
        width: 70%;
        gap: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        div {
          display: flex;
          flex-direction: column;
          gap: .7rem;
          p {
            font-style: normal;
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
          }
          input {
            width: 100%;
            padding: 1.4rem;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
          }
        }
        .__preview {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          img {
            width: 10%;
            border-radius: 100%;
          }
          input {
            height: 100%;
            display: flex;
            padding: 0%;
            width: 40%;
          }
        }

        #registerImage > input::file-selector-button {
          cursor: pointer;
          width: 100%;
          z-index: 22;
          height: 100%;
          border: none;
          font-size: 1rem;
          /* margin: 3%; */
          font: 400 0.8vmax;
          transition: all 0.5s;
          padding: 0 1vmax;
          color: rgba(0, 0, 0, 0.623);
          background-color: rgb(255, 255, 255);
        }

        #registerImage > input::file-selector-button:hover {
          background-color: rgb(235, 235, 235);
        }
        .__register_btn {
          margin-top: 1rem;
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

const Register = ({ register, loading, isAuthenticated, error }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(profileDefault);
  const [avatarPreview, setAvatarPreview] = useState(profileDefault);
  const { name, email, password } = registerData;

  const history = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    register(myForm);
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isAuthenticated) {
      toast.success("Registered Successfully");
      history(from, { replace: true });
    }
  }, [error, isAuthenticated, toast, history, from]);
  if (loading) {
    return <><Loading /></>;
  }
  return (
    <RegisterDiv>
      <div className="__form_register">
        <div className="__register_left">
          <img src={img} alt="" />
          <div>
            <span>Let’s Get Started</span>
            <span>Explore the Nepal’s Largest Car Sharing Marketplace</span>
          </div>
        </div>
        <div className="__register_right">
          <p className="__register_title">Enter your details</p>
          <form
            encType="multipart/form-data"
            onSubmit={registerSubmit}
            className="__register__form"
            autoComplete="off"
          >
            <div>
              <p>Full name</p>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div>
              <p>Email address</p>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div>
              <p>Password</p>{" "}
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={registerDataChange}
              />
            </div>

            <div id="registerImage" className="__preview">
              <img src={avatarPreview} alt="Avatar Preview" width={20} />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
              <span style={{ color: "tomato", fontSize: "0.5rem" }}>Note: Image is required!</span>
            </div>
            <input type="submit" value="Register" className="__register_btn" />
            <Link to="/login">
              Already have an account? <span>Login</span>
            </Link>
          </form>
        </div>
      </div>
    </RegisterDiv>
  );
};
const mapStateToProps = ({
  userState: { loading, isAuthenticated, error },
}) => ({
  loading,
  isAuthenticated,
  error,
});

const mapDispatchToProps = {
  register,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Register);
