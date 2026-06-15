import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

function Hero() {
  return (
    <section className="hero-section d-flex align-items-center ">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left Content */}
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="hero-title">
              Drive Your Dream Car Today
            </h1>

            <p className="hero-text">
              Affordable and reliable car rentals for business trips,
              vacations, airport transfers, and special occasions.
            </p>

            <div className="mt-4">
              <Link to="/carslist" className="btn btn-primary btn-lg me-3">
                Book Now
              </Link>

              <Link to="/service" className="btn btn-outline-light btn-lg">
                Our Services
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-lg-6 text-center mt-5 mt-lg-0">
            <img
              src={assets.hero}
              alt="Rental Car"
              className="img-fluid hero-car"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;