import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import './App.css'
import Service from './pages/Service'
import CarList from './components/Cars/CarList'
import CarSection from './components/Cars/CarSection'
import Loading from './Loading/Loading'
import { useContext } from "react";
import { CarContext} from './Context/CarContext'
import BookingChart from './components/BookingAnalytics/BookingChart'

import BookingList from './pages/BookingList'
import Login from './uploads/Login'
import Signup from './uploads/Signup'
import AuthMenu from './pages/AuthMenu'



const App = () => {

  const { loading,} = useContext(CarContext);
if(loading){
 return <Loading />
}

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/about' element={<About />} />
      <Route path='/service' element={<Service />} />
      <Route path='/carslist' element={<CarList />} />
      <Route path='/bookingcart' element={<BookingList />} />
      <Route path='/bookinganalytics' element={<BookingChart/>} />   
      <Route path='/authmenu' element={<AuthMenu />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup/>}/>
    </Routes>
    </>
  )
}

export default App ; 
