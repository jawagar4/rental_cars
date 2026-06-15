import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { CarContext} from '../Context/CarContext'
import Loading from "../Loading/Loading";

function Contact() {

    const { loading, setLoading,} = useContext(CarContext);

    
  if (loading) {
    return <Loading />;
  }

  return (
    <>
    <Navbar />
    <section className="contact-section  py-5">
      <div className="container mt-5">
        <div className="row g-4 align-items-stretch">

          {/* Contact Details */}
          <h2>Contact Us</h2>
          <div className="col-12 col-md-5">
            <div className="contact-info h-100 p-4 shadow">
              <h2>Vendhan</h2>
              <hr />

              <p><strong><i class="bi bi-geo-alt-fill"></i> Address:</strong><br />
                Bhavani, Anthiyur, Erode, Tamil Nadu
              </p>

              <p><strong><i class="bi bi-telephone-inbound-fill"></i> Phone:</strong><br />
                +91 9876543210
              </p>

              <p><strong><i class="bi bi-envelope-fill"></i> Email:</strong><br />
                vendhan@rentalcar.com
              </p>

              <p><strong><i class="bi bi-alarm-fill"></i> Hours:</strong><br />
                Mon - Sun : 7 AM - 11 PM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-12 col-md-7">
            <div className="contact-form p-4">
              <h2>Send Message</h2>

              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name" required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number" required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    rows="5"
                    className="form-control"
                    placeholder="Your Message"
                  ></textarea>
                </div>

                <button className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}

export default Contact;