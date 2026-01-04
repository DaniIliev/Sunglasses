import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartDropdown.css";
import { IoIosClose } from "react-icons/io";
import { UserContext } from "../../../context/UserContext";
import { fetchItemsInCart } from "../../../utills/sharedFn/fetchItemsInCart";
import { removeFromCart } from "../../../utills/sharedFn/removeFromCart";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../../utills/currencyConverter";
import {
  Box,
  Paper,
  Typography,
  Grid,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CustomButton from "../CustomButton";

const CartDropdown = ({ setIsShippingHovered, isShippingHovered }) => {
  const { user, setUser } = useContext(UserContext);
  const [allItems, setAllItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchItemsInCart(user).then((items) => setAllItems(items));
    }
  }, [user?.cart]);

  const { t } = useTranslation();

  const handleDelete = (el) => {
    removeFromCart(user, setUser, el);
  };

  const totalPrice = allItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleNavigate = (path) => {
    setIsShippingHovered(false);
    navigate(path);
  };

  return (
    <Paper
      onMouseLeave={() => setIsShippingHovered(!isShippingHovered)}
      className={
        isShippingHovered ? "cartDropdown open" : "cartDropdown closed"
      }
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        backgroundColor: "#fff",
        width: "320px",
        top: "7.5em",
        right: "3.5em",
        padding: 0,
        maxHeight: "45em",
        overflow: "hidden",
        zIndex: 5000,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "8px",
      }}
    >
      {allItems.length > 0 ? (
        <>
          <Box
            sx={{
              overflowY: "auto",
              flex: 1,
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#EEAECA",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-track": { backgroundColor: "#f5f5f5" },
            }}
          >
            {allItems.map((item, index) => (
              <Box key={item._id}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start",
                    padding: "1em",
                  }}
                >
                  <Box
                    component="img"
                    src={item.images[0]}
                    alt={item.name}
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "8px",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" fontWeight="bold" noWrap>
                      {item.name.toUpperCase()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      QTY: {item.quantity}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{ mt: 0.5 }}
                    >
                      {formatPrice(Number(item.price) * item.quantity)}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(item._id)}
                    sx={{
                      color: "#d32f2f",
                      "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.08)" },
                    }}
                  >
                    <IoIosClose size={20} />
                  </IconButton>
                </Box>
                {index < allItems.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
          <Divider />
          <Box
            sx={{
              padding: "1em",
              backgroundColor: "rgba(238, 174, 202, 0.05)",
            }}
          >
            <Typography variant="h6" fontWeight="bold" align="right">
              {t("Total")}: {formatPrice(totalPrice)}
            </Typography>
          </Box>
          <Stack direction="column" spacing={1} sx={{ padding: "1em" }}>
            <CustomButton
              variant="outlined"
              fullWidth
              onClick={() => handleNavigate("/cart")}
            >
              {t("View cart")}
            </CustomButton>
            <CustomButton
              variant="contained"
              fullWidth
              onClick={() => handleNavigate("/cart")}
            >
              {t("Checkout")}
            </CustomButton>
          </Stack>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "3em 1em",
            gap: 2,
          }}
        >
          <ShoppingCartIcon
            sx={{ fontSize: 60, color: "#EEAECA", opacity: 0.5 }}
          />
          <Typography variant="body1" align="center" color="text.secondary">
            {t("shoppingCart.textIfNoAddedItems")}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default CartDropdown;
