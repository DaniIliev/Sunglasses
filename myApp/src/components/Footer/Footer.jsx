import React from 'react'
import './Footer.css'
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";


const Footer = () => {
  return (
    <div className='footer'>
            <div className='logo'>
                <h2>LOGO</h2>
                <div>
                    <a href="">Home</a>
                    <a href="">Catalog</a>
                    <a href="">Sign in</a>
                    <a href="">Sign up</a>
                </div>
            </div>
            <div className='contacts'>
                <h2>Contacts</h2>
                <p>9032180912</p>
                <p>email@abv.bg</p>
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