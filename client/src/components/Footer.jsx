import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer text-light pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* Company Info */}
          <div className="col-md-4 mb-4">
            <h4>RentalCar</h4>
            <p>
              Reliable and affordable car rental services for business,
              family trips, and daily travel.
            </p>

            {/* Social Icons */}
            <div className="social-icons mt-3">
              <a href="https://whatsapp.com/" target="_blank" rel="noreferrer">
                <i class="bi bi-whatsapp"></i>
              </a>

              <a href="https://instagram.com/vendhan_rentals_cars?igsh=bWxjM2NzOWpuYXJz" target="_blank" rel="noreferrer">
                <i class="bi bi-instagram"></i>
              </a>

              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <i class="bi bi-facebook"></i>
              </a>


            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li ><Link to='/' className="footer-link" >Home</Link></li>
              <li ><Link to={'/about'} className="footer-link">About</Link></li>
              <li ><Link to={'/carslist'} className="footer-link">Cars</Link></li>
              <li ><Link to={'/contact'} className="footer-link">Contact</Link></li>
              <li ><Link to={'/service'} className="footer-link">Service</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-md-3 mb-4">
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li>Daily Rental</li>
              <li>Airport Transfer</li>
              <li>Business Travel</li>
              <li>Luxury Cars</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h5>Vendhan Car</h5>
            <p><i class="bi bi-envelope-fill"></i> vendhan@rentalcar.com</p>
            <p>
              Location : Erode<br />
              +91 9876543210
            </p>
          </div>
        </div>

        <hr />

        <div className="text-center">
          <p className="mb-0">
            © 2025 Vendhan RentalCar. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;