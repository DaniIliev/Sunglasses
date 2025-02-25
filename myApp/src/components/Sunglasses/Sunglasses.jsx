import React, {useContext, useEffect, useState}from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Sunglasses.css'
import BeatLoader from 'react-spinners/BeatLoader'; // Adjust the path if necessary
import SunglassesFilter from '../shared/SunglassesFilter';
import { BiSort } from "react-icons/bi";
import { addToCart } from '../../utills/sharedFn/addToCart';
import { UserContext } from '../../context/UserContext';
import AddToCartPopup from '../Popups/addToCartPopup';
import { SunglassesContext } from '../../context/SunglassesContext';
import { sortSunglasses } from '../../utills/sortSunglasses';
import { filterSunglasses } from '../../utills/filterSunglasses';
import Pagination from '../shared/Pagination/Pagination';

const Sunglasses = () => {
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [isAddToCartPopupOpen, setIsAddToCartPopupOpen] = useState(false)

    const { user, setUser } = useContext(UserContext);
    const {sunglasses, isLoading, filteredSunglasses, setFilteredSunglasses, filterValues, setFilterValues} = useContext(SunglassesContext)

    const navigate = useNavigate()

    useEffect(() => {
        // let sortedSunglasses = [...sunglasses];

        // if(filterValues.sort == 'ascending'){
        //     sortedSunglasses = sortedSunglasses.sort((a, b) => a.price - b.price)
        // }else if(filterValues.sort == 'descending'){
        //     sortedSunglasses = sortedSunglasses.sort((a, b) => b.price - a.price)
        // }else if(filterValues.sort == "newest"){
        //     sortedSunglasses = sortedSunglasses.sort((a, b) => a.createdAt - b.createdAt)
        // }

        // const isFilterEmpty = 
        //     filterValues.frameShapes.length === 0 &&
        //     filterValues.frameColor.length === 0 &&
        //     filterValues.lensType.length === 0 &&
        //     !filterValues.minPrice &&
        //     !filterValues.maxPrice &&
        //     filterValues.query.length === 0;

        // const filterSunglasses = isFilterEmpty
        //         ? sortedSunglasses 
        //         : sortedSunglasses.filter(sunglass => {
        //             const shapeMatch = filterValues.frameShapes.length === 0 || filterValues.frameShapes.includes(sunglass.frameShape);
        //             const colorMatch = filterValues.frameColor.length === 0 || filterValues.frameColor.includes(sunglass.frameColor);
        //             const lensMatch = filterValues.lensType.length === 0 || filterValues.lensType.includes(sunglass.lensType);
        //             const priceMatch =
        //                 (!filterValues.minPrice || sunglass.price >= filterValues.minPrice) &&
        //                 (!filterValues.maxPrice || sunglass.price <= filterValues.maxPrice);
        //             const searchMatch =
        //                 filterValues.query.length === 0 ||
        //                 sunglass.name.toLowerCase().includes(filterValues.query) ||
        //                 sunglass.frameShape.toLowerCase().includes(filterValues.query) ||
        //                 sunglass.frameColor.toLowerCase().includes(filterValues.query) ||
        //                 sunglass.lensType.toLowerCase().includes(filterValues.query);

        //             return shapeMatch && colorMatch && lensMatch && priceMatch && searchMatch;
        // });
        let sortedSunglasses = sortSunglasses(sunglasses, filterValues.sort);
        let finalSunglasses = filterSunglasses(sortedSunglasses, filterValues);
        setFilteredSunglasses(finalSunglasses);
    },[filterValues, sunglasses]);

    
    const updateSort = (newSort) => {
        setFilterValues(prev => ({ ...prev, sort: newSort }));
    };

    const updateGender = (gender) => {
        setFilterValues(prev => ({ ...prev, gender: gender }));
    }

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
        {/* <Pagination items={filteredSunglasses}/> */}
        <details className='PhoneFillters'>
            <summary className='summaryFilter'>Filters</summary>
            <p className='filltersForPhone'>
                <SunglassesFilter/>
            </p>
        </details>
        <BiSort className='img' onClick={() => setIsSortOpen(!isSortOpen)}/>
        {isSortOpen ? 
        <div className='sortingDiv' onMouseLeave={() => setIsSortOpen(false)}>
            <ul className='sorting'>
                <h4>Sort by:</h4>
                    <div className='checkboxes'>
                        <label class="container"> Newest 
                            <input type="checkbox" id="1" name="newest" value="newest" checked={filterValues.sort == 'newest'}/>
                            <span className="checkmark" onClick={() => updateSort('newest')}></span>
                        </label>
                        <label className="container"> Price Ascending
                            <input type="checkbox" id="2" name="ascending" value="ascending" checked={filterValues.sort == 'ascending'}/>
                            <span className="checkmark" onClick={() => updateSort('ascending')}></span>
                        </label>
                        <label className="container"> Price Descending
                            <input type="checkbox" id="3" name="descending" value="descending" checked={filterValues.sort == 'descending'}/>
                            <span className="checkmark" onClick={() => updateSort('descending')}></span>
                        </label>
                    </div>
            </ul>
        </div>
         : ''}
    </div>
    <div className='sunglassesPage'>
        <div className="filters">
            <SunglassesFilter />
        </div>
        <div className="catalog-cards">
            {filteredSunglasses.map(item => 
            <div className="allAboutCard" key={item._id}>
                <div className='card'>
                    <div className='imageStock'>
                        <p className='sale'>SALE</p>
                        <Link className='imageContainer' to={`/sunglasses/${item._id}`}>
                            <img src={item.images[0]} className='default-image'/>
                            <img src={item.images[1]} alt="" className='hover-image'/>
                        </Link>
                        <p className='addToCartSUNP' 
                        onClick={user ? () => addItem(item._id) : () => navigate('/user/access')}
                        >Add to cart
                        </p>
                    </div>
                    <div className="info">
                        <h3>{item.name}</h3>
                        <div className='prices'>
                            <h5>{item.oldPrice}</h5>
                            <h4>{item.price} лв</h4>
                            <p>{item.oldPrice ?`-${Math.round((((item.oldPrice - item.price) / item.oldPrice) * 100) / 10) * 10}${'%'}`: ''}</p>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
    </>
    }
    </div>
    </>
  )
}

export default Sunglasses