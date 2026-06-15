import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CarSection   from "./CarSection";
import BookingModal from "./BookingModel";
import { useContext } from "react";
import { CarContext} from '../../Context/CarContext'
import Navbar from "../Navbar";
import Footer from "../Footer";
import Loading from "../../Loading/Loading";

 function CarList() {

   const { cars,  category_badge, loading} = useContext(CarContext);
// 


const AVAIL_LABEL = {
  high: { text: "Available",   color: "#1d9e75" },
  low:  { text: "Last 2 left", color: "#ef9f27" },
  out:  { text: "Unavailable", color: "#e24b4a" },
};


 const SECTION_META = [
  { key: "Economy", icon: "🚗", title: "Economy" },
  { key: "SUV",     icon: "🚙", title: "SUVs"    },
  { key: "Luxury",  icon: "💎", title: "Luxury"  },
  { key: "EV",      icon: "⚡", title: "Electric" },
];

  /* ── State ── */
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCar,  setSelectedCar]  = useState(null);
  const [confirmed,    setConfirmed]    = useState(false);
  const [location,     setLocation]     = useState("Chennai Airport");

  const todayStr  = new Date().toISOString().split("T")[0];
  const returnStr = new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0];
  const [pickupDate, setPickupDate] = useState(todayStr);
  const [returnDate, setReturnDate] = useState(returnStr);

  /* ── Derived values ── */
  const days = Math.max(
    1,
    Math.round((new Date(returnDate) - new Date(pickupDate)) / 86400000)
  );

  const categories   = ["All", "Economy", "SUV", "Luxury", "EV"];
  const filteredCars =
    activeFilter === "All"
      ? cars
      : cars.filter((c) => c.category === activeFilter);

  /* ── Handlers ── */
  const handleBook  = (car) => { setSelectedCar(car); setConfirmed(false); };
  const handleClose = ()    => { setSelectedCar(null); setConfirmed(false); };

  if (loading) {
    return <Loading />;
  }

  /* ── Render ── */
  return (
    <>
      {/* ── Hero ── */}
      <Navbar />
      <header className="rent-hero pt-5 ">
        <div className="container  mt-5">
          <p className="eyebrow mt-3">DriveEasy Rentals</p>
          <h1>Find your perfect ride</h1>
          <p className="sub">
            Flexible pick-up · No hidden fees · Free cancellation
          </p>

          {/* Search bar */}
          <div className="search-bar">
            <div>
              <label>Pick-up location</label>
              <input className=" form-control"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or airport"
              />
            </div>
            <div>
              <label>Pick-up date</label>
              <input
              className=" form-control"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>
            <div>
              <label>Return date</label>
              <input
              className=" form-control"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
            <button className="btn-search form-control ">🔍 Search</button>
          </div>
        </div>
      </header>

      {/* ── Stats bar ── */}
      <div className="stats-bar">
        <div className="container">
          <div className="row text-center g-0">
            {[
              { num: "9+",    lbl: "Cars"       },
              { num: "4",     lbl: "Categories" },
              { num: `${days}d`, lbl: "Selected"  },
              { num: "Free",  lbl: "Cancel"     },
            ].map((s) => (
              <div className="col-3" key={s.lbl}>
                <div className="stat-item">
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-lbl">{s.lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="container py-3">

        {/* Filter pills */}
        <div className="filter-strip">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`fpill${activeFilter === cat ? " active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sectioned layout (All) or single filtered section */}
        {activeFilter === "All" ? (
          SECTION_META.map(({ key, icon, title }) => (
            <CarSection
              key={key}
              title={title}
              icon={icon}
              cars={cars.filter((c) => c.category === key)}
              days={days}
              onBook={handleBook}
            />
          ))
        ) : (
          <CarSection
            title={activeFilter}
            icon=""
            cars={filteredCars}
            days={days}
            onBook={handleBook}
          />
        )}
      </main>

      {/* ── Booking Modal ── */}
      {selectedCar && (
        <BookingModal
          car={selectedCar}
          days={days}
          confirmed={confirmed}
          onClose={handleClose}
          onConfirm={() => setConfirmed(true)}
        />
      )}
      <Footer />
    </>
  );
}

export default CarList ;