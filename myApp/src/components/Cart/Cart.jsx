import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { FaMinus } from "react-icons/fa6";
import "../Details/Details.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import BeatLoader from 'react-spinners/BeatLoader'; // Adjust the path if necessary
import { fetchItemsInCart } from "../../utills/sharedFn/fetchItemsInCart";
import { removeFromCart } from "../../utills/sharedFn/removeFromCart";
import { updateCount } from "../../utills/sharedFn/updateCount";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { user, setUser } = useContext(UserContext);
  const [allItems, setAllItems] = useState([]);
  const [sumOfOldPrice, setSumOldPrice] = useState(0);
  const [totalSum, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {t, i18n} = useTranslation()
  
  useEffect(() => {
    setIsLoading(true)
    if (user) {
      fetchItemsInCart(user).then((items) => {
        setAllItems(items);
        const oldPriceSum = items
          .map((item) => Number(item.oldPrice) * Number(item.quantity))
          .reduce((sum, price) => sum + price, 0);
        const totalPrice = items
          .map((item) => Number(item.price) * Number(item.quantity))
          .reduce((sum, price) => sum + price, 0);
        setSumOldPrice(oldPriceSum);
        setTotalPrice(totalPrice);
        setIsLoading(false)
      });
    }
  }, [user]);

  const onHandleRemove = (el) => {
    removeFromCart(user, setUser, el);
  };

  const updateCnt = (id, quantity) => {
    updateCount(user, setUser, id, quantity);
  };
  const handleNavigate = () => {
    const dataTransfer = {
      allItems,
    };
    navigate("/delivery", { state: dataTransfer });
  };
  return (
    <>
    {isLoading && <BeatLoader  className='loader'/> }
      <div className="cart">
        <div className="titles">
          <p>HOME / CART</p>
          <h2>{t('shoppingCart.shoppingCartTitle')}</h2>
        </div>
        {allItems?.length == 0 ?
        <div className="cartIsEmty">
            <img src="/images/shoppingCart.png" alt="shoppingCart" width={250}/>
            <h1>{t('shoppingCart.textIfNoAddedItems')}</h1>
            <Link to='/sunglasses'>{t('shoppingCart.returnToShop')}</Link>
        </div>
        :
        <>
        <table className="table">
          <thead>
            <tr>
              <th>{t('shoppingCart.photo')}</th>
              <th>{t('shoppingCart.productName')}</th>
              <th>{t('shoppingCart.quantity')}</th>
              <th>{t('shoppingCart.unitPrice')}</th>
              <th>{t('shoppingCart.totalPrice')}</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src="/images/COPY1.webp" alt="" width={100} />
                </td>
                <td>{item.name}</td>
                <td>
                  <div className="counterTD">
                    <div className="counter">
                      <p className="plusMinus">
                        <FaMinus
                          onClick={() =>
                            item.quantity > 1 &&
                            updateCnt(item._id, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                        />
                      </p>
                      <p>{item.quantity}</p>
                      <p className="plusMinus">
                        <FaPlus
                          onClick={() => updateCnt(item._id, item.quantity + 1)}
                        />
                      </p>
                    </div>
                    <IoMdCloseCircleOutline
                      className="del"
                      onClick={() => onHandleRemove(item._id)}
                    />
                  </div>
                </td>
                <td>
                  <div className="prices">
                    <h5>{item.oldPrice ? item.oldPrice : ""}</h5>
                    <h4>{item.price}</h4>
                    <p>
                      {item.oldPrice
                        ? `-${Math.round(
                            ((((item.oldPrice - item.price) / item.oldPrice) *
                              100) /
                              10) *
                              10
                          )}%`
                        : ""}
                    </p>
                  </div>
                </td>
                <td>
                  <h4>{item.price * item.quantity}</h4>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="orderComplite">
          <div className="discount">
            <h4>Използвай бонус код</h4>
            <div className="discountField">
              <p className="text">
                Въведете бонус кода тук и получете допълнителна отстъпка
              </p>
              <FaArrowRight className="arr1" />
              <FaArrowRight className="arr" />
              <FaArrowRight className="arr" />
              <div className="field">
                <input type="text" id="discount" name="discount" />
                <p className="btnDiscount">Използвай бонус код</p>
              </div>
            </div>
          </div>
          <div className="totalCount">
            <p>{t('shoppingCart.totalPrice')}: {sumOfOldPrice.toFixed(2)}</p>
            <p style={{ color: "red" }}>
            {t('shoppingCart.promotion')}: 
              {sumOfOldPrice
                ? ` -${sumOfOldPrice - totalSum} (-${
                    Math.round(
                      (((sumOfOldPrice - totalSum) / sumOfOldPrice) * 100) / 10
                    ) * 10
                  }${"%"})`
                : ""}
            </p>
            <p>{t('shoppingCart.totalPrice')}: {totalSum.toFixed(2)}</p>
            <p>
            {t('shoppingCart.delivery')}: {totalSum > 150 ? (0.0).toFixed(2) : (6.5).toFixed(2)}
            </p>
            <p>
            {t('shoppingCart.pay')}: {totalSum > 150
                ? totalSum.toFixed(2)
                : (totalSum + 6.5).toFixed(2)}
            </p>
            <p className="payBTN" onClick={handleNavigate}>
            {t('shoppingCart.payBTN')}
            </p>
          </div>
        </div>
        </>
        }
      </div>
    </>
  );
};

export default Cart;
