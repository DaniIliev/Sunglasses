import React from 'react'
import './LoveCartList.css'
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaMedal } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";

const LoveCartList = () => {
  return (
    <div className='LoveCartPage'>
        <div className="contentWishlist">

            <p className='titels'>home / wishlist</p>
            <div>
            <h1>Wishlist</h1>
            <p>All of your favorite styles in one place. Keep track of your items, create multiple lists, and share your favorites with friends and family.</p>
            </div>
        </div>
        <div className='newUserBox'>
            <div className="signInAcc">
                <h2>My Account</h2>
                <p>To access your wishlist, and see previously saved items, please sign into your account.</p>
                <p className="wishlistBTN">Sign in</p>
            </div>
            <div className="createWishList">
                <h2>Start a Wishlist</h2>
                <p>Keep track of all the items you love. Click the heart icon on each product image to save your favorites in a wishlist.</p>
                <div className="buttonsDivWishlist">
                    <p className='wishlistBTN'>Shop Men's</p>
                    <p className='wishlistBTN'>Shop Women's</p>
                </div>
            </div>
        </div>
        <div className="wishlistCreate">
            <div className="startWishlist">
                <Link to='/sunglasses/bestselers'><FaHeartCirclePlus className='wishHeart'/></Link>
                <div>
                    <h2>Start a Wishlist</h2>
                    <p>Click the heart icon to create a wishlist</p>
                </div>
            </div>
            <div className="bestsellers">
                <Link className='card1' to='/sunglasses/1'>
                    <div className='imageStock'>
                        <p className='sale'>SALE</p>
                        <CiHeart className='like'/> 
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
                        <CiHeart className='like'/> 
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
        <div className="wishingCards">
                <Link className='card' to='/sunglasses/1'>
                    <div className='imageStock'>
                        <p className='sale'>SALE</p>
                        <CiHeart className='like'/> 
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
                <Link className='card' to='/sunglasses/1'>
                    <div className='imageStock'>
                        <p className='sale'>SALE</p>
                        <CiHeart className='like'/> 
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
                <Link className='card' to='/sunglasses/1'>
                    <div className='imageStock'>
                        <p className='sale'>SALE</p>
                        <CiHeart className='like'/> 
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
  )
}

export default LoveCartList