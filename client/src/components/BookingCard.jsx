const BookingCard = ({
  bookingId,
  username,
  car,
  carImage,
  duration,
  amount,
  status,
  paymentMethod,
  onRemove,
}) => {
  return (
    <div className="card booking-card shadow-sm border-0">
      <div className="car-image-container">
        <img src={carImage} alt={car} className="car-image" />

        <span
          className={`booking-status ${
            status === "Completed"
              ? "status-completed"
              : status === "Pending"
              ? "status-pending"
              : "status-cancelled"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">{car}</h5>

          <span className="booking-id">
            Booking ID #{bookingId}
          </span>
        </div>

        <div className="row">
          <div className="col-6 mb-3">
            <small className="text-muted d-block">Customer</small>
            <strong>{username}</strong>
          </div>

          <div className="col-6 mb-3">
            <small className="text-muted d-block">Duration</small>
            <strong>{duration}</strong>
          </div>

          <div className="col-6">
            <small className="text-muted d-block">Amount</small>
            <strong className="text-primary">
              ₹{amount.toLocaleString()}
            </strong>
          </div>

          <div className="col-6">
            <small className="text-muted d-block">Payment</small>

            <span
              className={`payment-badge ${
                paymentMethod === "Cash"
                  ? "payment-cash"
                  : "payment-online"
              }`}
            >
              {paymentMethod}
            </span>
          </div>
        </div>

        {/* REMOVE BUTTON */}
       <div className="remove-icon" onClick={() => onRemove(bookingId)}>
  <i class="bi bi-trash3"></i>
</div>
      </div>
<style>
    {`
    
    /* Card must be relative */
.booking-card {
  position: relative;
}

/* Top-left remove icon */
.remove-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 28px;
  height: 28px;
  background: rgba(220, 53, 69, 0.9);
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: 0.2s ease;
}

/* Hover effect */
.remove-icon:hover {
  background: #dc3545;
  transform: scale(1.1);
}
    
    /* ===== Container spacing ===== */
.container {
  max-width: 1100px;
}

/* ===== Booking Card ===== */
.booking-card {
  border-radius: 18px;
  overflow: hidden;
  border: none;
  background: #ffffff;
  transition: all 0.25s ease-in-out;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.booking-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

/* ===== Car Image ===== */
.car-image-container {
  position: relative;
}

.car-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

/* ===== Status Badge ===== */
.booking-status {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.status-completed {
  background: #28a745;
}

.status-pending {
  background: #ffc107;
  color: #000;
}

.status-cancelled {
  background: #dc3545;
}

/* ===== Booking ID ===== */
.booking-id {
  font-size: 13px;
  color: #6c757d;
}

/* ===== Text styles ===== */
.card-body h5 {
  font-size: 18px;
  margin-bottom: 0;
}

.card-body small {
  font-size: 12px;
}

.card-body strong {
  font-size: 14px;
}

/* ===== Payment Badge ===== */
.payment-badge {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.payment-cash {
  background: #fff3cd;
  color: #856404;
}

.payment-online {
  background: #d4edda;
  color: #155724;
}

/* ===== Remove Button ===== */
.btn-danger {
  border-radius: 10px;
  font-size: 14px;
  padding: 8px;
}

/* ===== Grid spacing ===== */
.row {
  margin-top: 10px;
}

/* ===========================
   📱 MOBILE VIEW
=========================== */
@media (max-width: 576px) {
  .car-image {
    height: 180px;
  }

  .card-body {
    padding: 12px;
  }

  .booking-card {
    border-radius: 14px;
  }

  .card-body h5 {
    font-size: 16px;
  }

  .btn-danger {
    font-size: 13px;
  }
}

.btn-danger {
  transition: all 0.2s ease;
}

.btn-danger:hover {
  transform: scale(1.03);
}

/* ===========================
   💻 TABLET / DESKTOP
=========================== */
@media (min-width: 768px) {
  .car-image {
    height: 260px;
  }

  .booking-card {
    max-width: 100%;
  }
}

/* ===========================
   LARGE SCREEN
=========================== */
@media (min-width: 1200px) {
  .car-image {
    height: 280px;
  }
}`}
</style>

    </div>
  );
};

export default BookingCard;