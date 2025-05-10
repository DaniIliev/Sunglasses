import React, { useState,  } from 'react'
import './Home.css'
import { GiClick } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Reviews from '../Reviews/Reviews';
import {Box} from '@mui/material'
import {Avatar} from '@mui/material';
import SocialSection from '../SocialSection/SocialSection';
const Home = () => {

    const {t, i18n} = useTranslation()
    const slides = [
        {
          id: 1,
          image: "/images/sunglasses1.jpg",
        },
        {
          id: 2,
          image: "/images/sunglasses4.jpg",

        },
        {
          id: 3,
          image: "/images/sunglasses5.jpg",
        },
        {
            id: 4,
            image: "/images/sunglasses3.jpg",
          },
          {
            id: 5,
            image: "/images/sunglasses6.jpg",
          },
      ];

      const [currentIndex, setCurrentIndex] = useState(0);
      const [currentList, setCurrentList] = useState(slides)
      useEffect(() => {
        const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        const firstImage = slides.shift()
        slides.push(firstImage)
        setCurrentList(slides)

      setCurrentList((prevArray) => {
            const newArray = [...prevArray];
            newArray.push(newArray.shift()); 
            return newArray;
      });
        }, 9000);
        return () => clearInterval(interval);
      }, []);
    
      const isSafari = typeof navigator !== "undefined" &&
      navigator.userAgent.toLowerCase().includes("safari") &&
      !navigator.userAgent.toLowerCase().includes("chrome");

  return (
    <div className='home'>
        <div className={isSafari ? 'no-animation images' : 'images' }>
            <div className="carousel-track"
   >
                {currentList.map((slide, index) => {
                    let position = 'non-active'
                    if(index == 2){
                        position = 'active'
                    }
                    return (
                        <div className={`carousel-item ${position}`} key={slide.id}>
                          <img src={slide.image} />
                        </div>
                      );
                })}
            </div>
            <div className="content">
                <h1 className='welcomeText'>{t('home.welcome')}</h1>
                <Link to='/sunglasses' className='button'><GiClick className='clickIcon' />{t('home.shoppingWithLoveBTN')}<GiClick className='clickIcon'/></Link>
            </div>
        </div>
        <div className='trendingContainer'>
            <h2 className='trendingTitle'>{t('home.trendingNow')}</h2>
            <div className='trendingCards'>
                <Link className='card' to='/sunglasses/681934a2d45dbf51dd66827e'>
                    <div className='imageStock'>
                        <p className='sale'>TOP</p>
                        <div className='imageContainer'>
                            <img src="/marbleLuxe.JPG" alt="ok" width={300} 
                            // className='default-image'
                            />
                            {/* <img src="/images/image.png" width={300} alt="" className='hover-image'/> */}
                        </div>
                    </div>
                    <div className="info">
                        <h3>MARBLE LUXE</h3>
                        <div className='prices'>
                            {/* <h5>600,00$</h5> */}
                            <h4>130лв</h4>
                            {/* <p>-10%</p> */}
                        </div>
                    </div>
                </Link>
                <Link className='card' to='/sunglasses/681927d1d45dbf51dd668203'>
                    <div className='imageStock'>
                        <p className='sale'>TOP</p>
                        <div className='imageContainer'>
                            <img src="/amberOlive.JPG" alt="ok" width={300} 
                            // className='default-image'
                            />
                            {/* <img src="/images/image.png" width={300} alt="" className='hover-image' */}
                            {/* /> */}
                        </div>
                    </div>
                    <div className="info">
                        <h3>AMBER SOUL && OLIVE EDGE</h3>
                        <div className='prices'>
                            {/* <h5>600,00$</h5> */}
                            <h4>115лв && 120лв</h4>
                            {/* <p>-10%</p> */}
                        </div>
                    </div>
                </Link>
                {/* <Link className='card' to='/sunglasses/1'>
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
                </Link> */}
                <Link className='card' to='/sunglasses/68193981d45dbf51dd6682a8'>
                    <div className='imageStock'>
                        <p className='sale' color='blue'>TOP</p>
                        <div className='imageContainer'>
                            <img src="/redwood.JPG" alt="ok" width={300} 
                            // className='default-image'
                            />
                            {/* <img src="/images/image.png" width={300} alt="" className='hover-image' */}
                            {/* /> */}
                        </div>
                    </div>
                    <div className="info">
                        <h3>REDWOOD STOCK</h3>
                        <div className='prices'>
                            {/* <h5>600,00$</h5> */}
                            <h4>110лв</h4>
                            {/* <p>-10%</p> */}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        <div className='choice'>
            <div className='question'>
                <img src="../../../images/scr2.jpeg" alt="" />  
                <div>
                    <h2>{t('home.chooseQuestion')}</h2>
                    <img src="../../../images/questionsMark.png" alt="" />
                </div>
                <img src="../../../images/sunglasses3.jpg" alt="" />

            </div>
            <div className='benefits'>
                <p className='benefit'><span>1</span> {t('home.benefit1')}</p>
                <p className='benefit'><span>2</span> {t('home.benefit2')}</p>
                <p className='benefit'><span>3</span> {t('home.benefit3')}</p>
                <p className='benefit'><span>4</span> {t('home.benefit4')}</p>
            </div>
        </div>
       {/* <Reviews /> */}
        <SocialSection />
    </div>
  )
}

export default Home