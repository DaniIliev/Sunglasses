import {Routes, Route} from 'react-router-dom'
import './App.css'
import NavBar from './components/Navbar/NavBar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Sunglasses from './components/Sunglasses/Sunglasses'
import Details from './components/Details/Details'
import Cart from './components/Cart/Cart'
import LoveCartList from './components/LoveCarts/LoveCartList'
import Create from './components/AdminOnly/Create/Create'
import {UserProvider} from './context/UserContext'
import DeliveryFormPage from './components/DeliveryForm/DeliveryForm'
import UserOrders from './components/UserOrders/UserOrders'
import UserAccess from './components/UserAccess/UserAccess'
import AuthGuard from './guards/AuthGuard'
import GuestGuard from './guards/GuestGuard'
import AdminGuard from './guards/AdminGuard'
import { ToastContainer } from "react-toastify";
import { SunglassesProvider } from './context/SunglassesContext'
import Edit from './components/AdminOnly/Edit'
import OrdersList from './components/AdminOnly/OrderList'

function App() {

  return (
    <>
    <UserProvider className="main">
      <SunglassesProvider>
        <ToastContainer /> 
        {/* <NavbarProvider> */}
          <NavBar /> 
            <Routes>
              <Route path='/' element={<Home />}/> 
              <Route element={<AuthGuard/>}>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/delivery' element={<DeliveryFormPage/>}/>
                <Route path='/orders' element={<UserOrders />}/>
              </Route>
              <Route element={<GuestGuard />}>
                <Route path='/user/access' element={<UserAccess/>}/> 
              </Route>
              <Route element={<AdminGuard />}>
                <Route path='/create' element={<Create/>}/>
                <Route path='/edit/:id' element={<Edit />}/>
                <Route path='/ordersList' element={<OrdersList/>}/>
              </Route>
              <Route path='/sunglasses' element={<Sunglasses />}/>
              <Route path = '/sunglasses/:id' element={<Details/>}/>
              <Route path='/wishlist' element={<LoveCartList />} />
            </Routes>
            <Footer />
        {/* </NavbarProvider>   */}
      </SunglassesProvider>
    </UserProvider>

    </>

  )
}

export default App
