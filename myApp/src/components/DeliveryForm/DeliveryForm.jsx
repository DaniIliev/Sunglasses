import React, { useContext, useEffect, useState } from "react";
import "./DeliveryForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { UserContext } from "../../context/UserContext";
import { removeFromCart } from "../../utills/sharedFn/removeFromCart";
import InteractiveMapWithLocations from "../InteractiveMapWithLocations/InteractiveMapWithLocations";
import * as purchaseService from '../../services/purchaseService'
import * as userService from '../../services/userService'
import { formatDate } from "../../utills/sharedFn/formatData";
// Компонент за формата за доставка
const formDataInitial = {
  firstname: "",
  lastname: "",
  phoneNumber: "",
  email: "",
  address: "",
  addressNum: "",
  city: "",
  state: "",
  area: "",
  zipCode: "",
  additionalInfo: "",
}
const DeliveryFormPage = () => {
    
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUser } = useContext(UserContext);
  const [allItems, setAllItems] = useState(location.state?.allItems || []);
  const [formData, setFormData] = useState(formDataInitial);
  const [totalPurchasePrice, setTotalPurchasePrice] = useState(0)
  const [allItemsArr, setAllItemsArr] = useState([])
  useEffect(() => {
    allItems.map(el => allItemsArr.push({item: el._id, name: el.name, image: el.image, price: el.price, quantity: el.quantity, totalPrice: Number(el.price) * Number(el.quantity)}))
    setTotalPurchasePrice(allItemsArr.reduce((acc, el) => acc + el.totalPrice, 0));

  }, [allItems])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('All items', allItemsArr)
    formData.sunglasses = allItemsArr;
    formData.totalPurchasePrice = totalPurchasePrice;
    formData.orderCode = Math.floor(10000000 + Math.random() * 90000000).toString();
    formData.purchaseDate = formatDate()
    purchaseService.createPurchase(formData)
                .then((result) => {
                  updateUser(result)
                  setFormData(formDataInitial)
                })
  };

  const updateUser = (formData) => {
      const data = {
        type: 'order',
        formData: formData,
      }
      userService.patchUser(user._id, data)
                .then(() => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    cart: [],
                    orders: [...prevUser.orders, data.formData]
                    }))
                  setAllItems([])
                  navigate('/orders')
                })
  }
  const onHandleRemove = (id) => {
    const updatedItems = allItems.filter(el => el._id != id)
    setAllItems(updatedItems);
    removeFromCart(user, setUser, id);
  };

  return (
    <div className="modal">
      <header>
        <h1 className="informationTitle">Информация за доставката</h1>
      </header>
      <main className="deliveryContent">
        <section className="sectionDeliveryForm">
          <form  className="deliveryForm">
            <div className="nameAndLastname">
              <input
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                placeholder="Име"
              />
              <input
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                placeholder="Фамилия"
              />
            </div>
            <div className="emailAndPhone">
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Телефонен номер"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Имейл"
              />
            </div>
            <div className="stateCity">
              <input
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Държава"
              />
              <input
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="Област"
              />
              <input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Град"
              />
            </div>
            <div className="addressAndAddressNum">
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Адрес"
              />
              <input
                name="addressNum"
                value={formData.addressNum}
                onChange={handleInputChange}
                placeholder="Номер"
              />
            </div>
            <div className="addditionalInfoAndZipCode">
              <select
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
              >
                <option value="" disabled>Изберете адрес</option>
                <option value="personalAddress">Личен адрес</option>
                <option value="speedyAddress">Адрес на Спийди</option>
                <option value="ekontAddress">Адрес на Еконт</option>
              </select>
              <input
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="Пощенски код"
              />
            </div>

            <p type="submit" className="saveBTN" onClick={handleSubmit}>
              {/* Запази и продължи напред */}
              Завърши поръчката
            </p>
          </form>
        </section>
        <section className="sectionItems">
          <div className="titleAndItemsDiv">
            <h2 className="yourProductsTITLE">
              Your products{" "}
            </h2>
            {allItems.map((item) => (
              <div className="singleItem" key={item._id}>
                <div className="imgAndIconDel">
                  <IoIosClose
                    className="deleteIcon"
                    onClick={() => onHandleRemove(item._id)}
                  />
                  <img src="/images/COPY1.webp" width={100} />
                </div>
                <div className="infoItem" onClick={() => navigate("/cart")}>
                  <p className="editBTN">Редактирай</p>
                  <h4>{item.name}</h4>
                  <p>{`${item.quantity} x ${item.oldPrice}`}</p>
                  <p>
                    {item.oldPrice
                      ? `-${
                          Math.round(
                            (((item.oldPrice - item.price) / item.oldPrice) *
                              100) /
                              10
                          ) * 10
                        }${"%"}`
                      : ""}
                  </p>
                </div>
                <div>
                  <p className="currentPrice">
                    {Number(item.price).toFixed(2)}
                  </p>
                  <p className="oldPrice">{Number(item.oldPrice).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{fontSize: '2em'}}>Общо: {totalPurchasePrice}лева</p>
        </section>
      </main>
      {/* <InteractiveMapWithLocations /> */}
      {/* <footer>
        <p>Междинна сума: 299.00 лв.</p>
        <p>Общо: 299.00 лв.</p>
      </footer> */}
    </div>
  );
};

export default DeliveryFormPage;
