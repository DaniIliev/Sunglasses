import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import { REACT_APP_API_URL } from "../../env";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import CustomButton from "../shared/CustomButton";

const Edit = () => {
  const apiUrl = REACT_APP_API_URL;
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    frameWidth: "",
    frameHeight: "",
    lensWidth: "",
    templeLength: "",
    gender: "---",
    frameShape: "---",
    lensType: "---",
    frameMaterial: "---",
    UV_Protection: "---",
    description: "",
    price: "",
    oldPrice: "",
    frameColor: "---",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/sunglasses/${id}`);
        const data = await res.json();
        console.log(data);
        setFormData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [apiUrl, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImage = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleAdditionalImages = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleUpdate = async () => {
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    const allImages = mainImage ? [mainImage, ...images] : images;
    allImages.forEach((img) => {
      formDataToSend.append("images", img);
    });

    try {
      const res = await fetch(`${apiUrl}/sunglasses/edit/${id}`, {
        method: "PATCH",
        body: formDataToSend,
      });

      const result = await res.json();
      toast.success("✅ Продуктът е обновен успешно :)!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      navigate("/sunglasses");
    } catch (err) {
      console.error("Update error:", err);

      toast.error("❌ Грешка при обновяването :(", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={600} sx={{ mb: 4 }}>
          Редактиране на продукт
        </Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <div className="textFields" style={{ width: "50%" }}>
            {[
              { name: "frameWidth", label: "FRAME WIDTH (MM)" },
              { name: "frameHeight", label: "FRAME HEIGHT (MM)" },
              { name: "lensWidth", label: "LENS WIDTH (MM)" },
              { name: "templeLength", label: "TEMPLE LENGTH (MM)" },
              { name: "price", label: "ACTUAL PRICE" },
              { name: "oldPrice", label: "OLD PRICE" },
              { name: "name", label: "NAME" },
            ].map((field) => (
              <TextField
                key={field.name}
                name={field.name}
                label={field.label}
                value={formData[field.name] || ""}
                variant="standard"
                onChange={handleChange}
                fullWidth
              />
            ))}
          </div>

          <div className="selectOption" style={{ width: "50%" }}>
            {[
              {
                name: "gender",
                label: "GENDER",
                options: ["---", "Man", "Women", "Unisex"],
              },
              {
                name: "frameColor",
                label: "FRAME COLOR",
                options: [
                  "---",
                  "black",
                  "blue",
                  "clear",
                  "gold",
                  "green",
                  "grey",
                  "multi",
                  "neural",
                  "orange",
                  "pink",
                  "purple",
                  "red",
                  "silver",
                  "tort",
                  "white",
                  "yellow",
                ],
              },
              {
                name: "frameShape",
                label: "FRAME SHAPE",
                options: [
                  "---",
                  "Pilot/Aviator",
                  "Round",
                  "Squared",
                  "Rechtangular",
                  "Cat eye",
                ],
              },
              {
                name: "lensType",
                label: "LENS TYPE",
                options: [
                  "---",
                  "Standart sun lenses",
                  "Polarized",
                  "Mirrored",
                  "With a color transition",
                  "Diobtric sunglasses",
                ],
              },
              {
                name: "frameMaterial",
                label: "FRAME MATERIAL",
                options: ["---", "Titan", "Tree", "Acetate"],
              },
              {
                name: "UV_Protection",
                label: "UV PROTECTION",
                options: ["---", "0", "1", "2", "3", "4"],
              },
            ].map((select) => (
              <FormControl key={select.name} fullWidth>
                <InputLabel variant="standard">{select.label}</InputLabel>
                <NativeSelect
                  name={select.name}
                  value={formData[select.name] || "---"}
                  onChange={handleChange}
                >
                  {select.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            ))}

            <FormControl fullWidth sx={{ mt: 2 }}>
              <TextField
                minRows={5}
                multiline
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                label="Description"
                variant="standard"
                placeholder="Write your description here..."
              />
            </FormControl>
          </div>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src="/images/sizeModel.webp"
                alt="Size model"
                style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography
              variant="h5"
              gutterBottom
              fontWeight={600}
              sx={{ mb: 3 }}
            >
              Качване на изображения
            </Typography>

            {/* Main Image Upload */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Основно изображение
              </Typography>
              <CustomButton
                component="label"
                startIcon={<CloudUploadIcon />}
                size="large"
                sx={{ mb: 2 }}
              >
                Смени основна снимка
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleMainImage}
                />
              </CustomButton>

              {mainImage && (
                <Card sx={{ maxWidth: 300, position: "relative" }}>
                  <IconButton
                    onClick={() => setMainImage(null)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(255,255,255,0.9)",
                      "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                    }}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <CardMedia
                    component="img"
                    image={URL.createObjectURL(mainImage)}
                    alt="Main preview"
                    sx={{ height: 200, objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">
                      {mainImage.name}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Additional Images Upload */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Допълнителни изображения
              </Typography>
              <CustomButton
                variant="outlined"
                component="label"
                startIcon={<ImageIcon />}
                size="large"
                sx={{ mb: 2 }}
              >
                Избери допълнителни снимки
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  multiple
                  onChange={handleAdditionalImages}
                />
              </CustomButton>

              {images.length > 0 && (
                <Grid container spacing={2}>
                  {images.map((file, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Card sx={{ position: "relative" }}>
                        <IconButton
                          onClick={() =>
                            setImages(images.filter((_, i) => i !== index))
                          }
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            bgcolor: "rgba(255,255,255,0.9)",
                            "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                            zIndex: 1,
                          }}
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <CardMedia
                          component="img"
                          image={URL.createObjectURL(file)}
                          alt={`Preview ${index}`}
                          sx={{ height: 140, objectFit: "cover" }}
                        />
                        <CardContent sx={{ p: 1 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                          >
                            {file.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ textAlign: "center" }}>
        <CustomButton
          size="large"
          onClick={handleUpdate}
          sx={{
            px: 6,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        >
          Обнови продукта
        </CustomButton>
      </Box>
    </Box>
  );
};

export default Edit;
