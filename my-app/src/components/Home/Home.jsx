import React, { useState,  } from 'react'
import './Home.css'
import { CiHeart } from "react-icons/ci";
import { GiClick } from "react-icons/gi";
import { BsEmojiSunglasses } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
    

  return (
    <div className='home'>
        <div className='images'>
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
            <div class="content">
                <h1 className='welcomeText'>{t('welcome')}</h1>
                <Link to='/sunglasses' className='button'><GiClick />Shopping with love<GiClick /></Link>
            </div>
        </div>
        <div className='trendingContainer'>
            <h2 className='trendingTitle'>Trending now</h2>
            <div className='trendingCards'>
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