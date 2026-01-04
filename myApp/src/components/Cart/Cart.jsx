import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Card,
  CardContent,
  Divider,
  useTheme,
} from "@mui/material";
import { FaMinus, FaPlus } from "react-icons/fa6";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../context/UserContext";
import BeatLoader from "react-spinners/BeatLoader";
import { fetchItemsInCart } from "../../utills/sharedFn/fetchItemsInCart";
import { removeFromCart } from "../../utills/sharedFn/removeFromCart";
import { updateCount } from "../../utills/sharedFn/updateCount";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../utills/currencyConverter";
import CustomButton from "../shared/CustomButton";

const Cart = () => {
  const { user, setUser } = useContext(UserContext);
  const [allItems, setAllItems] = useState([]);
  const [sumOfOldPrice, setSumOldPrice] = useState(0);
  const [totalSum, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      fetchItemsInCart(user).then((items) => {
        setAllItems(items);
        const oldPriceSum = items
          .map((item) =>
            item.oldPrice != "" && item.oldPrice != "undefined"
              ? Number(item.oldPrice) * item.quantity
              : Number(item.price) * item.quantity
          )
          .reduce((sum, price) => sum + price, 0);
        const totalPrice = items
          .map((item) => Number(item.price) * item.quantity)
          .reduce((sum, price) => sum + price, 0);
        setSumOldPrice(oldPriceSum);
        setTotalPrice(totalPrice);
        setIsLoading(false);
      });
    }
  }, [user]);

  const updateCnt = (id, quantity) => {
    updateCount(user, setUser, id, quantity);
  };

  const handleNavigate = () => {
    navigate("/delivery", { state: { allItems } });
  };

  const onHandleRemove = (id) => removeFromCart(user, setUser, id);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: "auto" }}>
      {isLoading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <BeatLoader />
        </Box>
      ) : (
        <>
          <Box textAlign="center" mb={4}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              HOME / CART
            </Typography>
            <Typography variant="h4" fontWeight={600}>
              {t("shoppingCart.shoppingCartTitle")}
            </Typography>
          </Box>

          {allItems.length === 0 ? (
            <Box textAlign="center" py={8}>
              <img
                src="/images/shoppingCart.png"
                alt="shoppingCart"
                width={250}
                style={{ marginBottom: 24 }}
              />
              <Typography variant="h6" gutterBottom>
                {t("shoppingCart.textIfNoAddedItems")}
              </Typography>
              <CustomButton
                variant="outlined"
                component={Link}
                to="/sunglasses"
                sx={{ mt: 2 }}
              >
                {t("shoppingCart.returnToShop")}
              </CustomButton>
            </Box>
          ) : (
            <>
              {!isMobile ? (
                <TableContainer component={Paper} elevation={2} sx={{ mb: 4 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableCell>
                          <Typography fontWeight={600}>
                            {t("Продукт")}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography fontWeight={600}>{t("Цена")}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography fontWeight={600}>
                            {t("Количество")}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography fontWeight={600}>{t("Общо")}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography fontWeight={600}>
                            {t("Действие")}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allItems.map((item) => (
                        <TableRow
                          key={item._id}
                          sx={{
                            "&:hover": { backgroundColor: "#fafafa" },
                            "&:last-child td": { border: 0 },
                          }}
                        >
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={2}>
                              <img
                                src={item.images[0]}
                                alt={item.name}
                                style={{
                                  width: 80,
                                  height: 80,
                                  objectFit: "cover",
                                  borderRadius: 8,
                                }}
                              />
                              <Typography fontWeight={500}>
                                {item.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body1" fontWeight={600}>
                              {formatPrice(item.price)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              gap={1}
                              sx={{
                                border: "1px solid #e0e0e0",
                                borderRadius: 2,
                                p: 1,
                                display: "inline-flex",
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() =>
                                  item.quantity > 1 &&
                                  updateCnt(item._id, item.quantity - 1)
                                }
                                disabled={item.quantity === 1}
                              >
                                <FaMinus size={14} />
                              </IconButton>
                              <Typography
                                fontWeight={600}
                                sx={{ minWidth: 30, textAlign: "center" }}
                              >
                                {item.quantity}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  updateCnt(item._id, item.quantity + 1)
                                }
                              >
                                <FaPlus size={14} />
                              </IconButton>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              // color="primary"
                              color="#e89bb8"
                            >
                              {formatPrice(item.price * item.quantity)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="error"
                              onClick={() => onHandleRemove(item._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ mb: 4 }}>
                  {allItems.map((item) => (
                    <Card key={item._id} sx={{ mb: 2 }} elevation={2}>
                      <CardContent>
                        <Box display="flex" gap={2} mb={2}>
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            style={{
                              width: 80,
                              height: 80,
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
                          />
                          <Box flex={1}>
                            <Typography fontWeight={600} gutterBottom>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {formatPrice(item.price)}
                            </Typography>
                          </Box>
                          <IconButton
                            color="error"
                            onClick={() => onHandleRemove(item._id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            sx={{
                              border: "1px solid #e0e0e0",
                              borderRadius: 2,
                              p: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                item.quantity > 1 &&
                                updateCnt(item._id, item.quantity - 1)
                              }
                              disabled={item.quantity === 1}
                            >
                              <FaMinus size={14} />
                            </IconButton>
                            <Typography
                              fontWeight={600}
                              sx={{ minWidth: 30, textAlign: "center" }}
                            >
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                updateCnt(item._id, item.quantity + 1)
                              }
                            >
                              <FaPlus size={14} />
                            </IconButton>
                          </Box>
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            color="primary"
                          >
                            {formatPrice(item.price * item.quantity)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}

              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  maxWidth: 450,
                  ml: "auto",
                  backgroundColor: "#fafafa",
                }}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {t("Обобщение на поръчката")}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">
                    {t("Обща стойност (стара)")}:
                  </Typography>
                  <Typography fontWeight={500}>
                    {formatPrice(sumOfOldPrice)}
                  </Typography>
                </Box>
                {sumOfOldPrice > totalSum && (
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography color="error">{t("Отстъпка")}:</Typography>
                    <Typography color="error" fontWeight={500}>
                      -{formatPrice(sumOfOldPrice - totalSum)} (
                      {Math.round(
                        ((sumOfOldPrice - totalSum) / sumOfOldPrice) * 100
                      )}
                      %)
                    </Typography>
                  </Box>
                )}
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">
                    {t("Обща стойност")}:
                  </Typography>
                  <Typography fontWeight={600}>
                    {formatPrice(totalSum)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography color="text.secondary">
                    {t("Доставка")}:
                  </Typography>
                  <Typography fontWeight={500}>
                    {totalSum > 77 ? "€0.00" : formatPrice(6.5)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Typography variant="h6" fontWeight={700}>
                    {t("Крайна цена")}:
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="#e89bb8">
                    {formatPrice(totalSum + (totalSum > 77 ? 0 : 6.5))}
                  </Typography>
                </Box>
                <CustomButton
                  fullWidth
                  size="large"
                  onClick={handleNavigate}
                  sx={{ py: 1.5, fontSize: "1.1rem" }}
                >
                  {t("shoppingCart.payBTN")}
                </CustomButton>
              </Paper>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Cart;
