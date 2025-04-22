import React, { useContext, useEffect, useState,  } from 'react'
import './LoveCartList.css'
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaMedal } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { UserContext } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { getById } from '../../services/sunglassesService';

const LoveCartList = () => {
    const {user} = useContext(UserContext)
    const [wishingCards, setWishingCards] = useState([])

    const {t, i18n} = useTranslation()

    useEffect(() => {
        if (!user?.wishlist) return;

        Promise.all(user.wishlist.map(itemID => getById(itemID)))
            .then(results => setWishingCards(results))
            .catch(error => console.error("Error fetching wishlist items:", error));
    },[user])
  return (
    <div className='LoveCartPage'>
        {console.log(wishingCards)}
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
                <Link to='/user/access'><p className="wishlistBTN">Sign in</p></Link>
            </div>
            <div className="createWishList">
                <h2>{t("wishlistPage.startWishlist")}</h2>
                <p>{t("wishlistPage.startWishlistP2")}</p>
                <div className="buttonsDivWishlist">
                    <Link to={'/sunglasses'}><p className='wishlistBTN'>Shop Men's</p></Link>
                    <Link to={'/sunglasses'}><p className='wishlistBTN'>Shop Women's</p></Link>
                </div>
            </div>
        </div>
        }   
        {user != undefined && user?.wishlist.length == 0 &&
        <div className="wishlistCreate">
            <div className="startWishlist">
                <Link to='/sunglasses'><FaHeartCirclePlus className='wishHeart'/></Link>
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
        {user != undefined && user?.wishlist.length > 0 &&
        <>
        <h2 className='yourWishingCardsTitle'>Your Wishing Cards</h2>
        <div className="catalog-cards">
            {wishingCards.length > 0 && wishingCards.map(item => 
              <div className="allAboutCard" key={item._id}>
              <div className='card'>
                  <div className='imageStock'>
                      <p className='sale'>SALE</p>
                      {console.log(item)}
                      <Link className='imageContainer' to={`/sunglasses/${item._id}`}>
                          <img src={item?.images[0]} className='default-image'/>
                          <img src={item?.images[1]} alt="" className='hover-image'/>
                      </Link>
                      <p className='addToCartSUNP' 
                      onClick={user ? () => addItem(item._id) : () => navigate('/user/access')}
                      >Add to cart
                      </p>
                  </div>
                  <div className="info">
                      <h3>{item.name}</h3>
                      <div className='prices'>
                          <h5>{item.oldPrice}</h5>
                          <h4>{item.price} лв</h4>
                          <p>{item.oldPrice ?`-${Math.round((((item.oldPrice - item.price) / item.oldPrice) * 100) / 10) * 10}${'%'}`: ''}</p>
                      </div>
                  </div>
              </div>
          </div>
            )}
        </div>
        </>
    }
    </div>
  )
}

export default LoveCartList