import React, { useContext, useEffect, useState } from "react";
import "./LoveCartList.css";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useTranslation } from "react-i18next";
import { getById } from "../../services/sunglassesService";
import { SunglassesContext } from "../../context/SunglassesContext";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  CardActionArea,
  Container,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import { formatPrice } from "../../utills/currencyConverter";
import CustomButton from "../shared/CustomButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "../../utills/sharedFn/addToCart";

const LoveCartList = () => {
  const { user, setUser } = useContext(UserContext);
  const [wishingCards, setWishingCards] = useState([]);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { sunglasses } = useContext(SunglassesContext);

  useEffect(() => {
    if (!user?.wishlist) return;

    Promise.all(user.wishlist.map((itemID) => getById(itemID)))
      .then((results) => setWishingCards(results))
      .catch((error) => console.error("Error fetching wishlist items:", error));
  }, [user]);

  const addItem = (id) => {
    addToCart(user, setUser, id, 1);
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 } }}>
      {/* Header Section */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, textTransform: "uppercase", letterSpacing: 1 }}
        >
          HOME / WISHLIST
        </Typography>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          {t("wishlistPage.title")}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          {t("wishlistPage.underTitle")}
        </Typography>
      </Box>

      {/* Not Logged In Section */}
      {user == undefined && (
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)",
              }}
            >
              <FavoriteIcon sx={{ fontSize: 60, color: "#e89bb8", mb: 2 }} />
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {t("wishlistPage.myACC")}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {t("wishlistPage.access")}
              </Typography>
              <CustomButton
                variant="outlined"
                component={Link}
                to="/user/access"
                size="large"
              >
                {t("Sign in")}
              </CustomButton>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ShoppingCartIcon
                sx={{ fontSize: 60, color: "#e89bb8", mb: 2 }}
              />
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {t("wishlistPage.startWishlist")}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {t("wishlistPage.startWishlistP2")}
              </Typography>
              <CustomButton component={Link} to="/sunglasses" size="large">
                {t("View Catalog")}
              </CustomButton>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Empty Wishlist Section */}
      {user != undefined && user?.wishlist.length == 0 && (
        <Box>
          <Paper
            elevation={3}
            sx={{
              p: 6,
              textAlign: "center",
              mb: 6,
              background: "linear-gradient(135deg, #fff5f7 0%, #ffe0e8 100%)",
            }}
          >
            <FaHeartCirclePlus
              style={{ fontSize: 80, color: "#e89bb8", marginBottom: 16 }}
            />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {t("wishlistPage.startWishlist")}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {t("wishlistPage.startWishlistP")}
            </Typography>
            <CustomButton
              component={Link}
              to="/sunglasses"
              size="large"
              startIcon={<ShoppingCartIcon />}
            >
              {t("View Catalog")}
            </CustomButton>
          </Paper>

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              fontWeight={600}
              gutterBottom
              textAlign="center"
            >
              {t("Trending Products")}
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <Grid container spacing={3} justifyContent="center">
              {sunglasses
                .sort(() => 0.5 - Math.random())
                .slice(0, 2)
                .map((sunglass, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      elevation={3}
                      sx={{
                        maxWidth: 400,
                        mx: "auto",
                        transition: "transform 0.3s",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardActionArea
                        component={Link}
                        to={`/sunglasses/${sunglass._id}`}
                      >
                        <CardMedia
                          component="img"
                          height="250"
                          image={sunglass.images[0]}
                          alt={sunglass.name}
                          sx={{ objectFit: "contain", p: 2 }}
                        />
                        <CardContent sx={{ textAlign: "center" }}>
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{ textTransform: "uppercase", mb: 1 }}
                          >
                            {sunglass.name}
                          </Typography>
                          <Chip
                            label={formatPrice(sunglass.price)}
                            color="primary"
                            sx={{
                              fontSize: "1rem",
                              fontWeight: 600,
                              backgroundColor: "#e89bb8",
                            }}
                          />
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      )}

      {/* Wishlist Items Grid */}
      {user != undefined && user?.wishlist.length > 0 && (
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            sx={{ mb: 4 }}
          >
            {t("Моите желани слънчеви очила")}
          </Typography>
          <Grid container spacing={3}>
            {wishingCards.length > 0 &&
              wishingCards.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Card
                    elevation={3}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 8,
                      },
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      to={`/sunglasses/${item._id}`}
                      sx={{ flexGrow: 1 }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          height="280"
                          image={item?.images[0]}
                          alt={item.name}
                          sx={{
                            objectFit: "contain",
                            p: 3,
                            backgroundColor: "#fafafa",
                          }}
                        />
                        <Chip
                          icon={<FavoriteIcon />}
                          label="In Wishlist"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            backgroundColor: "#e89bb8",
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <Divider />
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{
                            textTransform: "uppercase",
                            mb: 2,
                            minHeight: 48,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Chip
                          label={formatPrice(item.price)}
                          color="primary"
                          sx={{
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            backgroundColor: "#EEAECA",
                          }}
                        />
                      </CardContent>
                    </CardActionArea>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <CustomButton
                        fullWidth
                        size="large"
                        startIcon={<ShoppingCartIcon />}
                        onClick={
                          user
                            ? () => addItem(item._id)
                            : () => navigate("/user/access")
                        }
                      >
                        {t("Add to cart")}
                      </CustomButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default LoveCartList;
