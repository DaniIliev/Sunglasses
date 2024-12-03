import React, { useState } from 'react'
import './Home.css'
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import { GiClick } from "react-icons/gi";
import { Link } from 'react-router-dom';
const Home = () => {


  return (
    <div className='home'>
        <p>PISHKA</p>
        <div className='images'>
            <img className='hero1' src="../../../public/images/sunglasses4.jpg" alt="" />
            <img className='hero2' src="../../../public/images/sunglasses5.jpg" alt=""/>
            <div class="content">
                <h1>Welcome to the Blurred Photo</h1>
                <p>This is an example of a blurred image with a background</p>
                <p className='button'><Link to='/sunglasses'><GiClick />SHOPPING WIHT LOVE <GiClick /></Link></p>

            </div>
        </div>
        <div className='trendingContainer'>
            <h2>Trending now</h2>
            <div className='trendingCards'>
                <div className='trandingCard'>
                    <div className='cardIMG'>
                        <img src="../../../public/images/COPY1.webp" width={200} height={150} alt="" />
                    </div>
                    <div className='aboutCard'>
                        <p>Something</p>
                        <p>price 321$$</p>
                    </div>
                    <div className='buttonsLoveCart'>
                        <Stack direction="row" spacing={2}>
                            <FavoriteIcon className='favoriteIcon'/> 
                            <Button variant="contained">ADD TO CART</Button>

                        </Stack>
                    </div>
                </div>
                <div className='trandingCard'>
                    <div className='cardIMG'>
                        <img src="../../../public/images/COPY1.webp" width={200} height={150} alt="" />
                    </div>
                    <div className='aboutCard'>
                        <p>Something</p>
                        <p>price 321$$</p>
                    </div>
                    <div className='buttonsLoveCart'>
                        <Stack direction="row" spacing={2}>
                            <FavoriteIcon className='favoriteIcon'/> 
                            <Button variant="contained">ADD TO CART</Button>

                        </Stack>
                    </div>
                </div>
                <div className='trandingCard'>
                    
                    <div className='cardIMG'>
                        <img src="../../../public/images/COPY1.webp" width={200} height={150} alt="" />
                    </div>
                    <div className='aboutCard'>
                        <p>Something</p>
                        <p>price 321$$</p>
                    </div>
                    <div className='buttonsLoveCart'>
                        <Stack direction="row" spacing={2}>
                            <FavoriteIcon className='favoriteIcon'/> 
                            <Button variant="contained">ADD TO CART</Button>

                        </Stack>
                    </div>
                </div>
                <div className='trandingCard'>
                    
                    <div className='cardIMG'>
                        <img src="../../../public/images/COPY1.webp" width={200} height={150} alt="" />
                    </div>
                    <div className='aboutCard'>
                        <p>Something</p>
                        <p>price 321$$</p>
                    </div>
                    <div className='buttonsLoveCart'>
                        <Stack direction="row" spacing={2}>
                            <FavoriteIcon className='favoriteIcon'/> 
                            <Button variant="contained">ADD TO CART</Button>

                        </Stack>
                    </div>
                </div>
                <div className='trandingCard'>
                    <div className='cardIMG'>
                        <img src="../../../public/images/COPY1.webp" width={200} height={150} alt="" />
                    </div>
                    <div className='aboutCard'>
                        <p>Something</p>
                        <p>price 321$$</p>
                    </div>
                    <div className='buttonsLoveCart'>
                        <Stack direction="row" spacing={2}>
                            <FavoriteIcon className='favoriteIcon'/> 
                            <Button variant="contained">ADD TO CART</Button>

                        </Stack>
                    </div>
                </div>
            </div>
        </div>
        <div className='choice'>
            <div className='question'>
                <img src="../../../public/images/scr2.jpeg" alt="" />  
                <div>
                    <h2>Why choose our glasses?</h2>
                    <img src="../../../public/images/questionsMark.png" alt="" />
                </div>
                <img src="../../../public/images/sunglasses3.jpg" alt="" />

            </div>
            <div className='benefits'>
                <p className='benefit'><span>1</span>Style Meets Innovation: Our sunglasses blend cutting-edge designs with timeless aesthetics, making you stand out wherever you go.</p>
                <p className='benefit'><span>2</span>Ultimate Eye Protection: Engineered with 100% UV protection and polarized lenses, they safeguard your eyes while reducing glare for clear, comfortable vision.</p>
                <p className='benefit'><span>3</span>Eco-Friendly Materials: Made from sustainable materials, our sunglasses help protect the planet while protecting your eyes.</p>
                <p className='benefit'><span>4</span>Durability You Can Trust: Built to last, they resist scratches, impacts, and everyday wear, ensuring a reliable companion for all your adventures.</p>
            </div>
        </div>
       
    </div>
  )
}

export default Home