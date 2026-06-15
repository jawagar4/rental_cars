import React from "react";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { CarContext} from '../Context/CarContext'
import Loading from "../Loading/Loading";
import Footer from "../components/Footer";

function Service() {

  const { loading, setLoading,} = useContext(CarContext);

  
  if (loading) {
    return <Loading />;
  }

  const services = [
    {
      icon: <i className="bi bi-car-front-fill"></i>,
      title: "Daily Car Rental",
      desc: "Affordable daily rental plans for your travel needs.",
      cardClass: "card-1",
    },
    {
      icon: "✈️",
      title: "Airport Transfer",
      desc: "Easy airport pickup and drop-off services.",
      cardClass: "card-2",
    },
    {
      icon: "💼",
      title: "Business Travel",
      desc: "Premium vehicles for corporate travel and meetings.",
      cardClass: "card-3",
    },
    {
      icon: <i className="bi bi-box2-heart-fill"></i>,
      title: "Travel Packages",
      desc: "Customized travel packages for family and group trips.",
      cardClass: "card-4",
    },
    {
      icon: <i className="bi bi-arrow-through-heart-fill"></i>,
      title: "Wedding Cars",
      desc: "Luxury cars for weddings and special occasions.",
      cardClass: "card-5",
    },
    {
      icon: "24/7",
      title: "Customer Support",
      desc: "Round-the-clock assistance for all your rental needs.",
      cardClass: "card-6",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="container py-5 mt-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Services</h2>
          <p className="text-muted">
            We provide reliable and affordable car rental solutions for every
            journey.
          </p>
        </div>

        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-4" key={index}>
              <div
                className={`card service-card ${service.cardClass} p-4 text-center shadow h-100`}
              >
                <div className="service-icon mb-3">{service.icon}</div>
                <h4>{service.title}</h4>
                <p>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Service;