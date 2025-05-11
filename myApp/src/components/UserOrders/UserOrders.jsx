import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./UserOrders.css";
import { FaUserTie } from "react-icons/fa";
import * as purchaseService from '../../services/purchaseService'
import { IoIosCloseCircle } from "react-icons/io";
import {OrderDetailsModal} from './OrderDetailsModal'
import { useTranslation } from "react-i18next";
const UserOrders = () => {
  const { user } = useContext(UserContext);
  const [purchase, setPurchase] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {t} = useTranslation()
  useEffect(() => {

  }, [user]);

  const handleClick = (id) => {
    setIsModalOpen(true)
    purchaseService.getPurchaseById(id)
        .then((result) => setPurchase(result))

  }
  return (
    <>
      <hr
        className="hr-text gradient"
        data-content="HOME / SUNGLASSES / ORDERS"
      />
      <div className="ordersPage">
        <table className="tableUser">
          <thead>
            <tr>
              <th></th>
              <th>{t('Имейл')}</th>
              <th>{t('Телефон')}</th>
              <th>{t('Номер на улица')}</th>
            </tr>
          </thead>
          <tbody className="tbodyUserOrder">
            <tr>
              <td className="namesAndIcon">
                <p>
                  <FaUserTie />
                </p>
                <p>
                  {user?.orders && user.orders.length > 0
                    ? user.orders[user.orders?.length - 1]?.firstname
                    : ""}
                </p>
                <p>
                  {user?.orders && user.orders.length > 0
                    ? user.orders[user.orders?.length - 1]?.lastname
                    : ""}
                </p>
              </td>
              <td>
                {user?.orders && user.orders.length > 0
                  ? user.orders[user.orders?.length - 1]?.phoneNumber
                  : ""}
              </td>
              <td>
                {user?.orders && user.orders.length > 0
                  ? user.orders[user.orders?.length - 1]?.email
                  : ""}
              </td>
              <td className="userAdress">
                {user?.orders && user.orders.length > 0
                  ? user.orders[user.orders?.length - 1]?.address
                  : ""}
                {` - ${
                  user?.orders && user.orders.length > 0
                    ? user.orders[user.orders?.length - 1]?.addressNum
                    : ""
                }`}
                {user?.orders && user.orders.length > 0
                  ? user.orders[user.orders?.length - 1]?.city
                  : ""}
                {user?.orders && user.orders.length > 0
                  ? user.orders[user.orders?.length - 1]?.zipCode
                  : ""}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ textAlign: "center", padding: "1em" }}>
          <h1 className="yourOrders">{t('Вашите поръчки')}</h1>
          <p>
            {user?.username}, {t('тук може да проследите статуса на поръчките си.')}
          </p>
        </div>
        <table style={{ margin: '0 auto', width: '95%'}} className="table tableOrders">
          <thead>
            <tr>
              <th>{t('Номер на поръчка')}</th>
              <th>{t('Обща сума')}</th>
              <th>{t('Дата')}</th>
              <th>{t('Информация')}</th>
              <th>{t('Статус')}</th>
            </tr>
          </thead>
          <tbody>
            {user?.orders && user.orders.length > 0 ? (
              user.orders.map((order) => (
                <tr key={order._id} >
                  <td>#{order.orderCode}</td>
                  <td>{order.totalPurchasePrice} лв</td>
                  <td>{order.purchaseDate}</td>
                  <td>
                    <p>{t('Начин на плащане')}</p>
                    <p>
                    {t('Доставка до')}:{" "}
                      {order.additionalInfo === "personalAddress"
                        ? "личен адрес"
                        : order.additionalInfo === "speedyAddress"
                        ? "офис на спийди"
                        : order.additionalInfo === "econtAddress"
                        ? "офис на еконт"
                        : ""}
                    </p>
                  </td>
                  <td>{t('Поръчката е направена')}</td>
                  <td className="productDetailsBTN" onClick={() => handleClick(order._id)}>{t('Детайли за поръчката')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">{t('Няма налични поръчки')}</td>
              </tr>
            )}
          </tbody>
        </table>
        {isModalOpen && 
        // <div className="modalOrder">
        //     <IoIosCloseCircle className="closeDetailsOrderBTN" onClick={() => setIsModalOpen(false)}/>
        //   <table className="tableModal">
        //     <thead>
        //       <tr>
        //         <th>Снимка</th>
        //         <th>Име на продукта</th>
        //         <th>Количество</th>
        //         <th>Цена за единица</th>
        //         <th>Обща цена</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {purchase && purchase.sunglasses?.length > 0 && 
        //         purchase.sunglasses.map(el => 
        //           <tr key={el._id}>
        //               {console.log(el)}
        //             <td>
        //               <img
        //                 className="modalOrderImage"
        //                 src={el.images[0] || "/images/COPY1.webp"}
        //                 alt={el.name || "Слънчеви очила"}
        //               />
        //             </td>
        //             <td>{el.name}</td>
        //             <td>{el.quantity}</td>
        //             <td>{Number(el.price).toFixed(2)}</td>
        //             <td>{(el.price * el.quantity).toFixed(2)}</td>
        //           </tr>
        //       )}
        //     </tbody>
        //   </table>
        // </div>
        <OrderDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        purchase={purchase}
      />
    }
      </div>
    </>
  );
};

export default UserOrders;

