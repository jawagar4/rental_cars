import { useState } from "react";
import BookingCard from "../components/BookingCard";
import { assets } from "../assets/assets";

function BookingList() {
  const [bookings, setBookings] = useState([
    {
      bookingId: "BK001",
      username: "Arun Kumar",
      car: "Hyundai Creta",
      carImage:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200",
      duration: "3 Days",
      amount: 4500,
      status: "Completed",
      paymentMethod: "Pay",
    },
    {
      bookingId: "BK002",
      username: "Vijay",
      car: "Toyota Innova",
      carImage:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
      duration: "1 Day",
      amount: 2500,
      status: "Pending",
      paymentMethod: "Cash",
    },
  ]);

  const removeBooking = (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this booking?"
    );

    if (confirmDelete) {
      setBookings((prev) =>
        prev.filter((booking) => booking.bookingId !== bookingId)
      );
    }
  };

  return (
    <div className="container py-4">
      {bookings.length === 0 ? (
        <div className="text-center py-5">
          <img
            src={assets.bookingbg}
            alt="No Bookings"
            style={{ width: "120px", opacity: 0.7 }}
          />
          <h5 className="mt-3">No Bookings Found</h5>
          <p className="text-muted">
            You don't have any bookings at the moment.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {bookings.map((booking) => (
            <div
              className="col-12 col-md-6"
              key={booking.bookingId}
            >
              <BookingCard
                {...booking}
                onRemove={removeBooking}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingList;