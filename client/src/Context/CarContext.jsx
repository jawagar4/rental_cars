import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
//---------------- CARSCARD API----------------------------------------------------
  const [cars, setCars] = useState([
  
  ]);

 useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/carscard"
    );

    setCars(response.data.data); // <-- use the array
    console.log(response.data.data);
  } catch (error) {
    console.error("Error:", error);
  }
};





  const [form, setForm] = useState({
    pickupDate: "",
    returnDate: "",
  });

  const availableCars =
    form.pickupDate && form.returnDate ? cars : [];

  // ----------------------------Carlist--------------------------------------------------
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [seats, setSeats] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
// ----------------------------CARSCARD-------------------------------------
console.log("cars:", cars);
console.log("isArray:", Array.isArray(cars));
  

const filteredCars = Array.isArray(cars)
  ? cars.filter((car) => {
      const matchesSearch = car.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesSeats =
        seats === "" || car.seats === Number(seats);

      return matchesSearch && matchesSeats;
    })
  : [];
const [CategoryBadge, setCategoryBadge] = useState({  Economy: "badge-economy",
  SUV: "badge-suv",
  Luxury: "badge-luxury",
  EV: "badge-ev",})
// ------------------------------CARLIST------------------------------------------------------

  return (
    <CarContext.Provider value={{
      cars, setCars, form, setForm,
      availableCars, loading, setLoading,
       search, setSearch, seats, setSeats, filteredCars
       , CategoryBadge, setCategoryBadge,


    }}>
      {children}
    </CarContext.Provider>
  );
};