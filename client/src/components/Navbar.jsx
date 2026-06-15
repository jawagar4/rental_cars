import React from "react";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark custom-navbar m-3 shadow border rounded-5 fixed-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          Vendhan
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/carslist">
                Explor Cars
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/service">
                Service
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/bookingcart">
                <i class="bi bi-box-fill "></i>
              </Link>
            </li>

            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              {/* <!-- From Uiverse.io by reglobby -->  */}
              <div
                aria-label="User Login Button"
                role="button"
                class="user-profile"
              >
                <div class="user-profile-inner">
                 <i class="bi bi-person-fill h-2 "></i>
                  <p className="login">Log In</p>
                </div>
              </div>

            </li>
          </ul>
        </div>
        <style>{`
        /* From Uiverse.io by reglobby */ 
.user-profile {
  width: 120px;
  height: 51px;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s ease;
  background: linear-gradient(
    to bottom right,
    #2e8eff 0%,
    rgba(46, 142, 255, 0) 30%
  );
  background-color: rgba(46, 142, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
  .login{
  height: 10px;
  }

.user-profile:hover,
.user-profile:focus {
  background-color: rgba(46, 142, 255, 0.7);
  box-shadow: 0 0 10px rgba(46, 142, 255, 0.5);
  outline: none;
}

.user-profile-inner {
  width: 127px;
  height: 47px;
  border-radius: 13px;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: #fff;
  font-weight: 600;
}

.user-profile-inner svg {
  width: 27px;
  height: 27px;
  fill: #fff;
}
`}</style>
      </div>
    </nav>
  );
}

export default Navbar;