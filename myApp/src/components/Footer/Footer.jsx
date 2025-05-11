import React from 'react'
import './Footer.css'

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const {t} = useTranslation()
  return (
    <div className='footer'>
            <div className='logo'>
                <h2><img src="/images/logo.jpg" alt="logo" width={100} style={{borderRadius: 20}}/></h2>
                <div>
                    <Link to="/">{t('Home')}</Link>
                    <Link to="/sunglasses">{t('Catalog')}</Link>
                    <Link to="/user/access">{t('Sign in')}</Link>
                    <Link to="/user/access">{t('Sign up')}</Link>
                </div>
            </div>
            <div className='contacts'>
                <h2>{t('Contacts')}</h2>
                <p>0885188355</p>
                <p>vist_optics@gmail.com</p>
                <p>9300 Dobrich Bulgaria</p>
            </div>
            {/* <div className='socialMedias'>
                <h2>Social Medias</h2>
                <div className='socialMediasIcons'>
                    <FaSquareInstagram />
                    <FaFacebook />
                    <AiFillTikTok />
                </div>
            </div> */}
    </div>
  )
}

export default Footer