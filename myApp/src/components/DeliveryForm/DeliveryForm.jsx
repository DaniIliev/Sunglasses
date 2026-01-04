import React, { useContext, useEffect, useState } from "react";
import "./DeliveryForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { UserContext } from "../../context/UserContext";
import { removeFromCart } from "../../utills/sharedFn/removeFromCart";
import * as purchaseService from "../../services/purchaseService";
import * as userService from "../../services/userService";
import { formatDate } from "../../utills/sharedFn/formatData";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../utills/currencyConverter";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import CustomButton from "../shared/CustomButton";

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
};
const DeliveryFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { user, setUser } = useContext(UserContext);
  const [allItems, setAllItems] = useState(location.state?.allItems || []);
  const [formData, setFormData] = useState(formDataInitial);
  const [totalPurchasePrice, setTotalPurchasePrice] = useState(0);
  const [allItemsArr, setAllItemsArr] = useState([]);
  useEffect(() => {
    allItems.map((el) =>
      allItemsArr.push({
        item: el._id,
        name: el.name,
        images: el.images,
        price: el.price,
        quantity: el.quantity,
        totalPrice: Number(el.price) * Number(el.quantity),
      })
    );
    setTotalPurchasePrice(
      allItemsArr.reduce((acc, el) => acc + el.totalPrice, 0)
    );
  }, [allItems]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.sunglasses = allItemsArr;
    formData.totalPurchasePrice = totalPurchasePrice;
    formData.orderCode = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();
    formData.purchaseDate = formatDate();
    purchaseService.createPurchase(formData).then((result) => {
      updateUser(result);
      setFormData(formDataInitial);
    });
  };

  const updateUser = (formData) => {
    const data = {
      type: "order",
      formData: formData,
    };
    userService.patchUser(user._id, data).then(() => {
      setUser((prevUser) => ({
        ...prevUser,
        cart: [],
        orders: [...prevUser.orders, data.formData],
      }));
      setAllItems([]);
      navigate("/orders");
    });
  };
  const onHandleRemove = (id) => {
    const updatedItems = allItems.filter((el) => el._id != id);
    setAllItems(updatedItems);
    removeFromCart(user, setUser, id);
  };

  return (
    <Box sx={{ width: "100%", py: { xs: 2, md: 4 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {t("Информация за доставката")}
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 3, md: 4 }}>
        <Grid item xs={12} md={7}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  label={t("Име")}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  label={t("Фамилия")}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  label={t("Телефонен номер")}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  label={t("Имейл")}
                  type="email"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  label={t("Държава")}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  label={t("Област")}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  label={t("Град")}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  label={t("Адрес")}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="addressNum"
                  value={formData.addressNum}
                  onChange={handleInputChange}
                  label={t("Номер")}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  label={t("Изберете адрес")}
                  variant="outlined"
                  required
                >
                  <MenuItem value="" disabled>
                    {t("Изберете адрес")}
                  </MenuItem>
                  <MenuItem value="personalAddress">
                    {t("Личен адрес")}
                  </MenuItem>
                  <MenuItem value="speedyAddress">
                    {t("Адрес на спийди")}
                  </MenuItem>
                  <MenuItem value="ekontAddress">
                    {t("Адрес на еконт")}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  label={t("Пощенски код")}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ display: { xs: "none", md: "block" } }}>
                <CustomButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  {t("Завърши поръчката")}
                </CustomButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              {t("Your products")}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {allItems.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 2,
                    pb: 2,
                    borderBottom: "1px solid #e0e0e0",
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <IconButton
                      onClick={() => onHandleRemove(item._id)}
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        bgcolor: "background.paper",
                        "&:hover": { bgcolor: "error.light", color: "white" },
                      }}
                      size="small"
                    >
                      <IoIosClose size={24} />
                    </IconButton>
                    <img
                      src="/images/COPY1.webp"
                      width={80}
                      alt={item.name}
                      style={{ borderRadius: "8px" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <CustomButton
                        size="small"
                        variant="outlined"
                        onClick={() => navigate("/cart")}
                        sx={{ mb: 1, fontSize: "0.75rem" }}
                      >
                        {t("Редактирай")}
                      </CustomButton>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`${item.quantity} x €${Number(item.price || 0).toFixed(
                          2
                        )}`}
                      </Typography>
                      {item.oldPrice != "undefined" &&
                        item.oldPrice > item.price && (
                          <Typography variant="body2" color="success.main">
                            {`-${
                              Math.round(
                                (((item.oldPrice - item.price) /
                                  item.oldPrice) *
                                  100) /
                                  10
                              ) * 10
                            }%`}
                          </Typography>
                        )}
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                      >
                        €{Number(item.price || 0).toFixed(2)}
                      </Typography>
                      {item.oldPrice != "undefined" &&
                        item.oldPrice > item.price && (
                          <Typography
                            variant="body2"
                            sx={{ textDecoration: "line-through" }}
                            color="text.secondary"
                          >
                            €{Number(item.oldPrice).toFixed(2)}
                          </Typography>
                        )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: 3, pt: 2, borderTop: "2px solid #000" }}>
              <Typography variant="h5" fontWeight="bold" align="right">
                {t("Общо")}: {formatPrice(totalPurchasePrice)}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: { xs: "block", md: "none" } }}>
          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSubmit}
          >
            {t("Завърши поръчката")}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeliveryFormPage;
