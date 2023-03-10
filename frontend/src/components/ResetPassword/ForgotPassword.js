import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearError, forgotPassword } from "../../redux/actions/userActions";
import { toast } from "react-hot-toast";
import Loading from "../Loading/index";
import styled from "styled-components";

const ForgotPasswordDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .__title {
    font-weight: 400;
    font-size: 2.8rem;
    color: #ed143d;
    margin: 2rem 0;
  }
  .__form {
    height: 50%;
    width: 40%;
    gap: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      width: 80%;
      span {
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
    .__button {
      margin-top: 1rem;
      padding: 16px;
      gap: 10px;
      font-size: 1.6rem;
      width: 12rem;
      height: 5rem;
      border: none;
      background: #ed143d;
      border-radius: 9px;
      color: #f8fafc;
      cursor: pointer;
    }
  }
`;

const ForgotPassword = ({ forgotPassword, loading, message, error }) => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    //     const myForm = new FormData();
    //     myForm.set("email", email);
    forgotPassword({ email: email });
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
    if (message) {
      toast.success(message);
    }
  }, [toast, error, message]);
  if (loading) {
    return <Loading />;
  }

  return (
    <ForgotPasswordDiv>
      <p className="__title">Forgot Password?</p>
      <form className="__form">
        <div>
          <span>Please enter email for password reset</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          className="__button"
          type="button"
          value="Submit"
          onClick={handleSubmit}
        />
      </form>
    </ForgotPasswordDiv>
  );
};

const mapStateToProps = ({ forgotPassword: { loading, message, error } }) => ({
  loading,
  message,
  error,
});

const mapDispatchToProps = {
  forgotPassword,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ForgotPassword);
