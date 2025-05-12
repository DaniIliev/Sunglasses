import React, { useState,  } from 'react'
import './Home.css'
import { GiClick } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography, Paper, Avatar } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/HelpOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Reviews from '../Reviews/Reviews';
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
                        {/* <p className='sale'>TOP</p> */}
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
                <Link className='card' to='/sunglasses'>
                    <div className='imageStock'>
                        {/* <p className='sale'>TOP</p> */}
                        <div className='imageContainer'>
                            <img src="/trend2.JPG" alt="ok" width={300} 
                            // className='default-image'
                            />
                            {/* <img src="/images/image.png" width={300} alt="" className='hover-image' */}
                            {/* /> */}
                        </div>
                    </div>
                    <div className="info">
                        <h3></h3>
                        <div className='prices'>
                            {/* <h5>600,00$</h5> */}
                            {/* <h4>115лв && 120лв</h4> */}
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
                        {/* <p className='sale' color='blue'>TOP</p> */}
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
    <Box
      sx={{
        px: 4,
        py: 6,
        // background: 'linear-gradient(135deg, #f0f4f8, #d9e4f5)',
        backgroundColor: '#f7faf7',
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Grid container spacing={5} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={10}>
        <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }} // Подреждаме снимките под текста на мобилни устройства
            alignItems="center"
            justifyContent="center"
            gap={4}
            >
            {/* Първо изображение */}
            <Avatar
                variant="rounded"
                src="../../../images/scr2.jpeg"
                sx={{
                width: { xs: 120, sm: 140, md: 160 },
                height: { xs: 120, sm: 140, md: 160 },
                borderRadius: '1.5rem',
                objectFit: 'cover',
                }}
            />
            
            {/* Заглавие и въпросителна икона */}
            <Box textAlign="center">
                <Typography variant="h4" fontWeight="bold" color="primary">
                {t('home.chooseQuestion')}
                </Typography>
                <QuestionMarkIcon color="secondary" sx={{ fontSize: 45, mt: 1 }} />
            </Box>

            {/* Второ изображение */}
            <Avatar
                variant="rounded"
                src="../../../images/sunglasses3.jpg"
                sx={{
                width: { xs: 120, sm: 140, md: 160 },
                height: { xs: 120, sm: 140, md: 160 },
                borderRadius: '1.5rem',
                objectFit: 'cover',
                }}
            />
            </Box>

        </Grid>

        {/* Benefits Section */}
        <Grid item xs={12}>
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            {[1, 2, 3, 4].map((num) => (
                <Grid item xs={12} sm={6} md={5} key={num}>
                <Paper
                    elevation={4}
                    sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    borderRadius: 3,
                    backgroundColor: '#ffffffcc',
                    flexDirection: 'row',
                    transition: '0.3s',
                    '&:hover': {
                        backgroundColor: '#e3f2fd',
                        transform: 'scale(1.02)',
                    },
                    }}
                >
                    <CheckCircleIcon color="success" sx={{ fontSize: 30, mt: '3px' }} />
                    <Typography
                    variant="body1"
                    fontSize={{ xs: '1rem', sm: '1.1rem' }}
                    >
                    {t(`home.benefit${num}`)}
                    </Typography>
                </Paper>
                </Grid>
            ))}
            </Grid>

        </Grid>
      </Grid>
    </Box>
       {/* <Reviews /> */}
        <SocialSection />
    </div>
  )
}

export default Home