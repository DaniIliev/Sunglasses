import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { RiStarSFill } from "react-icons/ri";
import { FaArrowDown } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import './Details.css'
import { FaPlus } from "react-icons/fa";
import { GrCaretPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";



const images = [
    "/images/COPY1.webp",
    "/images/COPY2.webp",
    "/images/COPY3.webp",
    "/images/COPY4.webp"
  ];

const Details = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [sunglassesCount, setSunglassesCount] = useState(0)
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
    const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false)
    const [isShipingAndReturnOpen, setIsShipingAndReturnOpen] = useState(false)

    const handleNext = () => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
      };
    
      const handlePrev = () => {
        setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
      };
    
  return (
    <>
    <div className='detailsPage'>
        <div className='allAboutImages'>
            <div className="infinitiImages">
                    <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} className="active" />
                    <div><p className="left" onClick={handlePrev}><GrCaretPrevious /></p></div>
                    <div><p className="right" onClick={handleNext}><GrCaretNext /></p></div>
            </div>
            <div className='imagesContainer'>
                <img src="/images/COPY1.webp" className={`${currentImageIndex == 0 ? 'selected' : ''}`} alt="" onClick={() => setCurrentImageIndex(0)}/>
                <img src="/images/COPY2.webp" alt="" className={`${currentImageIndex == 1 ? 'selected' : ''}`} onClick={() => setCurrentImageIndex(1)}/>
                <img src="/images/COPY3.webp" alt="" className={`${currentImageIndex == 2 ? 'selected' : ''}`} onClick={() => setCurrentImageIndex(2)}/>
                <img src="/images/COPY4.webp" alt="" className={`${currentImageIndex == 3 ? 'selected' : ''}`} onClick={() => setCurrentImageIndex(3)}/>
            </div>
        </div>
        <div className='aboutSunglasses'>
            <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                <p className='reviews'><RiStarSFill /><RiStarSFill /><RiStarSFill /><RiStarSFill /><RiStarSFill /></p>
                <div className='prices'>
                    <h5>600,00$</h5>
                    <h4>500,00$</h4>
                    <p>-10%</p>
                </div>
                <div className='counter'>
                    <p className='plusMinus'><FaMinus /></p>
                    <p>{sunglassesCount}</p>
                    <p className='plusMinus'><FaPlus /></p>
                </div>
                <p className='addToCart'>ADD TO CART</p>
            <h4>DESCRIPTION</h4>
            <div className="description">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, hic. Iste, itaque fugit odit accusantium est esse corrupti rerum voluptates labore corporis non reiciendis, amet obcaecati maxime id libero architecto delectus cupiditate voluptatem. Facere sapiente vitae modi magni repudiandae dolore placeat rem earum officia? Ipsam nulla magnam sint ex numquam?</p>
            </div>
        </div>
    </div>
    <div className='information'>
        <h4 onClick={() => setIsProductDetailsOpen(!isProductDetailsOpen)}>PRODUCT DETAILS <FaArrowDown /></h4>
        { isProductDetailsOpen ? 
                    <div className="productDetails">
                            <div className="firstSection">
                                <p><strong>FRAME SHAPE:</strong> AVIATOR</p>
                                <p><strong>GENDER:</strong> UNI-SEX</p>
                                <p><strong>FRAME MATERIAL:</strong> METAL</p>
                                <p><strong>LENS TYPE:</strong> POLARIZED</p>
                                <p><strong>UV PROTECTION:</strong> CATEGORY 2</p>
                            </div>
                            <img src="/images/sizeModel.webp" alt="" />
                            <div className="secondSection">
                                <p><strong>FRAME WIDTH:</strong> 140MM</p>
                                <p><strong>FRAME HEIGTH:</strong> 53MM</p>
                                <p><strong>LENS WIDTH:</strong> 56MM</p>
                                <p><strong>Temple Length:</strong> 145MM</p>
                            </div>
                    </div> : ''}
        <h4 onClick={() => setIsShipingAndReturnOpen(!isShipingAndReturnOpen)}>SHIPPING AND RETURNS <FaShippingFast /></h4>
        {isShipingAndReturnOpen ? 
        <div className="shippingANDreturn">
            <p className='shipping'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam numquam quam hic ea illum voluptate dolore sint, iure animi modi ullam? Numquam rem animi vero neque, incidunt earum iste ipsa omnis deleniti laudantium id aperiam quas molestiae accusantium similique. Hic sequi consequatur iusto qui voluptate nesciunt asperiores maiores quia reprehenderit!</p>
            <div className="logos">
                <img src="/images/econt-logo.png" alt="econt" width={100}/>
                <img src="/images/speedy-logo.png" alt="speedy" width={200}/>
            </div>
        </div>
        : ''}
    </div>
    <h3  className={`${isShipingAndReturnOpen ? 'shippingIsOpen' : 'youmayalsolike'}`}>You May Also Like</h3>
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
   </>
  )
}

export default Details