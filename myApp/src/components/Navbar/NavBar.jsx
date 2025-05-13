import React, { useContext, useEffect, useState }  from 'react'
import { Link, useNavigate } from "react-router-dom"
import { MdKeyboardArrowUp } from "react-icons/md";
import { BsCashStack } from "react-icons/bs";
import SearchBar from '../shared/SearchBar'
import { RiMenuFold4Fill } from "react-icons/ri";
import "./NavBar.css"
// import LogoutIcon from '@mui/icons-material/Logout';
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
import { logout } from '../../utills/sharedFn/logout';
import { SunglassesContext } from '../../context/SunglassesContext';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import { MovingLabel } from './MovingLabel';
import { Box, Typography, IconButton } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
  } from '@mui/material';
  import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {
    const [isMenuMenOpen, setIsMenuMenOpen] = useState(false)
    const [isMenuWomenOpen, setIsWomenOpen] = useState(false)
    const [isShippingHovered, setIsShippingHovered] = useState(false)
    const [isUserIconHovered, setIsUserIconHovered] = useState(false)
    const [isResponsivMenuOpen, setIsRepsonsivMenuOpen] = useState(false)

    const [isLanguageENG, setIsLanguageENG] = useState('eng')


    const { user, setUser} = useContext(UserContext);
    const {sunglasses, filterValues, setFilterValues, setFilteredSunglasses} = useContext(SunglassesContext)

    const updateGender = (gender) => {
        setFilterValues(prev => ({ ...prev, gender: gender }));
    };


    const navigate = useNavigate()
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

    }, [user, filterValues])

    const handleLogout = async () => {
        await logout(setUser) 
        navigate('/')
       }

  return (
    <div className='navBars'>
        <MovingLabel t={t}/>
        <div  className='navBarOne'>
        <div class="navigation">
            <input type="checkbox" class="navigation__checkbox" id="navi-toggle" onClick={() => setIsRepsonsivMenuOpen(!isResponsivMenuOpen)}/>
            <label for="navi-toggle" class="navigation__button">
            {!isResponsivMenuOpen ? <MenuIcon className='icon'/>
            : <ClearIcon  className='icon' />}
            </label>


            <div class={`navigation__background ${isResponsivMenuOpen ? 'open-bg' : ''}`}></div>
            {isResponsivMenuOpen ? 
            <nav class="navigation__nav">
                {/* <div className='navigation__header'>
                    <h1>Menu</h1>
                    <p className='language responsive' onClick={() => {
                    if(isLanguageENG == 'eng'){
                        setIsLanguageENG("bg")
                        switchLanguage("bg")
                    }else{
                        setIsLanguageENG("eng")
                        switchLanguage("eng")
                    }
                }}><strong>{isLanguageENG == 'eng' ? 'BG' : 'EN'}</strong></p>
                </div>
                <h4>{user ? <p style={{textAlign: 'center'}} className='welcomeUsernameResponsive'>{`Welcome, ${user.username}`}</p> : ''}</h4> */}
                <Box
                    // className="navigation__header"
                    sx={{
                        display: 'flex',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'column',
                        mt: 3,
                        px: 2,
                        py: 1,
                    }}
                    >
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {t("Menu")}
                    </Typography>

                    <IconButton
                        onClick={() => {
                        const newLang = isLanguageENG === 'eng' ? 'bg' : 'eng';
                        setIsLanguageENG(newLang);
                        switchLanguage(newLang);
                        }}
                        size="small"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        className="language responsive"
                    >
                        <LanguageIcon />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {isLanguageENG === 'eng' ? 'BG' : 'EN'}
                        </Typography>
                    </IconButton>
                    </Box>
                {/* <SearchBar /> 
                <ul class="navigation__list">
                <li class="navigation__item"><Link class="navigation__link" onClick={() => {
                        setIsRepsonsivMenuOpen(!isResponsivMenuOpen)
                    }} to={'/sunglasses'}><li>{t('menu.bestsellers')}</li></Link></li>
                    {user ? 
                        <>
                            <li class="navigation__item" ><Link class="navigation__link" onClick={() => setIsRepsonsivMenuOpen(!isResponsivMenuOpen)} to={'/orders'}><li>My orders</li></Link></li>
                            <li class="navigation__item"><Link class="navigation__link" onClick={() => {
                                setIsRepsonsivMenuOpen(!isResponsivMenuOpen);
                                handleLogout();
                                }}>
                                <li>Logout</li>
                            </Link></li>
                        </>
                        : <li class="navigation__item" ><Link class="navigation__link" onClick={() => setIsRepsonsivMenuOpen(!isResponsivMenuOpen)} to='/user/access'><li>Sign in / Sign up</li></Link></li>
                    }
                </ul> */}
                <List sx={{ px: 2 }}>
                <ListItem disablePadding>
                    <ListItemButton sx={{textAlign: 'center', fontSize: 30}} component={Link} to="/sunglasses" onClick={() => setIsRepsonsivMenuOpen(false)}>
                    <ListItemText primary={t('View Catalog')} />
                    </ListItemButton>
                </ListItem>

                {user ? (
                    <>
                    <ListItem disablePadding>
                        <ListItemButton sx={{textAlign: 'center'}} component={Link} to="/orders" onClick={() => setIsRepsonsivMenuOpen(false)}>
                        <ListItemText sx={{textAlign: 'center', fontSize: 30}} primary={t("My orders")} />
                        </ListItemButton>
                    </ListItem>
                    {user?._id == '68092d56a17f6bacd78b1bc4' && 
                    <>
                    <ListItem disablePadding>
                        <ListItemButton sx={{textAlign: 'center'}} component={Link} to="/create" onClick={() => setIsRepsonsivMenuOpen(false)}>
                        <ListItemText sx={{textAlign: 'center', fontSize: 30}} primary={t("Добавинов модел")} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton sx={{textAlign: 'center'}} component={Link} to="/ordersList" onClick={() => setIsRepsonsivMenuOpen(false)}>
                        <ListItemText sx={{textAlign: 'center', fontSize: 30}} primary={t("Виж поръчките")} />
                        </ListItemButton>
                    </ListItem>
                    </>
                    }
                    <ListItem disablePadding>
                        <ListItemButton
                        onClick={() => {
                            setIsRepsonsivMenuOpen(false);
                            handleLogout();
                        }}
                        >
                        <ListItemText sx={{textAlign: 'center', fontSize: 30}}primary={t("Logout")} />
                        </ListItemButton>
                    </ListItem>
                    </>
                ) : (
                    <ListItem disablePadding>
                    <ListItemButton component={Link} to="/user/access" onClick={() => setIsRepsonsivMenuOpen(false)}>
                        <ListItemText sx={{textAlign: 'center', fontSize: 30}} primary={t("Sign in / Sign up")} />
                    </ListItemButton>
                    </ListItem>
                )}
                </List>
            </nav>
            : null}
        </div>
            <Link to='/'><img src="/images/logo.jpg" alt="" className='logo'/></Link>
            <SearchBar /> 

            <div className='aboutUser'>
                {/* <p className='language' onClick={() => {
                    if(isLanguageENG == 'eng'){
                        setIsLanguageENG("bg")
                        switchLanguage("bg")
                    }else{
                        setIsLanguageENG("eng")
                        switchLanguage("eng")
                    }
                }}><strong>{isLanguageENG == 'eng' ? 'BG' : 'EN'}</strong></p> */}

                    <IconButton
                        className='hidden'
                        onClick={() => {
                        const newLang = isLanguageENG === 'eng' ? 'bg' : 'eng';
                        setIsLanguageENG(newLang);
                        switchLanguage(newLang);
                        }}
                        size="small"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        // className="language responsive"
                    >
                        <LanguageIcon />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {isLanguageENG === 'eng' ? 'BG' : 'EN'}
                        </Typography>
                    </IconButton>   
                {user ? <p className='welcomeUsernam'>{`Welcome, ${user.username}`}</p> : ''}
               {user ? <Typography className='hidden' sx={{cursor: 'pointer', color: '#EEAECA' }} onClick={() => navigate('/orders')}>{t('My Orders')}</Typography> : <Link to={'/user/access'} ><PersonIcon className='personIcon personIconNone' /> </Link>}

                {/* <Link to='/wishlist'><FavoriteIcon className='favoriteIcon'/> {user? `(${user?.wishlist?.length})` : ''}</Link> */}
                <Link to='/wishlist'><FavoriteIcon className='favoriteIcon'/></Link>
                <Link to='/cart' onMouseEnter={() => setIsShippingHovered(!isShippingHovered)}><ShoppingCartIcon className='shoppingIcon'/>({countInCart})</Link>
                {user && <LogoutIcon className='hidden' sx={{cursor: 'pointer', color: '#EEAECA'}} onClick={handleLogout}/>}
            </div>
        </div>
        <hr />
        <div className='navBarTwo'>
            <nav>
                {/* <Link  to="/sunglasses">{t('menu.new')}</Link> */}
                <Link to="/sunglasses">{t('View Catalog')}</Link>
                {user?._id == '68092d56a17f6bacd78b1bc4' && <Link to='/create'>Добавинов модел</Link>}
                {user?._id == '68092d56a17f6bacd78b1bc4' && <Link to='/ordersList'>Виж поръчките</Link>}
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