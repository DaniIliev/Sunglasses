import React, { useContext,  } from 'react'
import './LoveCartList.css'
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaMedal } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { UserContext } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';

const LoveCartList = () => {
    const {user} = useContext(UserContext)
    const {t, i18n} = useTranslation()
  return (
    <div className='LoveCartPage'>
        <div className="contentWishlist">

            <p className='titels'>home / wishlist</p>
            <div>
            <h1>{t('wishlistPage.title')}</h1>
            <p>{t('wishlistPage.underTitle')}</p>
            </div>
        </div>
        {user == undefined &&
        <div className='newUserBox'>
            <div className="signInAcc">
                <h2>{t('wishlistPage.myACC')}</h2>
                <p>{t('wishlistPage.access')}</p>
                <p className="wishlistBTN">Sign in</p>
            </div>
            <div className="createWishList">
                <h2>{t("wishlistPage.startWishlist")}</h2>
                <p>{t("wishlistPage.startWishlistP2")}</p>
                <div className="buttonsDivWishlist">
                    <p className='wishlistBTN'>Shop Men's</p>
                    <p className='wishlistBTN'>Shop Women's</p>
                </div>
            </div>
        </div>
        }   
        {user != undefined && user?.wishlist.length == 0 &&
        <div className="wishlistCreate">
            <div className="startWishlist">
                <Link to='/sunglasses/bestselers'><FaHeartCirclePlus className='wishHeart'/></Link>
                <div>
                    <h2>{t("wishlistPage.startWishlist")}</h2>
                    <p>{t("wishlistPage.startWishlistP")}</p>
                </div>
            </div>
            <div className="bestsellers">
                <Link className='card1' to='/sunglasses/1'>
                    <div className='imageStock'>
                        <p className='sale'>SALE</p>
                        <div className='imageContainer'>
                            <img src="/images/COPY1.webp" alt="ok" width={300} className='default-image'/>
                            <img src="/images/image.png" width={300} alt="" className='hover-image'/>
                        </div>
                    </div>
                    <div className="info">
                        <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                        <div className='prices'>
                            <h5>600,00$</h5>
                            <h4>500,00$</h4>
                            <p>-10%</p>
                        </div>
                    </div>
                </Link>
                <Link className='card1' to='/sunglasses/1'>
                    <div className='imageStock'>
                        <p className='sale'>SALE</p>
                        <div className='imageContainer'>
                            <img src="/images/COPY1.webp" alt="ok" width={300} className='default-image'/>
                            <img src="/images/image.png" width={300} alt="" className='hover-image'/>
                        </div>
                    </div>
                    <div className="info">
                        <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                        <div className='prices'>
                            <h5>600,00$</h5>
                            <h4>500,00$</h4>
                            <p>-10%</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        }
        {user != undefined && user?.wishlist > 0 &&
        <div className="wishingCards">
            {user.wishlist.map(el => 

                <Link className='card' to='/sunglasses/1'>
                <div className='imageStock'>
                    <p className='sale'>SALE</p>
                    <div className='imageContainer'>
                        <img src="/images/COPY1.webp" alt="ok" width={300} className='default-image'/>
                        <img src="/images/image.png" width={300} alt="" className='hover-image'/>
                    </div>
                </div>
                <div className="info">
                    <h3>{el.name}</h3>
                    <div className='prices'>
                        <h5>{el.oldPrice}$</h5>
                        <h4>{el.price}$</h4>
                        <p>{el.oldPrice ?`-${Math.round((((item.oldPrice - item.price) / item.oldPrice) * 100) / 10) * 10}${'%'}`: ''}</p>
                    </div>
                </div>
                </Link>
            )}
        </div>
    }
    </div>
  )
}

export default LoveCartList