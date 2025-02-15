import React, {useContext, useEffect, useState}from 'react'
import { Link } from 'react-router-dom';
import './Sunglasses.css'
import BeatLoader from 'react-spinners/BeatLoader'; // Adjust the path if necessary
import SunglassesFilter from '../shared/SunglassesFilter';
import { BiSort } from "react-icons/bi";
import * as sunglassesService from '../../services/sunglassesService'
import { addToCart } from '../../utills/sharedFn/addToCart';
import { UserContext } from '../../context/UserContext';
import AddToCartPopup from '../Popups/addToCartPopup';

const Sunglasses = () => {
    const [filteredSunglasses, setFilteredSunglasses] = useState([])
    const [sunglasses, setSunglasses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [sort, setSort] = useState('newest')
    const [isAddToCartPopupOpen, setIsAddToCartPopupOpen] = useState(false)

    const [filterValues, setFilterValues] = useState({
        frameShapes: [], 
        frameColor: [], 
        lensType: []   
    });

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        setIsLoading(true)
        sunglassesService.getAll()
            .then(result => {
                setSunglasses(result)
                setFilteredSunglasses(result);
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let sortedSunglasses = [...sunglasses];

        if(sort == 'ascending'){
            sortedSunglasses = sortedSunglasses.sort((a, b) => a.price - b.price)
        }else if(sort == 'descending'){
            sortedSunglasses = sortedSunglasses.sort((a, b) => b.price - a.price)
        }else if(sort == "newest"){
            console.log(sunglasses)
            sortedSunglasses = sortedSunglasses.sort((a, b) => a.createdAt - b.createdAt)
        }

        const isFilterEmpty = 
            filterValues.frameShapes.length === 0 &&
            filterValues.frameColor.length === 0 &&
            filterValues.lensType.length === 0 &&
            !filterValues.minPrice &&
            !filterValues.maxPrice;

    const filterSunglasses = isFilterEmpty
    ? sortedSunglasses 
    : sortedSunglasses.filter(sunglass => {
        const shapeMatch = filterValues.frameShapes.length === 0 || filterValues.frameShapes.includes(sunglass.frameShape);
        const colorMatch = filterValues.frameColor.length === 0 || filterValues.frameColor.includes(sunglass.frameColor);
        const lensMatch = filterValues.lensType.length === 0 || filterValues.lensType.includes(sunglass.lensType);
        const priceMatch =
            (!filterValues.minPrice || sunglass.price >= filterValues.minPrice) &&
            (!filterValues.maxPrice || sunglass.price <= filterValues.maxPrice);
        console.log(shapeMatch, colorMatch, lensMatch, priceMatch)
        return shapeMatch && colorMatch && lensMatch && priceMatch;
    });

    setFilteredSunglasses(filterSunglasses);

    }, [sort, filterValues, sunglasses]);

    

    const addItem = (id) => {
        setIsAddToCartPopupOpen(true)
        setTimeout(() => {  
            setIsAddToCartPopupOpen(false)
        }, 3000);

        addToCart(user, setUser, id, 1)
    }
  return (
    <>
    {isAddToCartPopupOpen ? <AddToCartPopup /> : ''}
    <div className='page'>
    {isLoading ? <BeatLoader  className='loader'/> : 
    <>
    <div className='div-hr-text-gradient-and-imgFilter'>
        <hr className='hr-text gradient' data-content='HOME / SUNGLASSES / BEST-SELLERS'/>
        <details className='PhoneFillters'>
            <summary className='summaryFilter'>Filters</summary>
            <p className='filltersForPhone'>
                <SunglassesFilter {...{ filterValues, setFilterValues }}/>
            </p>
        </details>
        <BiSort className='img' onClick={() => setIsSortOpen(!isSortOpen)}/>
        {isSortOpen ? 
        <div className='sortingDiv' onMouseLeave={() => setIsSortOpen(false)}>
            <ul className='sorting'>
                <h4>Sort by:</h4>
                    <div className='checkboxes'>
                        <label class="container"> Newest 
                            <input type="checkbox" id="1" name="newest" value="newest" checked={sort == 'newest'}/>
                            <span className="checkmark" onClick={() => setSort('newest')}></span>
                        </label>
                        <label className="container"> Price Ascending
                            <input type="checkbox" id="2" name="ascending" value="ascending" checked={sort == 'ascending'}/>
                            <span className="checkmark" onClick={() => setSort('ascending')}></span>
                        </label>
                        <label className="container"> Price Descending
                            <input type="checkbox" id="3" name="descending" value="descending" checked={sort == 'descending'}/>
                            <span className="checkmark" onClick={() => setSort('descending')}></span>
                        </label>
                    </div>
            </ul>
        </div>
         : ''}
    </div>
    <div className='sunglassesPage'>
        <div className="filters">
            <SunglassesFilter filterValues={filterValues} setFilterValues={setFilterValues}/>
        </div>
        <div className="catalog-cards">
            {filteredSunglasses.map(item => 
            <div className="allAboutCard" key={item._id}>
                <div className='card'>
                    <div className='imageStock'>
                        <p className='sale'>SALE</p>
                        <Link className='imageContainer' to={`/sunglasses/${item._id}`}>
                            <img src='/images/COPY3.webp' width={300} className='default-image'/>
                            <img src="/images/image.png" width={300} alt="" className='hover-image'/>
                        </Link>
                        <p className='addToCartSUNP' onClick={() => addItem(item._id)}>Add to cart</p>
                    </div>
                    <div className="info">
                        <h3>{item.name}</h3>
                        <div className='prices'>
                            <h5>{item.oldPrice}</h5>
                            <h4>{item.price}</h4>
                            <p>{item.oldPrice ?`-${Math.round((((item.oldPrice - item.price) / item.oldPrice) * 100) / 10) * 10}${'%'}`: ''}</p>
                        </div>
                    </div>
                </div>
            </div>
            )}
            <div className='allAboutCard'>
                <img src="/images/COPY2.webp" alt="ok" width={300}/>
                <div className="info">
                    <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                    <h5>600$$</h5>
                </div>
            </div>
        </div>
    </div>
    </>
    }
    </div>
    </>
  )
}

export default Sunglasses