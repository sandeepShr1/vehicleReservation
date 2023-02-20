import React from 'react'
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';

const Profile = ({ logout, loading, isAuth, error }) => {
      if (loading) {
            return <></>
      }
      return (
            <div>

                  {isAuth ? <button onClick={logout}>Logout</button> : ""}
            </div>
      )
}

const mapStateToProps = ({
      authState: { user: { loading, isAuth, error } },
}) => ({
      loading, isAuth, error
});

const mapDispatchToProps = {
      logout
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Profile);