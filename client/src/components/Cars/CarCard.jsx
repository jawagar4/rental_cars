import { useContext, useState } from "react";
import { CarContext} from '../../Context/CarContext'

export default function CarCard({ car, onBook }) {

  const { CategoryBadge, setCategoryBadge} = useContext(CarContext);

const availabel ={ high: { text: "Available",   color: "#1d9e75" },
  low:  { text: "Last 4 left", color: "#ef9f27" },
  out:  { text: "Unavailable", color: "#e24b4a" },}

 const FUEL_ICON = {
  Petrol:   <i class="bi bi-fuel-pump-fill"></i>,
  Diesel:   <i class="bi bi-fuel-pump-diesel"></i>,
  Electric:<i class="bi bi-ev-front-fill"></i>,
};

  const avail = availabel [car.availability];
  const isUnavailable = car.availability === "out";

  return (
    <div className="col-12 col-sm-6 col-xl-4 mb-3">
      <div
        className={`rental-card card-body h-100${isUnavailable ? " sold-out" : ""}`}
        onClick={() => !isUnavailable && onBook(car)}
      >
        {/* ── Image ── */}
        <div className="rental-card-img-wrap">
          <img
            src={car.image}
            alt={car.name}
            className="rental-card-img"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/500x160/e2e8f0/94a3b8?text=Car";
            }}
          />

          {/* Category badge */}
          <span className={`cat-badge ${CategoryBadge[car.category]}`}>
            {car.category}
          </span>

          {/* Sold-out overlay */}
          {isUnavailable && <div className="sold-overlay">Unavailable</div>}
        </div>

        {/* ── Body ── */}
        <div className="rental-card-body">
          <h5 className="car-name">{car.name}</h5>

          {/* Spec chips */}
          <div className="specs-row">
            <span className="spec"><i class="bi bi-people-fill"></i> {car.seats} seats</span>
            <span className="spec"><i class="bi bi-gear-fill"></i> {car.transmission}</span>
            <span className="spec">
              {FUEL_ICON[car.fuel]} {car.fuel}
            </span>
            <span className="spec"><i class="bi bi-signpost-2-fill"></i> {car.kms}</span>
          </div>

          {/* Footer: price + availability + CTA */}
          <div className="rental-card-footer">
            <div>
              <div className="price-from">from</div>
              <div className="price-amount">
                ₹{car.price.toLocaleString()}
                <span className="price-unit">/day</span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span className="avail-label" style={{ color: avail.color }}>
                <span
                  className="avail-dot"
                  style={{ background: avail.color }}
                />
                {avail.text}
              </span>

              {!isUnavailable && (
                <button
                  className="btn-rent"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBook(car);
                  }}
                >
                  Rent
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}