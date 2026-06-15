import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AuthMenu() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  const user = { name: "John Doe", email: "john.doe@example.com" };

  if (!loggedIn) {
    return (
      <button className="btn btn-primary" onClick={() => setLoggedIn(true)}>
        Login
      </button>
    );
  }

  return (
    <div className="position-relative" style={{ maxWidth: 320 }}>
      <button
        className="btn btn-light d-flex align-items-center gap-2 w-100"
        onClick={() => setOpen(!open)}
      >
        <span
          className="rounded-circle bg-info-subtle text-info d-flex align-items-center justify-content-center"
          style={{ width: 36, height: 36, fontWeight: 500 }}
        >
          JD
        </span>
        <span className="text-start flex-grow-1">
          <span className="d-block fw-medium">{user.name}</span>
          <span className="d-block small text-secondary">{user.email}</span>
        </span>
        <i className="ti ti-chevron-down" />
      </button>

      {open && (
        <div className="dropdown-menu show w-100 mt-1 p-1">
          <button className="dropdown-item d-flex align-items-center gap-2">
            <i className="ti ti-shopping-cart" /> Booking cart
          </button>
          <button className="dropdown-item d-flex align-items-center gap-2">
            <i className="ti ti-lock" /> Change password
          </button>
          <button
            className="dropdown-item d-flex align-items-center gap-2 text-danger"
            onClick={() => { setLoggedIn(false); setOpen(false); }}
          >
            <i className="ti ti-logout" /> Log out
          </button>
        </div>
      )}
    </div>
  );
}