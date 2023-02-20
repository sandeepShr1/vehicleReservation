import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { register } from '../../redux/auth/authSlice';
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./style.css";
import profileDefault from "../../assets/profile.jpg";
import { MdDriveFileRenameOutline, MdLock, MdOutlineMail } from "react-icons/md"

const Register = ({ register, loading, isAuth, error }) => {

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
            register(myForm)
      }


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
            // if (error) {
            //       alert(error);
            // }
            if (isAuth) {
                  history(from, { replace: true });
            }
      }, [error, isAuth])
      if (loading) {
            return <>loading</>
      }
      return (
            <div className='__register'>
                  <form
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                        className="__register__form"
                  >
                        <p>Register</p>
                        <span>
                              <MdDriveFileRenameOutline size={20} />
                              <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                              />
                        </span>
                        <span>
                              <MdOutlineMail size={20} />
                              <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={registerDataChange}
                              />
                        </span>
                        <span>
                              <MdLock size={20} />
                              <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                              />
                        </span>

                        <div id="registerImage">
                              <img src={avatarPreview} alt="Avatar Preview" width={20} />
                              <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                              />
                        </div>
                        <input type="submit" value="Register" className="signUpBtn" />
                        <Link to="/login">Already have an account?</Link>

                  </form>
            </div>
      )
}
const mapStateToProps = ({
      authState: { user: { loading, isAuth, error } },
}) => ({
      loading, isAuth, error
});

const mapDispatchToProps = {
      register
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Register);
