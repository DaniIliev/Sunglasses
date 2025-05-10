import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BeatLoader from 'react-spinners/BeatLoader'; 
import { RiStarSFill } from "react-icons/ri";
import { FaArrowDown } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import "./Details.css";
import { FaPlus } from "react-icons/fa";
import { GrCaretPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import * as userService from "../../services/userService";
import * as sunglassesService from "../../services/sunglassesService";
import { UserContext } from "../../context/UserContext";
import { addToCart } from "../../utills/sharedFn/addToCart";
import AddToCartPopup from "../Popups/addToCartPopup";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { REACT_APP_API_URL } from "../../env";
import { toast } from "react-toastify"
import { SunglassesContext } from "../../context/SunglassesContext";

const Details = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([])
  const [sunglassesCount, setSunglassesCount] = useState(1);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [isShipingAndReturnOpen, setIsShipingAndReturnOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState([]);
  const [isLike, setIsLike] = useState(false)
  const [isAddToCartPopupOpen, setIsAddToCartPopupOpen] = useState(false)

  const {sunglasses} = useContext(SunglassesContext)
  const { id } = useParams();
  const navigate = useNavigate()

  const { user, setUser } = useContext(UserContext);
  
  const {t, i18n} = useTranslation()

  useEffect(() => {
    if(user?.wishlist != null){
        if(Array.isArray(user.wishlist)){
            if(user.wishlist.includes(id)) setIsLike(true)
        }
    }
    sunglassesService
      .getById(id)
      .then((result) => {
        setItem(result)
        setImages(result.images)
      })
      .catch((error) => console.log(error));
  }, [id, isLike, user]);

  const handleNext = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };


  const handleAddItem = () => {
    setIsAddToCartPopupOpen(true)
    setTimeout(() => {  
        setIsAddToCartPopupOpen(false)
    }, 3000);
    addToCart(user, setUser, id, sunglassesCount)
  }

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/sunglasses/delete/${id}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Грешка при изтриване на очилата.');
      }
  

            toast.success("✅ Очилата бяха успешно изтрити:)!", {
              position: "top-center",  
              autoClose: 3000,        
              hideProgressBar: false, 
              closeOnClick: true,     
              pauseOnHover: true,     
              draggable: true,        
              theme: "colored",    
          });
          navigate('/sunglasses')
      // Може да обновиш UI, например да презаредиш списъка:
      // fetchSunglassesList();
    } catch (error) {
      toast.error("❌ Възникна грешка при изтриването :(",{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };
  const handleLike = () => {
    const data = {
        id: id,
        type: "likeItem",
    }
    userService
        .patchUser(user._id, data)
        .then(result => {
            setUser((prevUser) => ({
            ...prevUser,
            wishlist: [...prevUser.wishlist, id]
            }))
            setIsLike(true)
        })
        .catch(error => console.log("User can not like this item"))
  }

  const handleUnlike = () => {
    const data = {
        id: id,
        type: "unlikeItem"
    }
    userService
    .patchUser(user._id, data)
    .then(result => {
        setUser((prevUser) => ({
        ...prevUser,
        wishlist: prevUser.wishlist.filter((item) => item != id)
        }))
        setIsLike(false)
        console.log("User unlike this item")
    })
    .catch(error => console.log("User can not like this item"))
  }

  return (
    <>
    {isLoading && <BeatLoader  className='loader'/> }
    {isAddToCartPopupOpen ? <AddToCartPopup /> : ''}
      <div className="detailsPage">
        <div className="allAboutImages">
          <div className="infinitiImages">
            <img
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
              className="active"
            />
            <div>
              <p className="left" onClick={handlePrev}>
                <GrCaretPrevious />
              </p>
            </div>
            <div>
              <p className="right" onClick={handleNext}>
                <GrCaretNext />
              </p>
            </div>
          </div>
          <div className="imagesContainer">
          {images.map((item, index) => 
                <img
                src={item}
                className={`${currentImageIndex == index ? "selected" : ""}`}
                alt={`sunglasses-${index}`}
                onClick={() => setCurrentImageIndex(index)}
                key={`${item}_${index}`}
              />
          )}
          </div>
        </div>
        <div className="aboutSunglasses">
          {user?.id == '68092d56a17f6bacd78b1bc4' && 
          <div style={{display: 'flex', alignItems: 'center', gap: 2}}>
            <EditIcon onClick={() => navigate(`/edit/${item._id}`)} sx={{color: 'blue', fontSize: 35}}/>
            <DeleteForeverIcon sx={{color: 'red', fontSize: 35}} onClick={() => deleteItem(item._id)}/>
          </div>
          }
          <h3 style={{textTransform: 'uppercase'}}>{item.name}</h3>
          <p className="reviews">
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
          </p>
          <div className="prices">
            <h5>{item.oldPrice != 'undefined' ? item.oldPrice : ''}</h5>
            <h4>{item.price} лв</h4>
            <p>{item.oldPrice != 'undefined' && item.oldPrice != '' ?`-${Math.round((((item.oldPrice - item.price) / item.oldPrice) * 100) / 10) * 10}${'%'}`: ''}</p>
          </div>
          <div className="counter">
            <p className="plusMinus">
              <FaMinus onClick={() => 
                sunglassesCount > 1 && setSunglassesCount(sunglassesCount - 1)}  
                disabled={sunglassesCount === 1} 
              />
            </p>
            <p>{sunglassesCount}</p>
            <p className="plusMinus">
              <FaPlus onClick={() => setSunglassesCount(sunglassesCount + 1)}/>
            </p>
          </div>
          <div className="addToCardAndLike">
            <p 
              className="addToCart" 
              onClick={user ? handleAddItem : () => navigate('/user/access')}
            >
              {t('detailsPage.addToCart')}
            </p>
            {user !== null && user !== undefined ? (
            isLike ? <FaHeart className="hearth liked" onClick={handleUnlike} /> : 
            <CiHeart className="hearth" onClick={handleLike} />
            ) : null}
          </div>
          <h4>{t('detailsPage.description')}</h4>
          <div className="description">
            <p>
              {item.description}
            </p>
          </div>
        </div>
      </div>
      <div className="information">
        <h4 onClick={() => setIsProductDetailsOpen(!isProductDetailsOpen)}>
        {t('detailsPage.productDetails')} <FaArrowDown />
        </h4>
        {isProductDetailsOpen ? (
          <div className="productDetails">
            <div className="firstSection">
              <p>
                <strong>FRAME SHAPE:</strong> {item.frameShape}
              </p>
              <p>
                <strong>GENDER:</strong> {item.gender}
              </p>
              <p>
                <strong>FRAME MATERIAL:</strong> {item.frameMaterial}
              </p>
              <p>
                <strong>LENS TYPE:</strong> {item.lensType}
              </p>
              <p>
                <strong>UV PROTECTION:</strong> {item.UV_Protection}
              </p>
            </div>
            <img src="/images/sizeModel.webp" alt="sizeModel" className="sizeModelImg" />
            <div className="secondSection">
              <p>
                <strong>FRAME WIDTH:</strong> {item.frameWidth}MM
              </p>
              <p>
                <strong>FRAME HEIGTH:</strong> {item.frameHeight}MM
              </p>
              <p>
                <strong>LENS WIDTH:</strong> {item.lensWidth}MM
              </p>
              <p>
                <strong>Temple Length:</strong> {item.templeLength}MM
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        <h4 onClick={() => setIsShipingAndReturnOpen(!isShipingAndReturnOpen)}>
        {t('detailsPage.description')} <FaShippingFast />
        </h4>
        {isShipingAndReturnOpen ? (
          <div className="shippingANDreturn">
            <p className="shipping">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quibusdam numquam quam hic ea illum voluptate dolore sint, iure
              animi modi ullam? Numquam rem animi vero neque, incidunt earum
              iste ipsa omnis deleniti laudantium id aperiam quas molestiae
              accusantium similique. Hic sequi consequatur iusto qui voluptate
              nesciunt asperiores maiores quia reprehenderit!
            </p>
            <div className="logos">
              <img src="/images/econt-logo.png" alt="econt" width={100} />
              <img src="/images/speedy-logo.png" alt="speedy" width={200} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <h3
        className={`${
          isShipingAndReturnOpen ? "shippingIsOpen" : "youmayalsolike"
        }`}
      >
        {t('detailsPage.YOUMAYALSOLIKE')}
      </h3>
      <div className="catalog-cards maybeLikedCards">
      {sunglasses
          .sort(() => 0.5 - Math.random()) // разбърква масива
          .slice(0, 4) // взима първите 4
          .map((sunglass, index) => (
            <Link className="card" to={`/sunglasses/${sunglass.id}`}>
              <div className="imageStock">
                <p className="sale">SALE</p>
                <div className="imageContainer">
                  <img
                    src={sunglass.images[0]}
                    alt="ok"
                    width={300}
                    className="default-image"
                  />
                  <img
                    src={sunglass.images[1]}
                    width={300}
                    alt=""
                    className="hover-image"
                  />
                </div>
              </div>
              <div className="info">
                <h3>{sunglass.name}</h3>
                <div className="prices">
                  <h5>{sunglass.oldPrice != 'undefined' && item.oldPrice != '' ? `${sunglass.oldPrice}ЛВ` : ''}</h5>
                  <h4>{sunglass.price}ЛВ</h4>
                  <p>{item.oldPrice !== 'undefined' && item.oldPrice != '' ?`-${Math.round((((item.oldPrice - item.price) / item.oldPrice) * 100) / 10) * 10}${'%'}`: ''}</p>
                </div>
              </div>
            </Link>
        ))}
      </div>
    </>
  );
};

export default Details;
