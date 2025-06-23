import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Orders from '../pages/Orders'
import Success from '../pages/Success'
import OrderStatus from '../pages/OrderStatus'


function Routers() {
  return (
    <Routes>
        
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/success' element={<Success/>}/>
            <Route path='/track-order' element={<OrderStatus/>}/>
        
    </Routes>
  )
}

export default Routers