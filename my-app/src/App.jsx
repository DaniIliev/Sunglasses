import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import NavBar from './components/Navbar/NavBar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Sunglasses from './components/Sunglasses/Sunglasses'
import Login from './components/Login/Login'
import Details from './components/Details/Details'
function App() {

  return (
    <>
    <div className="main">
      <NavBar /> 
        <Routes>
          <Route path='/' element={<Home />}/> 
          <Route path='/sunglasses' element={<Sunglasses />}/>
          <Route path='/user-login' element={<Login/>}/> 
          <Route path = '/sunglasses/:id' element={<Details/>}/>
        </Routes>
        <Footer />  
    </div>
    </>

  )
}

export default App
