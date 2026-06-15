import CarCard from "./CarCard";
import { useContext } from "react";
import { CarContext} from '../../Context/CarContext'

export default function CarSection({ title, icon, cars, days, onBook }) {
  if (!cars.length) return null;

  return (
    <section className="rental-section mb-4">
      {/* Section header */}
      <div className="section-header mb-3">
        {icon && <span className="section-icon">{icon}</span>}
        <h2 className="section-title">{title}</h2>
        <span className="section-count">
          {cars.length} car{cars.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Cards grid */}
      <div className="row">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} days={days} onBook={onBook} />
        ))}
      </div>
    </section>
  );
}