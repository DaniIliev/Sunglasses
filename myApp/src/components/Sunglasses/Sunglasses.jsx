import React, {useContext, useEffect, useRef, useState}from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Sunglasses.css'
import ClipLoader from 'react-spinners/ClipLoader'; // Adjust the path if necessary
import SunglassesFilter from '../shared/SunglassesFilter';
import { BiSort } from "react-icons/bi";
import { addToCart } from '../../utills/sharedFn/addToCart';
import { UserContext } from '../../context/UserContext';
import AddToCartPopup from '../Popups/addToCartPopup';
import { SunglassesContext } from '../../context/SunglassesContext';
import { sortSunglasses } from '../../utills/sortSunglasses';
import { filterSunglasses } from '../../utills/filterSunglasses';
import {Card,CardActionArea,Box,CardMedia, Typography ,CardContent,Button} from '@mui/material'
const Sunglasses = () => {
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [isAddToCartPopupOpen, setIsAddToCartPopupOpen] = useState(false)

    const { user, setUser } = useContext(UserContext);
    const {sunglasses, isLoading, filteredSunglasses, setFilteredSunglasses, filterValues, setFilterValues} = useContext(SunglassesContext)
    const [addedProduct, setAddedProduct] = useState(null);
    const navigate = useNavigate()

    const SunglassesCard = React.memo(({ item, addItem, user }) => {
    
      const discount =
        item.oldPrice && item.oldPrice !== 'undefined'
          ? `-${Math.round((((item.oldPrice - item.price) / item.oldPrice) * 100) / 10) * 10}%`
          : '';
    
      return (
        <Card
          sx={{
            maxWidth: 400,
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s',
            '&:hover': { transform: 'translateY(-5px)' },
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <CardActionArea component={Link} to={`/sunglasses/${item._id}`}>
            <Box sx={{ position: 'relative', height: 300, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                height="100"
                image={item.images?.[0]}
                alt={item.name}
                sx={{
                  transition: 'opacity 0.3s',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  // objectFit: 'contain',
                  objectFit: 'fill',
                  zIndex: 1,
                }}
              />
              <CardMedia
                component="img"
                image={item.images?.[1]}
                alt=""
                sx={{
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  // objectFit: 'contain',
                  objectFit: 'fill',
                  zIndex: 2,
                  '&:hover': { opacity: 1 },
                }}
                className="hover-image"
              />
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  backgroundColor: '#e53935',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: 1,
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  zIndex: 3,
                }}
              >
                SALE
              </Typography>
            </Box>
          </CardActionArea>
    
          <CardContent>
            <Typography variant="h6" sx={{textTransform: 'uppercase', textAlign: 'center'}} component="div" gutterBottom>
              {item.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              {item.oldPrice && item.oldPrice !== 'undefined' && (
                <Typography
                  variant="body2"
                  sx={{ textDecoration: 'line-through', color: '#888' }}
                >
                  {item.oldPrice} лв
                </Typography>
              )}
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {item.price} лв
              </Typography>
              {discount && (
                <Typography
                  variant="body2"
                  sx={{ color: '#e53935', marginLeft: 'auto', fontWeight: 'medium' }}
                >
                  {discount}
                </Typography>
              )}
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 2, borderRadius: 2 }}
              onClick={user ? () => addItem(item._id, item) : () => navigate('/user/access')}
            >
              Добави в количката
            </Button>
          </CardContent>
        </Card>
      );
    });
    


    useEffect(() => {
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

    const addItem = (id, product) => {
        setIsAddToCartPopupOpen(true)
        setAddedProduct(product)
        setTimeout(() => {  
            setIsAddToCartPopupOpen(false)
        }, 3000);

        addToCart(user, setUser, id, 1)
    }
  return (
    <>
  {isAddToCartPopupOpen && (
    <AddToCartPopup
      product={addedProduct}
      onClose={() => setIsAddToCartPopupOpen(false)}
    />
  )}
    <div className='page'>
    <>
    <div className='div-hr-text-gradient-and-imgFilter'>
        <hr className='hr-text gradient' data-content='HOME / SUNGLASSES / BEST-SELLERS'/>
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
                        <label className="container"> Newest 
                            <input type="checkbox" id="1" name="newest" value="newest" checked={filterValues.sort == 'newest'} onChange={() => updateSort('newest')}/>
                            <span className="checkmark" onClick={() => updateSort('newest')}></span>
                        </label>
                        <label className="container"> Price Ascending
                            <input type="checkbox" id="2" name="ascending" value="ascending" checked={filterValues.sort == 'ascending'} onChange={() => updateSort('ascending')}/>
                            <span className="checkmark" onClick={() => updateSort('ascending')}></span>
                        </label>
                        <label className="container"> Price Descending
                            <input type="checkbox" id="3" name="descending" value="descending" checked={filterValues.sort == 'descending'}  onChange={() => updateSort('descending')}/>
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
        {isLoading ?
        <ClipLoader className='loader'/> : (
          filteredSunglasses.map(item => 
                <SunglassesCard 
                  key={item._id} 
                  item={item} 
                  addItem={addItem} 
                  user={user}/>
                )
        )}
        </div>
    </div>
    </>
    </div>
    </>
  )
}

export default Sunglasses