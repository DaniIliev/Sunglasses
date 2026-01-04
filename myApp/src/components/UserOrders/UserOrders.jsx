import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./UserOrders.css";
import { FaUserTie } from "react-icons/fa";
import * as purchaseService from "../../services/purchaseService";
import { IoIosCloseCircle } from "react-icons/io";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { useTranslation } from "react-i18next";
import OrdersTable from "./OrdersTable";
import { Box, Paper, Typography, Avatar } from "@mui/material";
const UserOrders = () => {
  const { user } = useContext(UserContext);
  const [purchase, setPurchase] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {}, [user]);

  const handleClick = (id) => {
    setIsModalOpen(true);
    purchaseService.getPurchaseById(id).then((result) => setPurchase(result));
  };
  return (
    <>
      <hr
        className="hr-text gradient"
        data-content="HOME / SUNGLASSES / ORDERS"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          p: { xs: 2, md: 4 },
        }}
      >
        <div className="ordersPage">
          <Paper
            elevation={3}
            sx={{
              margin: "2em auto",
              padding: "2em",
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Avatar sx={{ bgcolor: "#1976d2", width: 56, height: 56 }}>
                <FaUserTie size={28} />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {user?.orders && user.orders.length > 0
                    ? `${user.orders[user.orders?.length - 1]?.firstname} ${
                        user.orders[user.orders?.length - 1]?.lastname
                      }`
                    : ""}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.orders && user.orders.length > 0
                    ? user.orders[user.orders?.length - 1]?.email
                    : ""}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                mt: 2,
              }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t("Телефон")}
                </Typography>
                <Typography variant="body1">
                  {user?.orders && user.orders.length > 0
                    ? user.orders[user.orders?.length - 1]?.phoneNumber
                    : ""}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t("Адрес")}
                </Typography>
                <Typography variant="body1">
                  {user?.orders && user.orders.length > 0
                    ? `${user.orders[user.orders?.length - 1]?.address} ${
                        user.orders[user.orders?.length - 1]?.addressNum
                      }, ${user.orders[user.orders?.length - 1]?.city} ${
                        user.orders[user.orders?.length - 1]?.zipCode
                      }`
                    : ""}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              {t("Вашите поръчки")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.username},{" "}
              {t("тук може да проследите статуса на поръчките си.")}
            </Typography>
          </Box>

          <OrdersTable
            orders={user?.orders || []}
            onViewDetails={handleClick}
          />

          {isModalOpen && (
            <OrderDetailsModal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              purchase={purchase}
            />
          )}
        </div>
      </Box>
    </>
  );
};

export default UserOrders;
