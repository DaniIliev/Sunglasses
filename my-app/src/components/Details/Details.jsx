import React, {useState} from 'react'
import { RiStarSFill } from "react-icons/ri";
import { FaMinus } from "react-icons/fa6";
import './Details.css'
import { FaPlus } from "react-icons/fa";
import { GrCaretPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";


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

    const handleNext = () => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
      };
    
      const handlePrev = () => {
        setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
      };
    
  return (
    <div className='detailsPage'>
        <div className='allAboutImages'>
            <div className="infinitiImages">
                    <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} className="active" />
                    <p className="left" onClick={handlePrev}><GrCaretPrevious /></p>
                    <p className="right" onClick={handleNext}><GrCaretNext /></p>
            </div>
            <div className='imagesContainer'>
                <img src="/images/COPY1.webp" alt="" />
                <img src="/images/COPY2.webp" alt="" />
                <img src="/images/COPY3.webp" alt="" />
                <img src="/images/COPY4.webp" alt="" />
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
            <div className='information'>
                <h4>DESCRIPTION</h4>
                {isDescriptionOpen ? 
                    <div className="description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, hic. Iste, itaque fugit odit accusantium est esse corrupti rerum voluptates labore corporis non reiciendis, amet obcaecati maxime id libero architecto delectus cupiditate voluptatem. Facere sapiente vitae modi magni repudiandae dolore placeat rem earum officia? Ipsam nulla magnam sint ex numquam?</p>
                        </div> : ''}
                <h4>PRODUCT DETAILS</h4>
                { isProductDetailsOpen ? 
                    <div className="productDetails">
                        <div className="sections">
                            <div className="firstSection">
                                <p><strong>FRAME SHAPE:</strong> AVIATOR</p>
                                <p><strong>GENDER:</strong> UNI-SEX</p>
                                <p><strong>FRAME MATERIAL:</strong> METAL</p>
                                <p><strong>LENS TYPE:</strong> POLARIZED</p>
                                <p><strong>UV PROTECTION:</strong> CATEGORY 2</p>
                            </div>
                            <div className="secondSection">
                                <p><strong>FRAME WIDTH:</strong> 140MM</p>
                                <p><strong>FRAME HEIGTH:</strong> 53MM</p>
                                <p><strong>LENS WIDTH:</strong> 56MM</p>
                                <p><strong>Temple Length:</strong> 145MM</p>
                            </div>
                        </div>
                        <img src="/images/sizeModel.webp" alt="" />
                    </div> : ''}
                <h4>SHIPPING AND RETURNS</h4>
            </div>
        </div>
    </div>
  )
}

export default Details