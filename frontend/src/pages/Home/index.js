import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

const index = ({ user, isAuthenticated, logout }) => {
      return (
            <>
                  <Navbar user={user} isAuthenticated={isAuthenticated} logout={logout} />
                  <div style={{ display: "flex", gap: "10px" }}>

                        <Link to="/">Home</Link>
                        {!isAuthenticated ? (<><Link to="/login">Login</Link>
                              <Link to="/register">Register</Link></>) : ""}
                        <Link to="/admin">Dashboard</Link>
                        <Link to="/profile">Profile</Link>
                  </div></>
      )
}

export default index