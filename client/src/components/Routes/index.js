import React from 'react'
import { BrowserRouter , Route, Redirect, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import Profile from '../../pages/Profile'
import Trending from '../../pages/Trending'
import App from '../../App'
import Navbar from '../Navbar'

export default function index() {
  return (
    <BrowserRouter>
    <Navbar/>
  <Routes>
    <Route path='/' element={<App/>} />
    <Route path='profile' element={<Profile/>} />
    <Route path='trending' element={<Trending/>} />
  </Routes>
  </BrowserRouter>
  )
}
