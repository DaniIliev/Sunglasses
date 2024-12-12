import React, {useState}from 'react'
import { Link } from 'react-router-dom';
import './Sunglasses.css'
import { CiHeart } from "react-icons/ci";
import SunglassesFilter from '../shared/SunglassesFilter';


const Sunglasses = () => {

  return (
    <>
    <p className='titles'>HOME / SUNGLASSES / BEST-SELLERS</p>
    <div className='sunglassesPage'>
        <div className="filters">
            <SunglassesFilter />
        </div>
        <div className="catalog-cards">
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
            <div className='card'>
                <img src="/images/COPY2.webp" alt="ok" width={300}/>
                <div className="info">
                    <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                    <h5>600$$</h5>
                </div>
            </div>
            <div className='card'>
                <img src="/images/COPY3.webp" alt="ok" width={300}/>
                <div className="info">
                    <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                    <h5>600$$</h5>
                </div>
            </div>
            <div className='card'>
                <img src="/images/COPY4.webp" alt="ok" width={300}/>
                <div className="info">
                    <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                    <h5>600$$</h5>
                </div>
            </div>
            <div className='card'>
                <img src="/images/COPY5.webp" alt="ok" width={300}/>
                <div className="info">
                    <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                    <h5>600$$</h5>
                </div>
            </div>
            <div className='card'>
                <img src="/images/COPY6.webp" alt="ok" width={300}/>
                <div className="info">
                    <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                    <h5>600$$</h5>
                </div>
            </div>
            <div className='card'>
                <img src="/images/COPY1.webp" alt="ok" width={300}/>
                <div className="info">
                    <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                    <h5>600$$</h5>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Sunglasses