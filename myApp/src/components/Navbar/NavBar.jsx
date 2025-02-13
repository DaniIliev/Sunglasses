import React, { useContext, useEffect, useState }  from 'react'
import { Link, useNavigate } from "react-router-dom"
import { MdKeyboardArrowUp } from "react-icons/md";
import SearchBar from '../shared/SearchBar'
import { RiMenuFold4Fill } from "react-icons/ri";
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
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../context/UserContext';

const NavBar = () => {
    const [isMenuMenOpen, setIsMenuMenOpen] = useState(false)
    const [isMenuWomenOpen, setIsWomenOpen] = useState(false)
    const [isShippingHovered, setIsShippingHovered] = useState(false)
    const [isUserIconHovered, setIsUserIconHovered] = useState(false)
    const [isLanguageENG, setIsLanguageENG] = useState('eng')
    const [isResponsivMenuOpen, setIsRepsonsivMenuOpen] = useState(false)
    const { user , setUser} = useContext(UserContext);
    const { t, i18n } = useTranslation();
    const [countInCart, setCountInCart] = useState(0)

    const switchLanguage = (lang) => {
      i18n.changeLanguage(lang);
    };
    
    useEffect(() => {
        if(user?.cart){
            setCountInCart(user.cart.length)
        }
        setIsMenuMenOpen(false)
        setIsShippingHovered(false)
        setIsUserIconHovered(false)
    }, [user])
  return (
    <div className='navBars'>

        <div className="moving-label">
            <span>
                <p><EuroIcon className='euroIcon'/>{t('navBar.cashOnDelivery')}</p> 
                <p><MdLocalShipping/> {t('navBar.freeShipping')}</p>
                <p><BsSunglasses/>{t('navBar.magicMirror')}</p>
                <p><GiReturnArrow/>{t('navBar.return')}</p>
                <p><SiAuthy />{t('navBar.authorized')}</p>
            </span>
        </div>
        <div  className='navBarOne'>
            <SearchBar /> 
            <RiMenuFold4Fill className='responsivMenuBTN' onClick={() => setIsRepsonsivMenuOpen(!isResponsivMenuOpen)}/>
            {isResponsivMenuOpen &&
            <div className='responsivMenu'>
                <ul>
                    <li>{t('menu.new')}</li>
                    <li>{t('menu.bestsellers')}</li>
                    <li>{t('menu.women\'s')}</li>
                    <li>{t('menu.man\'s')}</li>
                </ul>
            </div>
            }
            <Link to='/'><img src="/images/logo.jpg" alt="" className='logo'/></Link>
            <div className='aboutUser'>
                <p className='language' onClick={() => {
                    if(isLanguageENG == 'eng'){
                        setIsLanguageENG("bg")
                        switchLanguage("bg")
                    }else{
                        setIsLanguageENG("eng")
                        switchLanguage("eng")
                    }
                }}><strong>{isLanguageENG == 'eng' ? 'BG' : 'EN'}</strong></p>
                {user ? <p className='welcomeUsernam'>{`Welcome, ${user.username}`}</p> : ''}
               <Link to={'/user/access'} onMouseEnter={() => setIsUserIconHovered(!isUserIconHovered)}><PersonIcon className='personIcon' /> </Link>
                {/* <Link to='/wishlist'><FavoriteIcon className='favoriteIcon'/> {user? `(${user?.wishlist?.length})` : ''}</Link> */}
                <Link to='/wishlist'><FavoriteIcon className='favoriteIcon'/></Link>
                <Link to='/cart' onMouseEnter={() => setIsShippingHovered(!isShippingHovered)}><ShoppingCartIcon className='shoppingIcon'/>({countInCart})</Link>
            </div>
        </div>
        <hr />
        <div className='navBarTwo'>
            <nav>
                <a href="">{t('menu.new')}</a>
                <Link to="/sunglasses">{t('menu.bestsellers')}</Link>
                <a onClick={() => setIsWomenOpen(!isMenuWomenOpen)}>{t('menu.women\'s')} {isMenuWomenOpen ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</a>
                <a onClick={() => setIsMenuMenOpen(!isMenuMenOpen)}>{t('menu.man\'s')} {isMenuMenOpen ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</a>
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
                        <li className='bestseller'>Bestsellers <img src="../../../images/bestsellers.png" width={50} height={50} alt="" /></li>
                        <li className='newArrivels'>New arrivels</li>
                        <li className='outlet'>Outlet <img src="../../../images/outlet.png" width={30} height={30} alt="" /></li>
                    </ul>
                </div>
                <div className='lensOptions'>
                    <h3>Lens options</h3>
                    <ul>
                        <li>Show all</li>
                        <li><img src="../../../images/standartsunlenses.png" alt="" />Standart sun lenses</li>
                        <li><img src="../../../images/polarized.png" alt="" />Polarized</li>
                        <li> <img src="../../../images/mirrored.png" alt="" />Mirrored</li>
                        <li><img src="../../../images/colortransaction.png" alt="" />With a color transition</li>
                        <li><img src="../../../images/dioptric.png" alt="" />Diobtric sunglasses</li>
                    </ul>
                </div>
                <div className='frameShape'>
                    <h3>Frame shape</h3>
                    <ul>
                        <li>Show all</li>
                        <li><img src="../../../images/round.jpeg" alt="" />Round</li>
                        <li><img src="../../../images/squared.jpeg" alt="" />Squared</li>
                        <li><img src="../../../images/rechtangular.jpeg" alt="" />Rechtangular</li>
                        <li><img src="../../../images/pilotAviator.jpeg" alt="" />Pilot / Aviator</li>
                        <li><img src="../../../images/catEye.jpeg" alt="" />Cat eye</li>
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
                    <li className='bestseller'>Bestsellers <img src="../../../images/bestsellers.png" width={50} height={50} alt="" /></li>
                    <li className='newArrivels'>New arrivels</li>
                    <li className='outlet'>Outlet <img src="../../../images/outlet.png" width={30} height={30} alt="" /></li>
                </ul>
            </div>
            <div className='lensOptions'>
                <h3>Lens options</h3>
                <ul>
                    <li>Show all</li>
                    <li><Link to='/sunglasses'><img src="../../../images/standartsunlenses.png" alt="" />Standart sun lenses</Link></li>
                    <li><img src="../../../images/polarized.png" alt="" />Polarized</li>
                    <li> <img src="../../../images/mirrored.png" alt="" />Mirrored</li>
                    <li><img src="../../../images/colortransaction.png" alt="" />With a color transition</li>
                    <li><img src="../../../images/dioptric.png" alt="" />Diobtric sunglasses</li>
                </ul>
            </div>
            <div className='frameShape'>
                <h3>Frame shape</h3>
                <ul>
                    <li>Show all</li>
                    <li><img src="../../../images/round.jpeg" alt="" />Round</li>
                    <li><img src="../../../images/squared.jpeg" alt="" />Squared</li>
                    <li><img src="../../../images/rechtangular.jpeg" alt="" />Rechtangular</li>
                    <li><img src="../../../images/pilotAviator.jpeg" alt="" />Pilot / Aviator</li>
                    <li><img src="../../../images/catEye.jpeg" alt="" />Cat eye</li>
                </ul>
            </div>
            <img className='manWithSunglasses' src="/images/menwithglasses.png" alt="" />
        </div>
        :''}

    </div>
  )
}

export default NavBar