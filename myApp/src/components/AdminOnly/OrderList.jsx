import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  TableCell,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as purchaseService from "../../services/purchaseService";
import GenericTable from "../shared/GenericTable";
import { formatPrice } from "../../utills/currencyConverter";
import CustomButton from "../shared/CustomButton";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await purchaseService.getAll();
    const sorted = [...result].sort((a, b) => {
      const dateA = new Date(a.purchaseDate.split(".").reverse().join("-"));
      const dateB = new Date(b.purchaseDate.split(".").reverse().join("-"));
      return dateB - dateA;
    });

    setOrders(sorted);
  };

  const handleMarkAsSeen = async (id) => {
    const updated = await purchaseService.markAsSeen(id);

    if (!updated) return;

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, seen: true } : order
      )
    );
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Сигурни ли сте, че искате да изтриете тази поръчка?"
    );

    if (!confirmDelete) return;

    const deleted = await purchaseService.deletePurchase(id);
    if (!deleted) return;

    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
  };

  const columns = [
    { label: "Номер на поръчка", align: "left" },
    { label: "Клиент", align: "left" },
    { label: "Контакти", align: "left" },
    { label: "Адрес", align: "left" },
    { label: "Продукти", align: "left" },
    { label: "Обща сума", align: "right" },
    { label: "Дата", align: "left" },
    { label: "Статус", align: "center" },
    { label: "Действия", align: "center" },
  ];

  const renderRow = (order) => (
    <>
      <TableCell>
        <Typography variant="body2" fontWeight={600} color="primary">
          #{order.orderCode}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" fontWeight={600}>
          {order.firstname} {order.lastname}
        </Typography>
      </TableCell>
      <TableCell>
        <Box>
          <Typography variant="body2">{order.email}</Typography>
          <Typography variant="caption" color="text.secondary">
            {order.phoneNumber}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ maxWidth: 200 }}>
          {order.address} №{order.addressNum}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {order.city}, {order.zipCode}
        </Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ maxWidth: 250 }}>
          {order.sunglasses.slice(0, 2).map((product, index) => (
            <Typography key={index} variant="caption" display="block">
              • {product.name} x{product.quantity}
            </Typography>
          ))}
          {order.sunglasses.length > 2 && (
            <Typography variant="caption" color="text.secondary">
              +{order.sunglasses.length - 2} още
            </Typography>
          )}
        </Box>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body1" fontWeight={600}>
          {formatPrice(order.totalPurchasePrice)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{order.purchaseDate}</Typography>
      </TableCell>
      <TableCell align="center">
        <Chip
          label={order.seen ? "Видяна" : "Нова"}
          color={order.seen ? "success" : "warning"}
          size="small"
          icon={order.seen ? <CheckCircleIcon /> : null}
          sx={{ fontWeight: 500 }}
        />
      </TableCell>
      <TableCell align="center">
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <CustomButton
            variant={order.seen ? "outlined" : "contained"}
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={() => handleMarkAsSeen(order._id)}
            disabled={order.seen}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            {order.seen ? "Видяна" : "Маркирай"}
          </CustomButton>
          <CustomButton
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteForeverIcon />}
            onClick={() => handleDelete(order._id)}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Изтрий
          </CustomButton>
        </Box>
      </TableCell>
    </>
  );

  const renderMobileCard = (order) => (
    <Card key={order._id} elevation={3}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" color="primary">
            #{order.orderCode}
          </Typography>
          <Chip
            label={order.seen ? "Видяна" : "Нова"}
            color={order.seen ? "success" : "warning"}
            size="small"
            icon={order.seen ? <CheckCircleIcon /> : null}
          />
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Клиент
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {order.firstname} {order.lastname}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Контакти
            </Typography>
            <Typography variant="body2">{order.email}</Typography>
            <Typography variant="body2">{order.phoneNumber}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Адрес
            </Typography>
            <Typography variant="body2">
              {order.address} №{order.addressNum}, {order.city}, {order.zipCode}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Продукти
            </Typography>
            <List dense sx={{ py: 0 }}>
              {order.sunglasses.map((product, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemText
                    primary={`${product.name} x${product.quantity}`}
                    secondary={formatPrice(product.totalPrice)}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Обща сума
            </Typography>
            <Typography variant="h6" fontWeight={600} color="primary">
              {formatPrice(order.totalPurchasePrice)}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Дата
            </Typography>
            <Typography variant="body2">{order.purchaseDate}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Допълнителна информация
            </Typography>
            <Typography variant="body2">{order.additionalInfo}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <CustomButton
            fullWidth
            variant={order.seen ? "outlined" : "contained"}
            startIcon={<VisibilityIcon />}
            onClick={() => handleMarkAsSeen(order._id)}
            disabled={order.seen}
          >
            {order.seen ? "Видяна" : "Маркирай като видяна"}
          </CustomButton>
          <CustomButton
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={() => handleDelete(order._id)}
          >
            Изтрий
          </CustomButton>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <GenericTable
        columns={columns}
        data={orders}
        renderRow={renderRow}
        renderMobileCard={renderMobileCard}
        emptyMessage="Няма налични поръчки"
      />
    </Box>
  );
};

export default OrdersList;
