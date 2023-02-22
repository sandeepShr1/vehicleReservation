import React from 'react'
import { connect } from 'react-redux';
import { logout } from "../../redux/actions/userActions"

const Profile = ({ logout, loading, isAuthenticated, error }) => {
      if (loading) {
            return <></>
      }
      return (
            <div>

                  {isAuthenticated ? <button onClick={logout}>Logout</button> : ""}
            </div>
      )
}

const mapStateToProps = ({
      userState: { loading, isAuthenticated, error }

}) => ({
      loading, isAuthenticated, error
});

const mapDispatchToProps = {
      logout
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Profile);