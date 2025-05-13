// import React, { useContext, useEffect, useState,  } from 'react'
// import './LoveCartList.css'
// import { FaHeartCirclePlus } from "react-icons/fa6";
// import { FaMedal } from "react-icons/fa";
// import { Link } from 'react-router-dom';
// import { CiHeart } from "react-icons/ci";
// import { UserContext } from '../../context/UserContext';
// import { useTranslation } from 'react-i18next';
// import { getById } from '../../services/sunglassesService';
// import { SunglassesContext } from '../../context/SunglassesContext';

// const LoveCartList = () => {
//     const {user} = useContext(UserContext)
//     const [wishingCards, setWishingCards] = useState([])

//     const {t, i18n} = useTranslation()
//     const {sunglasses} = useContext(SunglassesContext)
//     useEffect(() => {
//         if (!user?.wishlist) return;

//         Promise.all(user.wishlist.map(itemID => getById(itemID)))
//             .then(results => setWishingCards(results))
//             .catch(error => console.error("Error fetching wishlist items:", error));
//     },[user])
//   return (
//     <div className='LoveCartPage'>
//         {console.log(wishingCards)}
//         <div className="contentWishlist">

//             <p className='titels'>home / wishlist</p>
//             <div>
//             <h1>{t('wishlistPage.title')}</h1>
//             <p>{t('wishlistPage.underTitle')}</p>
//             </div>
//         </div>
//         {user == undefined &&
//         <div className='newUserBox'>
//             <div className="signInAcc">
//                 <h2>{t('wishlistPage.myACC')}</h2>
//                 <p>{t('wishlistPage.access')}</p>
//                 <Link to='/user/access'><p className="wishlistBTN">Sign in</p></Link>
//             </div>
//             <div className="createWishList">
//                 <h2>{t("wishlistPage.startWishlist")}</h2>
//                 <p>{t("wishlistPage.startWishlistP2")}</p>
//                 <div className="buttonsDivWishlist">
//                     <Link to={'/sunglasses'}><p className='wishlistBTN'>Shop Men's</p></Link>
//                     <Link to={'/sunglasses'}><p className='wishlistBTN'>Shop Women's</p></Link>
//                 </div>
//             </div>
//         </div>
//         }   
//         {user != undefined && user?.wishlist.length == 0 &&
//         <div className="wishlistCreate">
//             <div className="startWishlist">
//                 <Link to='/sunglasses'><FaHeartCirclePlus className='wishHeart'/></Link>
//                 <div>
//                     <h2>{t("wishlistPage.startWishlist")}</h2>
//                     <p>{t("wishlistPage.startWishlistP")}</p>
//                 </div>
//             </div>
//             <div className="bestsellers">
//       {sunglasses
//           .sort(() => 0.5 - Math.random()) // разбърква масива
//           .slice(0, 2) // взима първите 4
//           .map((sunglass, index) => (
//             <Link className="card" to={`/sunglasses/${sunglass.id}`}>
//               <div className="imageStock">
//                 <div className="imageContainer">
//                   <img
//                     src={sunglass.images[0]}
//                     alt="ok"
//                     width={300}
//                     className="default-image"
//                   />
//                   <img
//                     src={sunglass.images[1]}
//                     width={300}
//                     alt=""
//                     className="hover-image"
//                   />
//                 </div>
//               </div>
//               <div className="info">
//                 <h3>{sunglass.name}</h3>
//                 <div className="prices">
//                   <h5>{sunglass.oldPrice != 'undefined' && sunglass.oldPrice != '' ? `${sunglass.oldPrice}ЛВ` : ''}</h5>
//                   <h4>{sunglass.price}ЛВ</h4>
//                   <p>{sunglass.oldPrice !== 'undefined' && sunglass.oldPrice != '' ?`-${Math.round((((sunglass.oldPrice - sunglass.price) / sunglass.oldPrice) * 100) / 10) * 10}${'%'}`: ''}</p>
//                 </div>
//               </div>
//             </Link>
//         ))}
//             </div>
//         </div>
//         }
//         {user != undefined && user?.wishlist.length > 0 &&
//         <>
//         <h2 className='yourWishingCardsTitle'>Your Wishing Cards</h2>
//         <div className="catalog-cards">
//             {wishingCards.length > 0 && wishingCards.map(item => 
//               <div className="allAboutCard" key={item._id}>
//               <div className='card'>
//                   <div className='imageStock'>
//                       {console.log(item)}
//                       <Link className='imageContainer' to={`/sunglasses/${item._id}`}>
//                           <img src={item?.images[0]} className='default-image'/>
//                           <img src={item?.images[1]} alt="" className='hover-image'/>
//                       </Link>
//                       <p className='addToCartSUNP' 
//                       onClick={user ? () => addItem(item._id) : () => navigate('/user/access')}
//                       >Add to cart
//                       </p>
//                   </div>
//                   <div className="info">
//                       <h3>{item.name}</h3>
//                       <div className='prices'>
//                           <h5>{item.oldPrice}</h5>
//                           <h4>{item.price} лв</h4>
//                           <p>{item.oldPrice ?`-${Math.round((((item.oldPrice - item.price) / item.oldPrice) * 100) / 10) * 10}${'%'}`: ''}</p>
//                       </div>
//                   </div>
//               </div>
//           </div>
//             )}
//         </div>
//         </>
//     }
//     </div>
//   )
// }

// export default LoveCartList
import React, { useContext, useEffect, useState } from 'react'
import './LoveCartList.css'
import { FaHeartCirclePlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { getById } from '../../services/sunglassesService';
import { SunglassesContext } from '../../context/SunglassesContext';
import { Button, Grid, Typography, Card, CardContent, CardMedia, Box, CardActionArea} from '@mui/material';

const LoveCartList = () => {
    const { user } = useContext(UserContext)
    const [wishingCards, setWishingCards] = useState([])

    const { t } = useTranslation()
    const { sunglasses } = useContext(SunglassesContext)

    useEffect(() => {
        if (!user?.wishlist) return;

        Promise.all(user.wishlist.map(itemID => getById(itemID)))
            .then(results => setWishingCards(results))
            .catch(error => console.error("Error fetching wishlist items:", error));
    }, [user])

    return (
        <div className='LoveCartPage'>
            <div className="contentWishlist">
                <Typography variant="h6" className="titels">home / wishlist</Typography>
                <div>
                    <Typography variant="h4">{t('wishlistPage.title')}</Typography>
                    <Typography variant="body1">{t('wishlistPage.underTitle')}</Typography>
                </div>
            </div>

            {user == undefined &&
                <div className='newUserBox'>
                    <div className="signInAcc">
                        <Typography variant="h5">{t('wishlistPage.myACC')}</Typography>
                        <Typography variant="body2">{t('wishlistPage.access')}</Typography>
                        <Link to='/user/access'><Button variant="outlined">{t('Sign in')}</Button></Link>
                    </div>
                    <div className="createWishList">
                        <Typography variant="h5">{t("wishlistPage.startWishlist")}</Typography>
                        <Typography variant="body2">{t("wishlistPage.startWishlistP2")}</Typography>
                        <div className="buttonsDivWishlist">
                            <Link to={'/sunglasses'}>
                                <Button variant="contained">{t("View Catalog")}</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            }

            {user != undefined && user?.wishlist.length == 0 &&
                <div className="wishlistCreate">
                    <div className="startWishlist">
                        <Link to='/sunglasses'><FaHeartCirclePlus className='wishHeart' /></Link>
                        <div>
                            <Typography variant="h6">{t("wishlistPage.startWishlist")}</Typography>
                            <Typography variant="body1">{t("wishlistPage.startWishlistP")}</Typography>
                        </div>
                    </div>
                    <div className="bestsellers">
                        {sunglasses
                            .sort(() => 0.5 - Math.random()) // разбърква масива
                            .slice(0, 2) // взима първите 2
                            .map((sunglass, index) => (
                                <Link className="card" to={`/sunglasses/${sunglass._id}`} key={index}>
                                    <Card sx={{ maxWidth: 300 }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={sunglass.images[0]}
                                            alt={sunglass.name}
                                            sx={{
                                                objectFit: 'contain'
                                            }}
                                        />
                                        <CardContent sx={{display: 'flex', alignItems: 'center',flexDirection: 'column', justifyContent: 'center'}}>
                                            <Typography variant="h6" sx={{textTransform: 'uppercase'}}>{sunglass.name}</Typography>
                                            <Typography variant="h5">{sunglass.price} ЛВ</Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                    </div>
                </div>
            }

            {user != undefined && user?.wishlist.length > 0 &&
                <>
                    <Typography variant="h4" className='yourWishingCardsTitle'>{t("Моите желани слънчеви очила")}</Typography>
                    <Grid container spacing={2}>
                        {wishingCards.length > 0 && wishingCards.map(item => (
                            <Grid item xs={12} sm={6} md={4} key={item._id}>
                                <Card sx={{ maxWidth: 300, margin: 'auto' }}>
                                    <CardActionArea component={Link} to={`/sunglasses/${item._id}`}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={item?.images[0]}
                                            alt={item.name}
                                            sx={{ objectFit: 'contain' }}
                                        />
                                    </CardActionArea>
                                    <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                        <Typography variant="h6" sx={{textTransform: 'uppercase'}}>{item.name}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                {item.price} лв
                                            </Typography>
                                            </Box>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{ marginTop: 2 }}
                                            onClick={user ? () => addItem(item._id) : () => navigate('/user/access')}
                                        >
                                            {t('Add to cart')}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            }
        </div>
    )
}

export default LoveCartList
