import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { UserContext } from "../../context/UserContext";
import BeatLoader from 'react-spinners/BeatLoader';
import { fetchItemsInCart } from "../../utills/sharedFn/fetchItemsInCart";
import { removeFromCart } from "../../utills/sharedFn/removeFromCart";
import { updateCount } from "../../utills/sharedFn/updateCount";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { display, height, styled, width } from '@mui/system';

const CartContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '100%',
  width: '100%',
  margin: 'auto',
  [theme.breakpoints.up('md')]: {
    maxWidth: '1400px',
  },
}));

const Titles = styled(Box)({
  textAlign: 'center',
  marginBottom: '2em',
});

const CartHeader = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr 1fr',
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  fontWeight: 'bold',
  borderBottom: '2px solid #ccc',
}));

const CartRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr 1fr',
  gap: theme.spacing(2),
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  borderBottom: '1px solid #ddd',
}));

const Image = styled('img')(({ theme }) => ({
  maxWidth: '80px',
  borderRadius: '8px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '60px',
  },
}));

const CounterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  border: '1px solid #ccc',
  borderRadius: '6px',
  padding: theme.spacing(0.5, 1),
  background: '#f8f8f8',
  maxWidth: '150px', // Ограничаваме максималната ширина
  justifyContent: 'space-between', // Подредба на иконките
}));

const TotalBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: '8px',
  background: '#fafafa',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
  maxWidth: '400px',
  marginLeft: 'auto',
}));

const ResponsiveButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: '#fff',
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: '#115293',
  },
  width: '100%',
}));

const RemoveButton = styled(IoMdCloseCircleOutline)(({ theme }) => ({
  cursor: 'pointer',
  color: '#f44336',  // Червен за премахване
  '&:hover': {
    color: '#d32f2f',  // При hover
  },
  fontSize: '2rem',  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',  
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',  
  },
}));

const Cart = () => {
  const { user, setUser } = useContext(UserContext);
  const [allItems, setAllItems] = useState([]);
  const [sumOfOldPrice, setSumOldPrice] = useState(0);
  const [totalSum, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      fetchItemsInCart(user).then((items) => {
        setAllItems(items);
        const oldPriceSum = items.map((item) => item.oldPrice != '' && item.oldPrice != 'undefined' ? Number(item.oldPrice) * item.quantity : Number(item.price) * item.quantity).reduce((sum, price) => sum + price, 0);
        const totalPrice = items.map((item) => Number(item.price) * item.quantity).reduce((sum, price) => sum + price, 0);
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
    <CartContainer>
      {isLoading? <BeatLoader /> : (
        <>
          <Titles>
            <Typography variant="h6">HOME / CART</Typography>
            <Typography variant="h4">{t('shoppingCart.shoppingCartTitle')}</Typography>
          </Titles>

          {allItems.length === 0 ? (
            <Box textAlign="center">
              <img src="/images/shoppingCart.png" alt="shoppingCart" width={250} />
              <Typography variant="h6">{t('shoppingCart.textIfNoAddedItems')}</Typography>
              <Button variant="outlined" component={Link} to="/sunglasses">{t('shoppingCart.returnToShop')}</Button>
            </Box>
          ) : (
            <>
              <CartHeader>
                <Typography>{t('Продукт')}</Typography>
                <Typography>{t('Количество')}</Typography>
                <Typography>{t('Цена')}</Typography>
                <Typography>{t('Общо')}</Typography>
              </CartHeader>

              {allItems.map((item) => (
                <CartRow key={item._id}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Image src={item.images[0]} alt={item.name} />
                    <Typography>{item.name}</Typography>
                  </Box>

                  <CounterBox>
                    <FaMinus onClick={() => item.quantity > 1 && updateCnt(item._id, item.quantity - 1)} />
                    <Typography>{item.quantity}</Typography>
                    <FaPlus onClick={() => updateCnt(item._id, item.quantity + 1)} />
                  </CounterBox>

                  <Box>
                    <Typography variant="body2" sx={{ textDecoration: item.oldPrice != '' && item.oldPrice != 'undefined' ? 'line-through' : 'none' }}>{item.oldPrice != '' && item.oldPrice != 'undefined'|| ''}</Typography>
                    <Typography variant="h8">{item.price} лв</Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h8">{item.price * item.quantity} лв</Typography>
                    <RemoveButton onClick={() => onHandleRemove(item._id)} />
                  </Box>
                </CartRow>
              ))}

              <TotalBox>
                <Typography>{t('Обща стойност (стара)')}: {sumOfOldPrice.toFixed(2)} лв</Typography>
                <Typography color="error">
                {t('Отстъпка')}: -{(sumOfOldPrice - totalSum).toFixed(2)} лв ({Math.round(((sumOfOldPrice - totalSum) / sumOfOldPrice) * 100)}%)
                </Typography>
                <Typography>{t('Обща стойност')}: {totalSum.toFixed(2)} лв</Typography>
                <Typography>{t('Доставка')}: {totalSum > 150 ? '0.00' : '6.50'} лв</Typography>
                <Typography><strong>{t('Крайна цена')}: {(totalSum + (totalSum > 150 ? 0 : 6.5)).toFixed(2)} лв</strong></Typography>
                <ResponsiveButton onClick={handleNavigate}>{t('shoppingCart.payBTN')}</ResponsiveButton>
              </TotalBox>
            </>
          )}
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
