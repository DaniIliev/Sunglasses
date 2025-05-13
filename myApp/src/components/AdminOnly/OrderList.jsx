import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Divider,
} from '@mui/material';
import * as purchaseService from '../../services/purchaseService'
const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData()
  }, []);
  const fetchData = async () => {
    const result = await purchaseService.getAll(); 
    const sorted = [...result].sort((a, b) => {
        const dateA = new Date(a.purchaseDate.split('.').reverse().join('-'));
        const dateB = new Date(b.purchaseDate.split('.').reverse().join('-'));
        return dateB - dateA;
      });
    
    setOrders(sorted);
}
  const handleMarkAsSeen = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, seen: true } : order
      )
    );
  };

  return (
    <Grid container spacing={3}>
      {orders.map((order) => (
        <Grid item xs={12} md={6} sx={{p: 5}} key={order._id}>
          <Card sx={{width: '90%', margin: '0 auto'}} variant="outlined">
            <CardContent>
              <Typography variant="h6">
                Поръчка #{order.orderCode}
              </Typography>
              <Typography>
                <strong>Име:</strong> {order.firstname} {order.lastname}
              </Typography>
              <Typography>
                <strong>Email:</strong> {order.email}
              </Typography>
              <Typography>
                <strong>Телефон:</strong> {order.phoneNumber}
              </Typography>
              <Typography>
                <strong>Адрес:</strong> {order.address} №{order.addressNum}, {order.city}, {order.state}, {order.zipCode}
              </Typography>
              <Typography>
                <strong>Дата:</strong> {order.purchaseDate}
              </Typography>
              <Typography>
                <strong>Допълнителна информация:</strong> {order.additionalInfo}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1">Продукти:</Typography>
              {order.sunglasses.map((product, index) => (
                <Box key={index} sx={{ mb: 1, ml: 2 }}>
                  <Typography>- {product.name} x {product.quantity} ({product.totalPrice} лв)</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Typography>
                <strong>Обща стойност:</strong> {order.totalPurchasePrice} лв
              </Typography>
              <Button
                variant="contained"
                color={order.seen ? "success" : "primary"}
                onClick={() => handleMarkAsSeen(order._id)}
                disabled={order.seen}
                sx={{ mt: 2 }}
              >
                {order.seen ? "Видяна" : "Маркирай като видяна"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrdersList;
