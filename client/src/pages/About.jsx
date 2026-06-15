import React from "react";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../Loading/Loading";
import { useContext } from "react";
import { CarContext} from '../Context/CarContext'

function About() {

  const { loading,} = useContext(CarContext);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
    <Navbar />
    <section className="about-section py-5 " id="#about">
      <div className="container mt-5">
        <div className="row align-items-center g-4">
          <h2 className="fw-bold mb-3">About Us</h2>
          {/* Image */}
          <div className="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
              alt="Car Rental"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Content */}
          <div className="col-lg-6">
            
            <p className="text-muted">
              Welcome to <strong>RentalCar</strong>, your trusted partner for
              comfortable, affordable, and reliable car rentals. Whether you're
              planning a business trip, family vacation, or weekend getaway, we
              provide a wide range of vehicles to suit your needs.
            </p>

            <p className="text-muted">
              Our mission is to deliver a seamless car rental experience with
              well-maintained vehicles, transparent pricing, and exceptional
              customer service.
            </p>

            <div className="row mt-4">
              <div className="col-6">
                <h3 className="text-primary">500+</h3>
                <p>Happy Customers</p>
              </div>

              <div className="col-6">
                <h3 className="text-primary">10+</h3>
                <p>5 Seater Cars & 7 Seater Cars</p>
              </div>

              <div className="col-6">
                <h3 className="text-primary">24/7</h3>
                <p>Customer Support</p>
              </div>

              <div className="col-6">
                <h3 className="text-primary">5+</h3>
                <p>Years Experience</p>
              </div>
            </div>

            <button className="btn btn-primary mt-3"  onClick={handleClick}>
              Explore Our Cars
            </button>
          </div>

        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}

export default About;