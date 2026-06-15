import { useContext } from "react";
import { CarContext} from '../../Context/CarContext'

export default function BookingModal({ car, days, confirmed, onClose, onConfirm }) {

  const FUEL_ICON = {
  Petrol:   <i class="bi bi-fuel-pump-fill"></i>,
  Diesel:   <i class="bi bi-fuel-pump-diesel"></i>,
  Electric:<i class="bi bi-ev-front-fill"></i>,
};

  const total = (car.price * days).toLocaleString();

  /* ── Success screen ── */
  if (confirmed) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <div className="confirm-success">
            <div className="check-circle">✓</div>
            <h4>Booking confirmed!</h4>
            <p>
              {car.name} is reserved for {days} day{days > 1 ? "s" : ""}.
              <br />
              Check your email for details.
            </p>
            <button className="btn-confirm w-100" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Booking form ── */
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        {/* Car image */}
        <div className="modal-img-wrap">
          <img
            src={car.image}
            alt={car.name}
            className="modal-img"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/460x190/e2e8f0/94a3b8?text=Car";
            }}
          />
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <h4 className="modal-car-name">{car.name}</h4>
          <p className="modal-car-sub">
            {car.category} · {FUEL_ICON[car.fuel]} {car.fuel} · {car.transmission}
          </p>

          {/* Spec grid */}
          <div className="spec-grid">
            {[
              { label: "Seats",      value: `${car.seats} passengers`       },
              { label: "Mileage",    value: car.kms                          },
              { label: "Price / day",value: `₹${car.price.toLocaleString()}` },
              { label: "Duration",   value: `${days} day${days > 1 ? "s" : ""}` },
            ].map((s) => (
              <div className="spec-tile" key={s.label}>
                <div className="spec-tile-label">{s.label}</div>
                <div className="spec-tile-value">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="total-row">
            <span className="total-label">
              Estimated total ({days} day{days > 1 ? "s" : ""})
            </span>
            <span className="total-value">₹{total}</span>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-confirm" onClick={onConfirm}>
              Confirm booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}