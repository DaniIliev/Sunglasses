
import React, {useState}from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import '../Sunglasses/Sunglasses.css'
const SunglassesFilter = () => {
    const [isFrameShapeOpen, setIsFrameShapeOpen] = useState(false)
    const [isFrameColrFIlterOpen, setIsFrameColrFIlterOpen] = useState(false)
    const [isLensColrFilterOpen, setIsLensColorFilterOpen] = useState(false)
    const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false)

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200);  
    

    // Format numbers as currency
    const formatPrice = (value) => {
      return `$${parseInt(value).toLocaleString()}`;
    };
  
    // Handle slider changes
    const handleMinPriceChange = (e) => {
      const value = Math.min(parseInt(e.target.value), maxPrice - 5); // Prevent overlap
      setMinPrice(value);
    };
  
    const handleMaxPriceChange = (e) => {
      const value = Math.max(parseInt(e.target.value), minPrice + 5); // Prevent overlap
      setMaxPrice(value);
    };
  return (
    <>
            <p className='sunglassesfilter' onClick={() => setIsFrameShapeOpen(!isFrameShapeOpen)} >FRAME SHAPE <MdOutlineKeyboardArrowDown/></p>
                {isFrameShapeOpen ? 
                        <div className="checkboxes">
                            <div className="checkbox">
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label for="vehicle1"> I have a bike</label>
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label for="vehicle1"> I have a bike</label>
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label for="vehicle1"> I have a bike</label>
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label for="vehicle1"> I have a bike</label>
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label for="vehicle1"> I have a bike</label>
                            </div>
                        </div> : ''}

            <p className='sunglassesfilter' onClick={() => setIsFrameColrFIlterOpen(!isFrameColrFIlterOpen)}>FRAME COLOR <MdOutlineKeyboardArrowDown /></p>
                {isFrameColrFIlterOpen ? 
                            <div className="frame-colors">
                                <div className="colorContainer">
                                    <p className='black'></p>
                                    <p>BLACK</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='blue'></p>
                                    <p>BLUE</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='clear'></p>
                                    <p>CLEAR</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='gold'></p>
                                    <p>GOLD</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='green'></p>
                                    <p>GREEN</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='grey'></p>
                                    <p>GREY</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='multi'></p>
                                    <p>MULTU</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='neutral'></p>
                                    <p>NEUTRAL</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='orange'></p>
                                    <p>ORANGE</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='pink'></p>
                                    <p>PINK</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='purple'></p>
                                    <p>PURPLE</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='red'></p>
                                    <p>RED</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='silver'></p>
                                    <p>SILVER</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='tort'></p>
                                    <p>TORT</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='white'></p>
                                    <p>WHITE</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='yellow'></p>
                                    <p>YELLOW</p>
                                </div>
                            </div> : ''
                }

            <p className='sunglassesfilter' onClick={() => setIsLensColorFilterOpen(!isLensColrFilterOpen)}>LENS COLOR <MdOutlineKeyboardArrowDown /></p>
            {isLensColrFilterOpen ? 
                    <div className="lens-colors">
                        <div className="lens-color-container">
                            <img src="/images/standartsunlenses.png" alt="" />
                            <p>Standart sun lenses</p>
                        </div>
                        <div className="lens-color-container">
                            <img src="/images/polarized.png" alt="" />
                            <p>Polarized</p>
                        </div>
                        <div className="lens-color-container">
                            <img src="/images/mirrored.png" alt="" />
                            <p>Mirrored</p>
                        </div>
                        <div className="lens-color-container">
                            <img src="/images/colortransaction.png" alt="" />
                            <p>With a color transition</p>
                        </div>
                        <div className="lens-color-container">
                            <img src="/images/colortransaction.png" alt="" />
                            <p>Diobtric sunglasses</p>
                        </div>
                    </div>
                : ''
            }

            <p className='sunglassesfilter' onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}>PRICE <MdOutlineKeyboardArrowDown /></p>
            {isPriceFilterOpen ? 
                        <div className="filter-container">
                        <h3>FILTER BY PRICE</h3>
                        <div className="price-slider">
                            {/* Min Price Slider */}
                            <input
                            type="range"
                            className="slider min-slider"
                            min="0"
                            max="200"
                            step="5"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            />
                            {/* Max Price Slider */}
                            <input
                            type="range"
                            className="slider max-slider"
                            min="0"
                            max="200"
                            step="5"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            />
                        </div>
                        <div className="price-labels">
                            <span>
                            Price: {formatPrice(minPrice)} — {formatPrice(maxPrice)}
                            </span>
                        </div>
                        <button className="filter-button">FILTER</button>
                     </div> : ''}

    </>
  )
}

export default SunglassesFilter