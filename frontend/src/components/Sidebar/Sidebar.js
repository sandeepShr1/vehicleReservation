import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
      return (
            <div>
                  <div >
                        <Link to="/admin">Dashboard</Link>
                  </div>
                  <div>
                        <p><Link to="/admin/cars">
                              Cars
                        </Link></p>
                        <p>
                              <Link to="/admin/users">
                                    Users
                              </Link>
                        </p>
                  </div>
            </div>
      )
}

export default Sidebar;