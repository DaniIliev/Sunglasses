
import React, {useEffect, useState}from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import '../Sunglasses/Sunglasses.css'
import { MdKeyboardArrowUp } from "react-icons/md";
import { useTranslation } from 'react-i18next';
const SunglassesFilter = () => {
    const [isFrameShapeOpen, setIsFrameShapeOpen] = useState(false)
    const [isFrameColrFIlterOpen, setIsFrameColrFIlterOpen] = useState(false)
    const [isLensColrFilterOpen, setIsLensColorFilterOpen] = useState(false)
    const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false)

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200);  
    
    const {t, i18n} = useTranslation()
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
            <p className='sunglassesfilter' 
                onClick={() => setIsFrameShapeOpen(!isFrameShapeOpen)}>
                {t('sunglassesFilter.frameShape')}
                {isFrameShapeOpen ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown/> }</p>
                {isFrameShapeOpen ? 
                        <div className="checkboxes">
                            <label class="container">{t('sunglassesFilter.checkbox1')}<img src="/images/round.jpeg" alt="" />
                                <input type="checkbox" id="1" name="round" value="Round"/>
                                <span class="checkmark"></span>
                            </label>
                            <label className="container">{t('sunglassesFilter.checkbox2')} <img src="/images/squared.jpeg" alt="" />
                                <input type="checkbox" id="2" name="squared" value="Squared"/>
                                <span class="checkmark"></span>
                            </label>
                            <label className="container">{t('sunglassesFilter.checkbox3')} <img src="/images/rechtangular.jpeg" alt="" />
                                <input type="checkbox" id="3" name="rechtangular" value="Rechtangular"/>
                                <span class="checkmark"></span>
                            </label>
                            <label className="container">{t('sunglassesFilter.checkbox4')}<img src="/images/pilotAviator.jpeg" alt="" />
                                <input type="checkbox" id="4" name="pilot/aviator" value="Pilot/Aviator"/>
                                <span class="checkmark"></span>
                            </label>
                            <label className="container">{t('sunglassesFilter.checkbox5')} <img src="/images/catEye.jpeg" alt="" />
                                <input type="checkbox" id="5" name="catYey" value="CatEye"/>
                                <span class="checkmark"></span>
                            </label>
                        </div> : ''}

            <p className='sunglassesfilter' 
                onClick={() => setIsFrameColrFIlterOpen(!isFrameColrFIlterOpen)}>
                {t('sunglassesFilter.frameColor')}
                {isFrameColrFIlterOpen ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown/> }
                </p>
                {isFrameColrFIlterOpen ? 
                            <div className="frame-colors">
                                <div className="colorContainer">
                                    <p className='black'></p>
                                    <p>{t('sunglassesFilter.black')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='blue'></p>
                                    <p>{t('sunglassesFilter.blue')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='clear'></p>
                                    <p>{t('sunglassesFilter.clear')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='gold'></p>
                                    <p>{t('sunglassesFilter.gold')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='green'></p>
                                    <p>{t('sunglassesFilter.green')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='grey'></p>
                                    <p>{t('sunglassesFilter.grey')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='multi'></p>
                                    <p>{t('sunglassesFilter.multi')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='neutral'></p>
                                    <p>{t('sunglassesFilter.neural')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='orange'></p>
                                    <p>{t('sunglassesFilter.orange')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='pink'></p>
                                    <p>{t('sunglassesFilter.pink')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='purple'></p>
                                    <p>{t('sunglassesFilter.purple')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='red'></p>
                                    <p>{t('sunglassesFilter.red')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='silver'></p>
                                    <p>{t('sunglassesFilter.silver')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='tort'></p>
                                    <p>{t('sunglassesFilter.tort')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='white'></p>
                                    <p>{t('sunglassesFilter.white')}</p>
                                </div>
                                <div className="colorContainer">
                                    <p className='yellow'></p>
                                    <p>{t('sunglassesFilter.yellow')}</p>
                                </div>
                            </div> : ''
                }

            <p className='sunglassesfilter' 
                onClick={() => setIsLensColorFilterOpen(!isLensColrFilterOpen)}>
                {t('sunglassesFilter.lensColor')} 
                {isLensColrFilterOpen ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown/> }
                </p>
            {isLensColrFilterOpen ? 
                    <div className="lens-colors">
                        <div className="lens-color-container">
                            <img src="/images/standartsunlenses.png" alt="" width={50}/>
                            <p>{t('sunglassesFilter.standart')}</p>
                        </div>
                        <div className="lens-color-container">
                            <img src="/images/polarized.png" alt="" width={50}/>
                            <p>{t('sunglassesFilter.polarized')}</p>
                        </div>
                        <div className="lens-color-container">
                            <img src="/images/mirrored.png" alt="" width={50}/>
                            <p>{t('sunglassesFilter.mirrored')}</p>
                        </div>
                        <div className="lens-color-container">
                            <img src="/images/colortransaction.png" alt="" width={50}/>
                            <p>{t('sunglassesFilter.transition')}</p>
                        </div>
                        <div className="lens-color-container">
                            <img src="/images/dioptric.png" alt="" width={50}/>
                            <p>{t('sunglassesFilter.diobtric')}</p>
                        </div>
                    </div>
                : ''
            }

            <p className='sunglassesfilter' 
                onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}>
                    {t('sunglassesFilter.price')}
                    {isPriceFilterOpen ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown/> }
                    </p>
            {isPriceFilterOpen ? 
                        <div className="filter-container">
                        <h3>{t('sunglassesFilter.filterByPrice')}</h3>
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