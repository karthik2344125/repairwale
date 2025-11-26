import React from 'react'
import MapView from './components/MapView'
import MechanicList from './components/MechanicList'
import Chat from './components/Chat'
import RequestForm from './components/RequestForm'
import RequestList from './components/RequestList'
import RequestDetails from './components/RequestDetails'
import { IconUser, IconChat, IconMapPin } from './icons'
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

