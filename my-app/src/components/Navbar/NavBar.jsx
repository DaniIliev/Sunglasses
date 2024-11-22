import React from 'react'
import SearchBar from '../shared/SearchBar'
import "./NavBar.css"
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EuroIcon from '@mui/icons-material/Euro';
import { MdLocalShipping } from "react-icons/md";
import { BsSunglasses } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { SiAuthy } from "react-icons/si";

const NavBar = () => {
  return (
    <div>
        <div class="moving-label">
            <span>
                <p><EuroIcon/> CASH ON DELIVERY</p> 
                <p><MdLocalShipping/> FREE SHIPPING FROM BGN200.00</p>
                <p><BsSunglasses/> MAGIC MIRROR</p>
                <p><GiReturnArrow/> 30-DAY RETURN</p>
                <p><SiAuthy /> AUTHORIZED RESELLER</p>
            </span>
        </div>
        <div  className='navBarOne'>
            <SearchBar /> 
            <h1>LOGO</h1>
            <div className='aboutUser'>
                <p className='language'><strong>EN</strong></p>
                <PersonIcon className='personIcon'/> 
                <FavoriteIcon className='favoriteIcon'/> 
                <ShoppingCartIcon className='shoppingIcon'/> 
            </div>
        </div>
        <hr />
        <div className='navBarTwo'>
            <nav>
                <a href="">New</a>
                <a href="">Best sellers</a>
                <a href="">Women's</a>
                <a href="">Men's</a>
                <a href="">Unisex</a>
                <a href="">Sale</a>
            </nav>
        </div>
    </div>
  )
}

export default NavBar