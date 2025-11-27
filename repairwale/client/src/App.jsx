import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Service from './pages/Service'
import Checkout from './pages/Checkout'
import MapPage from './pages/MapPage'
import UserPage from './pages/UserPage'
import SignIn from './pages/SignIn'
import Layout from './components/Layout'
import './App.css'

export default function App(){
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/service" element={<Service/>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/map" element={<MapPage/>} />
          <Route path="/user" element={<UserPage/>} />
          <Route path="/signin" element={<SignIn/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

