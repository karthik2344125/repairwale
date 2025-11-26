import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Service from './pages/Service'
import MapPage from './pages/MapPage'
import UserPage from './pages/UserPage'
import Layout from './components/Layout'
import './App.css'

export default function App(){
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/service" element={<Service/>} />
          <Route path="/map" element={<MapPage/>} />
          <Route path="/user" element={<UserPage/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

