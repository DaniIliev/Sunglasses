import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import "./Create.css";
import { REACT_APP_API_URL } from "../../../env";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import CustomButton from "../../shared/CustomButton";

const Create = () => {
  const apiUrl = REACT_APP_API_URL;
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
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
  });

  const navigate = useNavigate();
  useEffect(() => {}, []);
  function handleMainImage(e) {
    const file = e.target.files[0];
    setMainImage(file); // ⬅️ директно File, без FileReader
  }

  function handleAdditionalImages(e) {
    const files = Array.from(e.target.files);
    setImages(files); // ⬅️ директно масив от File обекти
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createApiCall = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Текстовите полета
    formDataToSend.append("name", formData.name);
    formDataToSend.append("frameWidth", formData.frameWidth);
    formDataToSend.append("frameHeight", formData.frameHeight);
    formDataToSend.append("lensWidth", formData.lensWidth);
    formDataToSend.append("templeLength", formData.templeLength);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("frameShape", formData.frameShape);
    formDataToSend.append("lensType", formData.lensType);
    formDataToSend.append("frameMaterial", formData.frameMaterial);
    formDataToSend.append("UV_Protection", formData.UV_Protection);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("oldPrice", formData.oldPrice);
    formDataToSend.append("frameColor", formData.frameColor);

    // Файловете (основна + допълнителни)
    const combinedImages = mainImage ? [mainImage, ...images] : [...images];
    combinedImages.forEach((image) => {
      formDataToSend.append("images", image); // 'images' трябва да съвпада с upload.array('images')
    });

    try {
      const response = await fetch(`${apiUrl}/sunglasses/add`, {
        method: "POST",
        body: formDataToSend, // НЕ задавай headers: 'Content-Type'
      });

      const result = await response.json();
      setMessage(result.message);
      setFormData({
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
        frameColor: "",
      });
      setImages([]);
      setMainImage(null);
      // alert(result.message);
      toast.success("✅ Успешно добавяне на модел очила :)!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      navigate("/sunglasses");
    } catch (error) {
      setMessage("Възникна грешка при качването.");
      toast.error("❌ Възникна грешка при качването :(", {
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
          Добавяне на нов продукт
        </Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
          noValidate
          autoComplete="off"
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
                variant="standard"
                onChange={handleChange}
                fullWidth
                // sx={{marginBottom: 2}}
              />
            ))}
          </div>

          <div className="selectOption" style={{ width: "50%" }}>
            <FormControl fullWidth>
              <InputLabel variant="standard">GENDER</InputLabel>
              <NativeSelect
                name="gender"
                defaultValue="---"
                onChange={handleChange}
              >
                <option value="---">---</option>
                <option value="Man">Man</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </NativeSelect>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel variant="standard">FRAME COLOR</InputLabel>
              <NativeSelect
                name="frameColor"
                defaultValue="---"
                onChange={handleChange}
              >
                <option value="---">---</option>
                {[
                  "Black",
                  "Blue",
                  "Clear",
                  "Gold",
                  "Green",
                  "Grey",
                  "Multi",
                  "Neural",
                  "Orange",
                  "Pink",
                  "Purple",
                  "Red",
                  "Silver",
                  "Tort",
                  "White",
                  "Yellow",
                ].map((color) => (
                  <option key={color.toLowerCase()} value={color.toLowerCase()}>
                    {color}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel variant="standard">FRAME SHAPE</InputLabel>
              <NativeSelect
                name="frameShape"
                defaultValue="---"
                onChange={handleChange}
              >
                <option value="---">---</option>
                <option value="Pilot/Aviator">Aviator</option>
                <option value="Round">Round</option>
                <option value="Squared">Squared</option>
                <option value="Rechtangular">Rechtangular</option>
                <option value="Cat eye">Cat eye</option>
              </NativeSelect>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel variant="standard">LENS TYPE</InputLabel>
              <NativeSelect
                name="lensType"
                defaultValue="---"
                onChange={handleChange}
              >
                <option value="---">---</option>
                <option value="Standart sun lenses">Standard sun lenses</option>
                <option value="Polarized">Polarized</option>
                <option value="Mirrored">Mirrored</option>
                <option value="With a color transition">
                  With a color transition
                </option>
                <option value="Diobtric sunglasses">Diobtric sunglasses</option>
              </NativeSelect>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel variant="standard">FRAME MATERIAL</InputLabel>
              <NativeSelect
                name="frameMaterial"
                defaultValue="---"
                onChange={handleChange}
              >
                <option value="---">---</option>
                <option value="Titan">Titan</option>
                <option value="Wood">Wood</option>
                <option value="Acetate">Acetate</option>
              </NativeSelect>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel variant="standard">UV PROTECTION</InputLabel>
              <NativeSelect
                name="UV_Protection"
                defaultValue="---"
                onChange={handleChange}
              >
                <option value="---">---</option>
                {[0, 1, 2, 3, 4].map((cat) => (
                  <option key={cat} value={cat}>{`CATEGORY ${cat}`}</option>
                ))}
              </NativeSelect>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <TextField
                minRows={5}
                id="description"
                name="description"
                onChange={handleChange}
                label="Description"
                variant="standard"
                placeholder="Write your description here..."
                // style={{ width: "100%", padding: "8px" }}
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
                Избери основна снимка
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
          onClick={createApiCall}
          sx={{
            px: 6,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        >
          Добави продукт
        </CustomButton>
      </Box>
    </Box>
  );
};

export default Create;
