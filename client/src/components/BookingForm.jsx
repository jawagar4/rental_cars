import React, { useState, useContext } from "react";
import { CarContext } from "../Context/CarContext";

function BookingForm() {
  const { cars, form, setForm, availableCars } = useContext(CarContext);

  return (
    <>
    <div className="rcn-hero">
        <h1>Your Journey,<br /><span>Your Car.</span></h1>
        <p>Premium rentals for every road. Pick up anywhere, drop off everywhere.</p>
        <div className="rcn-search-bar">
          <div className="rcn-search-field">
            <label>Pick-up Location</label>
            <input type="text" placeholder="City or airport" />
          </div>
          <div className="rcn-search-field">
            <label>Pick-up Date</label>
            <input type="date" />
          </div>
          <div className="rcn-search-field">
            <label>Return Date</label>
            <input type="date" />
          </div>
          <button className="rcn-search-btn">Search</button>
        </div>
      </div>

      <style>{`.rcn-hero {
          background: linear-gradient(160deg, #1b3a5c 0%, #0d1b2a 60%);
          color: white;
          padding: 64px 24px;
          text-align: center;
        }

        .rcn-hero h1 {
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-bottom: 12px;
        }

        .rcn-hero h1 span {
          color: var(--brand-accent);
        }

        .rcn-hero p {
          color: #9ab4cc;
          font-size: 1.05rem;
          max-width: 480px;
          margin: 0 auto 32px;
          line-height: 1.6;
        }

        .rcn-search-bar {
          background: white;
          border-radius: 12px;
          padding: 18px 24px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          max-width: 700px;
          margin: 0 auto;
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
          align-items: flex-end;
        }

        .rcn-search-field {
          flex: 1;
          min-width: 140px;
        }

        .rcn-search-field label {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #6b7a8d;
          margin-bottom: 5px;
        }

        .rcn-search-field input {
          width: 100%;
          border: 1.5px solid #dde3ea;
          border-radius: 7px;
          padding: 9px 12px;
          font-size: 0.9rem;
          color: #1b3a5c;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
        }

        .rcn-search-field input:focus {
          border-color: var(--brand-accent);
        }

        .rcn-search-btn {
          background: var(--brand-accent);
          color: white;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 10px 26px;
          border: none;
          border-radius: 7px;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }

        .rcn-search-btn:hover {
          background: var(--brand-accent-hover);
        }`}</style>
        </>
  );
}

export default BookingForm;