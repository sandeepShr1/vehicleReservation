import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { login } from '../../redux/auth/authSlice';
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./style.css";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri"


const Login = ({ login, loading, isAuth, user, error }) => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const history = useNavigate();
      const location = useLocation();
      const from = location.state?.from?.pathname || "/";


      const handleLogin = (e) => {
            e.preventDefault();
            login({ email, password });
      }
      useEffect(() => {
            // if (error) {
            //       alert(error);
            // }
            if (isAuth) {
                  history(from, { replace: true });
            }
      }, [error, isAuth, from])
      if (loading) {
            return <>loading</>
      }
      return (
            <div className='__login'>
                  <form action="" className='__login__form'>
                        <p>Login</p>
                        <span>
                              <HiOutlineMail size={20} />
                              <input type="text" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                        </span>
                        <span>
                              <RiLockPasswordLine size={20} />
                              <input type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                        </span>
                        <button className='loginBtn' onClick={handleLogin}>Login</button>
                        <Link to="/register">Don't have an account?</Link>
                  </form>
            </div>
      )
}
const mapStateToProps = ({
      authState: { user: { loading, isAuth, user, error } },
}) => ({
      loading, isAuth, user, error
});

const mapDispatchToProps = {
      login
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Login);
