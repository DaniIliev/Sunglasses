import React from "react";
import {
  TableCell,
  Chip,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTranslation } from "react-i18next";
import GenericTable from "../shared/GenericTable";
import { formatPrice } from "../../utills/currencyConverter";
import CustomButton from "../shared/CustomButton";

const OrdersTable = ({ orders, onViewDetails }) => {
  const { t } = useTranslation();

  const columns = [
    { label: t("Номер на поръчка"), align: "left" },
    { label: t("Обща сума"), align: "left" },
    { label: t("Дата"), align: "left" },
    { label: t("Информация"), align: "left" },
    { label: t("Статус"), align: "left" },
    { label: t("Действия"), align: "center" },
  ];

  const renderRow = (order) => (
    <>
      <TableCell>
        <Typography variant="body2" fontWeight={600} color="primary">
          #{order.orderCode}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" fontWeight={600}>
          {formatPrice(order.totalPurchasePrice)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{order.purchaseDate}</Typography>
      </TableCell>
      <TableCell>
        <Box>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            {t("Начин на плащане")}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t("Доставка до")}:{" "}
            {order.additionalInfo === "personalAddress"
              ? "личен адрес"
              : order.additionalInfo === "speedyAddress"
              ? "офис на спийди"
              : order.additionalInfo === "econtAddress"
              ? "офис на еконт"
              : ""}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={t("Поръчката е направена")}
          color="success"
          size="small"
          sx={{ fontWeight: 500 }}
        />
      </TableCell>
      <TableCell align="center">
        <CustomButton
          variant="outlined"
          size="small"
          startIcon={<VisibilityIcon />}
          onClick={() => onViewDetails(order._id)}
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          {t("Детайли")}
        </CustomButton>
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
            label={t("Поръчката е направена")}
            color="success"
            size="small"
          />
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              {t("Обща сума")}
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {formatPrice(order.totalPurchasePrice)}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              {t("Дата")}
            </Typography>
            <Typography variant="body2">{order.purchaseDate}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              {t("Информация")}
            </Typography>
            <Typography variant="body2">{t("Начин на плащане")}</Typography>
            <Typography variant="body2">
              {t("Доставка до")}:{" "}
              {order.additionalInfo === "personalAddress"
                ? "личен адрес"
                : order.additionalInfo === "speedyAddress"
                ? "офис на спийди"
                : order.additionalInfo === "econtAddress"
                ? "офис на еконт"
                : ""}
            </Typography>
          </Box>
        </Box>

        <CustomButton
          fullWidth
          startIcon={<VisibilityIcon />}
          onClick={() => onViewDetails(order._id)}
          sx={{ mt: 2 }}
        >
          {t("Детайли за поръчката")}
        </CustomButton>
      </CardContent>
    </Card>
  );

  return (
    <GenericTable
      columns={columns}
      data={orders}
      renderRow={renderRow}
      renderMobileCard={renderMobileCard}
      emptyMessage={t("Няма налични поръчки")}
    />
  );
};

export default OrdersTable;
