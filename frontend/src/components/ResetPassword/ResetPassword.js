import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearError, resetPassword } from "../../redux/actions/userActions";
import { toast } from "react-hot-toast";
import Loading from "../Loading/index";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom"

const ResetPasswordDiv = styled.div`
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

const ResetPassword = ({ resetPassword, loading, success, error }) => {
      const { token } = useParams();
      const history = useNavigate();
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");

      const handleSubmit = (e) => {
            e.preventDefault();
            const myForm = new FormData();
            myForm.set("password", password);
            myForm.set("confirmPassword", confirmPassword);

            resetPassword(token, myForm);
      };
      useEffect(() => {
            if (error) {
                  toast.error(error);
                  clearError();
            }
            if (success) {
                  toast.success("Password reset successfully");
                  history("/login");

            }
      }, [toast, error, success]);
      if (loading) {
            return <Loading />;
      }

      return (
            <ResetPasswordDiv>
                  <p className="__title">Reset Password?</p>
                  <form className="__form">
                        <div>
                              <span>Password</span>
                              <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                              />
                        </div>
                        <div>
                              <span>Confirm Password</span>
                              <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                              />
                        </div>
                        <input
                              className="__button"
                              type="button"
                              value="Submit"
                              onClick={handleSubmit}
                        />
                  </form>
            </ResetPasswordDiv>
      );
};

const mapStateToProps = ({ resetPassword: { loading, success, error } }) => ({
      loading,
      success,
      error,
});

const mapDispatchToProps = {
      resetPassword,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ResetPassword);
