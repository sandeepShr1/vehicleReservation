import React from 'react'
import { Link } from 'react-router-dom'

const index = () => {
      return (
            <div style={{ display: "flex", gap: "10px" }}>
                  <Link to="/">Home</Link>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                  <Link to="/admin">Dashboard</Link>
                  <Link to="/profile">Profile</Link>

            </div>
      )
}

export default index