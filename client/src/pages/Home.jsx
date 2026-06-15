import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import BookingForm from '../components/BookingForm'
import Loading from '../Loading/Loading'
import { useContext } from "react";
import { CarContext} from '../Context/CarContext'

const Home = () => {
  const { loading, setLoading,} = useContext(CarContext);
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      
      <Hero />
      <BookingForm/>
      <Footer />
    </div>
  )
}

export default Home
