import React, { useEffect, useState }  from 'react'
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
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
const NavBar = () => {
    const [isMenuMenOpen, setIsMenuMenOpen] = useState(false)

    useEffect(() => {
        setIsMenuMenOpen(false)
    }, [])
  return (
    <div className='navBars'>
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
                <a href="">New <MdOutlineKeyboardArrowDown /></a>
                <a href="">Best sellers <MdOutlineKeyboardArrowDown /></a>
                <a href="">Women's <MdOutlineKeyboardArrowDown /></a>
                <a onClick={() => setIsMenuMenOpen(!isMenuMenOpen)}>Men's <MdOutlineKeyboardArrowDown /></a>
                <a href="">Unisex <MdOutlineKeyboardArrowDown /></a>
                <a href="">Sale <MdOutlineKeyboardArrowDown /></a>
            </nav>
        </div>
        {isMenuMenOpen ? 
            <div className='menuMen'>
                <div className='populer'>
                    <h3>Populer</h3>
                    <ul>
                        <li className='bestseller'>Bestsellers <img src="../../../public/images/bestsellers.png" width={50} height={50} alt="" /></li>
                        <li className='newArrivels'>New arrivels</li>
                        <li className='outlet'>Outlet <img src="../../../public/images/outlet.png" width={30} height={30} alt="" /></li>
                    </ul>
                </div>
                <div className='lensOptions'>
                    <h3>Lens options</h3>
                    <ul>
                        <li>Show all</li>
                        <li><img src="../../../public/images/standartsunlenses.png" alt="" />Standart sun lenses</li>
                        <li><img src="../../../public/images/polarized.png" alt="" />Polarized</li>
                        <li> <img src="../../../public/images/mirrored.png" alt="" />Mirrored</li>
                        <li><img src="../../../public/images/colortransaction.png" alt="" />With a color transition</li>
                        <li><img src="../../../public/images/dioptric.png" alt="" />Diobtric sunglasses</li>
                    </ul>
                </div>
                <div className='frameShape'>
                    <h3>Frame shape</h3>
                    <ul>
                        <li>Show all</li>
                        <li><img src="../../../public/images/round.jpeg" alt="" />Round</li>
                        <li><img src="../../../public/images/squared.jpeg" alt="" />Squared</li>
                        <li><img src="../../../public/images/rechtangular.jpeg" alt="" />Rechtangular</li>
                        <li><img src="../../../public/images/pilotAviator.jpeg" alt="" />Pilot / Aviator</li>
                        <li><img src="../../../public/images/catEye.jpeg" alt="" />Cat eye</li>
                    </ul>
                </div>
                <img className='manWithSunglasses' src="/images/menwithglasses.png" alt="" />
            </div>
            : ''
    }

    </div>
  )
}

export default NavBar