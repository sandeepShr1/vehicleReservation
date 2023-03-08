import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  clearError,
  loadUser,
  updateProfile,
} from "../../redux/actions/userActions";
import styled from "styled-components";
import { FaUserEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";

const ProfileDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .__t2 {
    font-weight: 600;
    font-size: 3.8rem;
    color: #ed143d;
    margin: 2rem 0;
  }
  .__avatar {
    display: flex;
    width: 50%;
    gap: 2rem;
    align-items: center;
    .__img {
      img {
        width: 50%;
        border-radius: 50%;
        border: 5px solid #ecd9d9;
      }
    }
    .__edit {
      width: 10rem;
      height: 5rem;
      gap: 10px;
      border: none;
      background: transparent;
      border-radius: 9px;
      color: #ed143d;
      cursor: pointer;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      :hover {
        color: #000;
      }
      span {
        font-size: 1.8rem;
      }
    }
  }
  .__edit_profile {
    display: ${(props) => (props.isEdit ? "block" : "none")};
    width: 50%;
    .__profile_edit_title {
      font-weight: 400;
      font-size: 1.8rem;
      color: #ed143d;
      margin: 2rem 0;
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
        gap: 0.7rem;
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
        height: 5rem;
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
        width: 12rem;
        height: 5rem;
        border: none;
        background: #ed143d;
        border-radius: 9px;
        color: #f8fafc;
        cursor: pointer;
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
  .__my_details {
    width: 50%;
    .__t3 {
      font-weight: 400;
      font-size: 2.8rem;
      color: #ed143d;
      margin: 2rem 0;
    }
    .__details {
      width: 50%;
      .__detail {
        display: flex;
        align-items: center;
        gap: 3rem;
        span {
          font-weight: 500;
          font-size: 1.8rem;
          margin: 1rem 0;
          color: #ed143d;
          :last-child {
            color: #000;
          }
        }
      }
    }
  }
`;

const Profile = ({
  loadUser,
  loading,
  isAuthenticated,
  error,
  user,
  updateProfile,
  profileLoading,
  updateError,
  isUpdated,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const dispatch = useDispatch();
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    updateProfile(myForm);
  };

  const updateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (updateError) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      toast.success("Profile update successfully");
      loadUser();

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, updateError, toast, user, isUpdated]);
  if (loading) {
    return <></>;
  }
  return (
    <ProfileDiv isEdit={isEdit}>
      <p className="__t2">Profile</p>
      <div className="__avatar">
        <div className="__img">
          <img src={user?.avatar?.url} alt="" />
        </div>
        <button className="__edit" onClick={() => setIsEdit(!isEdit)}>
          <FaUserEdit size={20} />
          <span>Edit</span>
        </button>
      </div>
      <div className="__edit_profile">
        <p className="__profile_edit_title">Edit Your Profile</p>
        <form
          encType="multipart/form-data"
          onSubmit={updateProfileSubmit}
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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div id="registerImage" className="__preview">
            <img src={avatarPreview} alt="Avatar Preview" width={20} />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={updateProfileDataChange}
            />
            <span style={{ color: "tomato", fontSize: "0.5rem" }}></span>
          </div>
          <input type="submit" value="Save" className="__register_btn" />
        </form>
      </div>
      <div className="__my_details">
        <p className="__t3">General</p>
        <div className="__details">
          <div className="__detail">
            <span>Name </span>
            <span>{user?.name}</span>
          </div>
          <div className="__detail">
            <span>Email</span>
            <span>{user?.email}</span>
          </div>
        </div>
      </div>
    </ProfileDiv>
  );
};

const mapStateToProps = ({
  userState: { loading, isAuthenticated, error, user },
  profile: { loading: profileLoading, error: updateError, isUpdated },
}) => ({
  loading,
  isAuthenticated,
  error,
  user,
  profileLoading,
  updateError,
  isUpdated,
});

const mapDispatchToProps = {
  loadUser,
  updateProfile,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Profile);
