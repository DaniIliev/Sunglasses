import React, {useContext, useEffect, useState}from 'react'
import { Link } from 'react-router-dom';
import './Sunglasses.css'
import { CiHeart } from "react-icons/ci";
import SunglassesFilter from '../shared/SunglassesFilter';
import { BiSort } from "react-icons/bi";
import * as sunglassesService from '../../services/sunglassesService'
import { addToCart } from '../../utills/sharedFn/addToCart';
import { UserContext } from '../../context/UserContext';
import AddToCartPopup from '../Popups/addToCartPopup';

const Sunglasses = () => {
    const [sunglasses, setSunglasses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [sort, setSort] = useState('standart')
    const [isAddToCartPopupOpen, setIsAddToCartPopupOpen] = useState(false)

    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        sunglassesService.getAll()
            .then(result => {
                setSunglasses(result)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

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
    <div className='div-hr-text-gradient-and-imgFilter'>
        <hr className='hr-text gradient' data-content='HOME / SUNGLASSES / BEST-SELLERS'/>
        <BiSort className='img' onClick={() => setIsSortOpen(!isSortOpen)}/>
        {isSortOpen ? 
        <div className='sortingDiv' onMouseLeave={() => setIsSortOpen(false)}>
            <ul className='sorting'>
                <h4>Sort by:</h4>
                    <div className='checkboxes'>
                        <label class="container"> Standart Sorting 
                            <input type="checkbox" id="1" name="standart" value="standart" checked={sort == 'standart'}/>
                            <span className="checkmark" onClick={() => setSort('standart')}></span>
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
            <SunglassesFilter />
        </div>
        <div className="catalog-cards">
            {sunglasses.map(item => 
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
                            <h5>{item.price}</h5>
                            <h4>{item.oldPrice}</h4>
                            <p>{item.oldPrice ?`-${Math.round((((item.oldPrice - item.price) / item.oldPrice) * 100) / 10) * 10}${'%'}`: ''}</p>
                        </div>
                    </div>
                </div>
            </div>
            )}
            {/* <Link className='card' to='/sunglasses/1'>
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
            </Link> */}
            <div className='allAboutCard'>
                <img src="/images/COPY2.webp" alt="ok" width={300}/>
                <div className="info">
                    <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                    <h5>600$$</h5>
                </div>
            </div>
            <div className='allAboutCard'>
                <img src="/images/COPY3.webp" alt="ok" width={300}/>
                <div className="info">
                    <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                    <h5>600$$</h5>
                </div>
            </div>
            <div className='allAboutCard'>
                <img src="/images/COPY4.webp" alt="ok" width={300}/>
                <div className="info">
                    <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                    <h5>600$$</h5>
                </div>
            </div>
            <div className='allAboutCard'>
                <img src="/images/COPY5.webp" alt="ok" width={300}/>
                <div className="info">
                    <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                    <h5>600$$</h5>
                </div>
            </div>
            <div className='allAboutCard'>
                <img src="/images/COPY6.webp" alt="ok" width={300}/>
                <div className="info">
                    <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
                    <h5>600$$</h5>
                </div>
            </div>
            <div className='allAboutCard'>
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