import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import NavBar from './components/Navbar/NavBar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Sunglasses from './components/Sunglasses/Sunglasses'
import Login from './components/Login/Login'
import Details from './components/Details/Details'
import Cart from './components/Cart/Cart'
import Register from './components/Register/Register'
import LoveCartList from './components/LoveCarts/LoveCartList'
function App() {

  return (
    <>
    <div className="main">
      <NavBar /> 
        <Routes>
          <Route path='/' element={<Home />}/> 
          <Route path='/sunglasses' element={<Sunglasses />}/>
          <Route path='/user-login' element={<Login/>}/> 
          <Route path='/user-register' element={<Register/>}/>
          <Route path = '/sunglasses/:id' element={<Details/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/wishlist' element={<LoveCartList />} />
        </Routes>
        <Footer />  
    </div>
    </>

  )
}

export default App
