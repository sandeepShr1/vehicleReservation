import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsList } from "react-icons/bs";
import { useState } from "react";

const Nav = styled.nav`
  width: 100%;
  height: 7vh;
  background-color: #d6d6d6;
  display: flex;
  justify-content: space-between;

  @media (max-width: 426px) {
    flex-direction: column;
    height: fit-content;
    z-index: 111;
    padding: 2rem 0;
  }
  .__logo_div {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 426px) {
      justify-content: space-between;
      width: 100%;
      height: 30%;
      padding: 0 3rem;
    }
    a {
      text-decoration: none;
      font-weight: 700;
      font-size: 2.8rem;
      color: #ed143d;
      @media (max-width: 426px) {
        font-size: 5.8rem;
      }
    }
    .__hamburger {
      display: none;
      @media (max-width: 426px) {
        display: block;
      }
    }
  }
  .__inactive_navs {
    display: none;
  }

  .__navs {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    transition: all 0.5s ease !important;
    @media (max-width: 426px) {
      flex-direction: column;
      width: 100%;
      gap: 2rem;
    }
    .__nav_links {
      display: flex;
      gap: 4rem;
      @media (max-width: 426px) {
        flex-direction: column;
        align-items: center;
        gap: 2rem;
      }

      a {
        text-decoration: none;
        font-weight: 500;
        font-size: 1.8rem;
        color: #000000;

        :hover {
          color: #ed143d;
        }
      }
    }
    .__auth_nav_links {
      display: flex;
      gap: 2rem;
      span {
        display: flex;
        gap: 0.4rem;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          object-fit: cover;
        }
        .__user {
          font-weight: 500;
          font-size: 1.8rem;
          color: #ed143d !important;
          text-decoration: none;
        }
      }
      a,
      .__user {
        font-weight: 500;
        font-size: 1.8rem;
        color: #ed143d;
        text-decoration: none;

        :last-child {
          color: #000000;
        }
        :hover {
          color: #ed143d;
        }
      }

      div {
        width: 2px;
        background-color: #000000;
      }
    }
  }
`;

const Navbar = ({ user, isAuthenticated, logout }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <Nav>
      <div className="__logo_div">
        <Link to="/">Logo</Link>
        <div className="__hamburger" onClick={() => setClicked(!clicked)}>
          <BsList size={25} />
        </div>
      </div>
      <div className={clicked ? "__inactive_navs" : " __navs"}>
        <div className="__nav_links">
          <Link to="/">Home</Link>
          {isAuthenticated && user?.role === "admin" && (
            <Link to="/admin">Dashboard</Link>
          )}
          {isAuthenticated && (
            <Link to="/mybooking">Booking</Link>
          )}
          <Link to="/cars">Cars</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="__auth_nav_links">
          {isAuthenticated ? (
            <span>
              {user?.avatar && <img src={user?.avatar.url} alt="" />}
              <Link className="__user" to="/profile">
                {user?.name}
              </Link>
            </span>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <div></div>
          {isAuthenticated ? (
            <Link onClick={logout}>Logout</Link>
          ) : (
            <Link to="/register">Register</Link>
          )}
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
