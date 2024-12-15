import React, { useEffect, useState }  from 'react'
import { Link, useNavigate } from "react-router-dom"
import { MdKeyboardArrowUp } from "react-icons/md";
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
import CartDropdown from '../shared/CartDropdown/CartDropdown';
import UserDropdown from '../shared/UserDropdown/UserDropdown';
const NavBar = () => {
    const [isMenuMenOpen, setIsMenuMenOpen] = useState(false)
    const [isMenuWomenOpen, setIsWomenOpen] = useState(false)
    const [isShippingHovered, setIsShippingHovered] = useState(false)
    const [isUserIconHovered, setIsUserIconHovered] = useState(false)
    
    useEffect(() => {
        setIsMenuMenOpen(false)
        setIsShippingHovered(false)
        setIsUserIconHovered(false)
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
            <Link to='/'><h1>LOGO</h1></Link>
            <div className='aboutUser'>
                <p className='language'><strong>EN</strong></p>
               <Link to={'/user-login'} onMouseEnter={() => setIsUserIconHovered(!isUserIconHovered)}><PersonIcon className='personIcon' /> </Link>
                <Link to='/wishlist'><FavoriteIcon className='favoriteIcon'/> </Link>
                <Link to='/cart' onMouseEnter={() => setIsShippingHovered(!isShippingHovered)} ><ShoppingCartIcon className='shoppingIcon'/></Link>
            </div>
        </div>
        <hr />
        <div className='navBarTwo'>
            <nav>
                <a href="">New</a>
                <Link to="/sunglasses">Best sellers</Link>
                <a onClick={() => setIsWomenOpen(!isMenuWomenOpen)}>Women's {isMenuWomenOpen ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</a>
                <a onClick={() => setIsMenuMenOpen(!isMenuMenOpen)}>Men's {isMenuMenOpen ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</a>
                <a href="">Unisex</a>
                <Link to="">Sale</Link>
            </nav>
        </div>
        {isShippingHovered ? 
        <CartDropdown setIsShippingHovered={setIsShippingHovered} isShippingHovered={isShippingHovered}/> 
        : ''
        }
        {isUserIconHovered ? 
        <UserDropdown setIsUserIconHovered={setIsUserIconHovered} isUserIconHovered={isUserIconHovered}/>
        : ''
        }

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
        {
            isMenuWomenOpen ? 
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
                    <li><Link to='/sunglasses'><img src="../../../public/images/standartsunlenses.png" alt="" />Standart sun lenses</Link></li>
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
        :''}

    </div>
  )
}

export default NavBar