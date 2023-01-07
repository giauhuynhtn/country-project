import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Country from './pages/Country'
import Home from './pages/Home'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info/:id" element={<Country />} />
    </Routes>
  )
}

export default AppRoutes
