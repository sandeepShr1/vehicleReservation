import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import styled from "styled-components";
import bg from "../../assets/bgg.svg";
import { createMessage, clearError } from "../../redux/actions/messageActions"
import Loading from "../Loading/index"
const ContactDiv = styled.div`
  padding-bottom: 2rem;
  width: 100%;
  height: 90vh;
  background-image: url(${(props) => props.bgImg});
  object-fit: cover;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 426px) {
    flex-direction: column;
  }
  .__left_contact {
    width: 40%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    @media (max-width: 769px) {
      width: 25%;
    }
    @media (max-width: 426px) {
      width: 90%;
    }
    .__git {
      span {
        font-weight: 600;
        font-size: 6rem;
        color: #ffffff;
      }
    }
    .__phone_contact,
    .__email_contact {
      display: flex;
      flex-direction: column;
      span {
        font-weight: 400;
        font-size: 2rem;
        color: #ffffff;

        :first-child {
          font-weight: 600;
          font-size: 3.6rem;
          color: #ffffff;
        }
      }
    }
  }
  .__right_contact {
    width: 40%;
    height: 70%;
    background-color: rgba(208, 208, 208, 0.49);
    border-radius: 10px;
    @media (max-width: 769px) {
      width: 50%;
    }
    @media (max-width: 426px) {
      width: 90%;
    }
    form {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3rem;
      div {
        display: flex;
        justify-content: space-around;
        gap: 1rem;
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          span {
            font-weight: 300;
            font-size: 1.2rem;
            color: #000000;
          }
          input {
            width: 80%;
            height: 50px;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
          }
        }
        textarea {
          width: 80%;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
        }
      }
      button {
        width: 165px;
        height: 70px;
        background: #ed143d;
        border-radius: 9px;
        border: none;
        font-size: 1.4rem;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
        :hover {
          background-color: #aa4759;
        }
      }
    }
  }
`;


const Contact = ({ createMessage, clearError, success, loading, error }) => {
  const [message, setMessage] = useState({
    first_name: "",
    last_name: "",
    phone: null,
    email: "",
    description: ""
  });
  const handleChange = (e) => {
    setMessage(
      (prev) => ({ ...prev, [e.target.name]: e.target.value })
    )
  }
  const onSubmit = (e) => {
    e.preventDefault();
    createMessage(message);

  }
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError()
    }
    if (success) {
      toast.success("Sent Message Successfully");
      // history(from, { replace: true });
    }
  }, [error, success, toast]);
  if (loading) {
    return <><Loading /></>;
  }
  return (
    <ContactDiv bgImg={bg}>
      <div className="__left_contact">
        <div className="__git">
          <span>Get in touch !</span>
        </div>
        <div className="__phone_contact">
          <span>Phone</span>
          <span>Office: +977 9861890000</span>
          <span>Customer support: +977 9861890000</span>
        </div>
        <div className="__email_contact">
          <span>Email</span>
          <span>www.carrental@gmail.com</span>
        </div>
      </div>
      <div className="__right_contact">
        <form action="">
          <div>
            <div>
              <span>First Name</span>
              <input type="text" name="first_name" onChange={handleChange} />
            </div>
            <div>
              <span>Last Name</span>
              <input type="text" name="last_name" onChange={handleChange} />
            </div>
          </div>
          <div>
            <div>
              <span>Phone Number</span>
              <input type="number" name="phone" onChange={handleChange} />
            </div>
            <div>
              <span>Email</span>
              <input type="email" name="email" onChange={handleChange} />
            </div>
          </div>
          <div>
            <textarea name="description" id="" cols="39" rows="5" onChange={handleChange}></textarea>
          </div>
          <button onClick={onSubmit}>Submit</button>
        </form>
      </div>
    </ContactDiv>
  );
};
const mapStateToProps = ({
  messageState: { loading, message, error, success }

}) => ({
  loading, message, error, success
});

const mapDispatchToProps = {
  createMessage, clearError
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Contact);

