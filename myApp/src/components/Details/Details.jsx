import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BeatLoader from 'react-spinners/BeatLoader'; // Adjust the path if necessary
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

// const images = [
//   "/images/COPY1.webp",
//   "/images/COPY2.webp",
//   "/images/COPY3.webp",
//   "/images/COPY4.webp",
// ];

const Details = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([])
  const [sunglassesCount, setSunglassesCount] = useState(1);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [isShipingAndReturnOpen, setIsShipingAndReturnOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState([]);
  const [isLike, setIsLike] = useState(false)
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [isAddToCartPopupOpen, setIsAddToCartPopupOpen] = useState(false)
  
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
    {console.log(images)}
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
            <img
              src="/images/COPY1.webp"
              className={`${currentImageIndex == 0 ? "selected" : ""}`}
              alt=""
              onClick={() => setCurrentImageIndex(0)}
            />
            <img
              src="/images/COPY2.webp"
              alt=""
              className={`${currentImageIndex == 1 ? "selected" : ""}`}
              onClick={() => setCurrentImageIndex(1)}
            />
            <img
              src="/images/COPY3.webp"
              alt=""
              className={`${currentImageIndex == 2 ? "selected" : ""}`}
              onClick={() => setCurrentImageIndex(2)}
            />
            <img
              src="/images/COPY4.webp"
              alt=""
              className={`${currentImageIndex == 3 ? "selected" : ""}`}
              onClick={() => setCurrentImageIndex(3)}
            />
          </div>
        </div>
        <div className="aboutSunglasses">
          <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
          <p className="reviews">
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
          </p>
          <div className="prices">
            <h5>600,00$</h5>
            <h4>500,00$</h4>
            <p>-10%</p>
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
            <p className="addToCart" onClick={handleAddItem}>
              {t('detailsPage.addToCart')}
            </p>
            {isLike ?  <FaHeart className="hearth" onClick={() => handleUnlike()}/> : 
                 <CiHeart className="hearth" onClick={() => handleLike()}/>
            }
          </div>
          <h4>{t('detailsPage.description')}</h4>
          <div className="description">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Corporis, hic. Iste, itaque fugit odit accusantium est esse
              corrupti rerum voluptates labore corporis non reiciendis, amet
              obcaecati maxime id libero architecto delectus cupiditate
              voluptatem. Facere sapiente vitae modi magni repudiandae dolore
              placeat rem earum officia? Ipsam nulla magnam sint ex numquam?
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
                <strong>FRAME SHAPE:</strong> AVIATOR
              </p>
              <p>
                <strong>GENDER:</strong> UNI-SEX
              </p>
              <p>
                <strong>FRAME MATERIAL:</strong> METAL
              </p>
              <p>
                <strong>LENS TYPE:</strong> POLARIZED
              </p>
              <p>
                <strong>UV PROTECTION:</strong> CATEGORY 2
              </p>
            </div>
            <img src="/images/sizeModel.webp" alt="" />
            <div className="secondSection">
              <p>
                <strong>FRAME WIDTH:</strong> 140MM
              </p>
              <p>
                <strong>FRAME HEIGTH:</strong> 53MM
              </p>
              <p>
                <strong>LENS WIDTH:</strong> 56MM
              </p>
              <p>
                <strong>Temple Length:</strong> 145MM
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
      <div className="catalog-cards">
        <Link className="card" to="/sunglasses/1">
          <div className="imageStock">
            <p className="sale">SALE</p>
            {/* <CiHeart className='like'/>  */}
            <div className="imageContainer">
              <img
                src="/images/COPY1.webp"
                alt="ok"
                width={300}
                className="default-image"
              />
              <img
                src="/images/image.png"
                width={300}
                alt=""
                className="hover-image"
              />
            </div>
          </div>
          <div className="info">
            <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
            <div className="prices">
              <h5>600,00$</h5>
              <h4>500,00$</h4>
              <p>-10%</p>
            </div>
          </div>
        </Link>
        <Link className="card" to="/sunglasses/1">
          <div className="imageStock">
            <p className="sale">SALE</p>
            {/* <CiHeart className='like'/>  */}
            <div className="imageContainer">
              <img
                src="/images/COPY1.webp"
                alt="ok"
                width={300}
                className="default-image"
              />
              <img
                src="/images/image.png"
                width={300}
                alt=""
                className="hover-image"
              />
            </div>
          </div>
          <div className="info">
            <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
            <div className="prices">
              <h5>600,00$</h5>
              <h4>500,00$</h4>
              <p>-10%</p>
            </div>
          </div>
        </Link>
        <Link className="card" to="/sunglasses/1">
          <div className="imageStock">
            <p className="sale">SALE</p>
            {/* <CiHeart className='like'/>  */}
            <div className="imageContainer">
              <img
                src="/images/COPY1.webp"
                alt="ok"
                width={300}
                className="default-image"
              />
              <img
                src="/images/image.png"
                width={300}
                alt=""
                className="hover-image"
              />
            </div>
          </div>
          <div className="info">
            <h3>NO BIGGIE | PEWTER-SMOKE MONO</h3>
            <div className="prices">
              <h5>600,00$</h5>
              <h4>500,00$</h4>
              <p>-10%</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Details;
