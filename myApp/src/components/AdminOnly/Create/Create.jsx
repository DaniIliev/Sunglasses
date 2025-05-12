import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import "./Create.css";
import { REACT_APP_API_URL } from "../../../env";
import { Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

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

 const navigate = useNavigate()
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
      navigate('/sunglasses')
    } catch (error) {
      setMessage("Възникна грешка при качването.");
        toast.error("❌ Възникна грешка при качването :(",{
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

return(
<>
  <Box className='MuiBox-root1' component="form" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, m: 4}} noValidate autoComplete="off">
    <div className="textFields" style={{width:'50%'}}>
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

    <div className="selectOption" style={{width: '50%'}}>
      <FormControl fullWidth>
          <InputLabel variant="standard">GENDER</InputLabel>
        <NativeSelect  name="gender" defaultValue="---" onChange={handleChange}>
          <option value="---">---</option>
          <option value="Man">Man</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </NativeSelect>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel variant="standard">FRAME COLOR</InputLabel>
        <NativeSelect name="frameColor" defaultValue="---" onChange={handleChange}>
          <option value="---">---</option>
          {[
            "Black", "Blue", "Clear", "Gold", "Green", "Grey", "Multi", "Neural",
            "Orange", "Pink", "Purple", "Red", "Silver", "Tort", "White", "Yellow",
          ].map((color) => (
            <option key={color.toLowerCase()} value={color.toLowerCase()}>
              {color}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel variant="standard">FRAME SHAPE</InputLabel>
        <NativeSelect name="frameShape" defaultValue="---" onChange={handleChange}>
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
        <NativeSelect name="lensType" defaultValue="---" onChange={handleChange}>
          <option value="---">---</option>
          <option value="Standart sun lenses">Standard sun lenses</option>
          <option value="Polarized">Polarized</option>
          <option value="Mirrored">Mirrored</option>
          <option value="With a color transition">With a color transition</option>
          <option value="Diobtric sunglasses">Diobtric sunglasses</option>
        </NativeSelect>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel variant="standard">FRAME MATERIAL</InputLabel>
        <NativeSelect name="frameMaterial" defaultValue="---" onChange={handleChange}>
          <option value="---">---</option>
          <option value="Titan">Titan</option>
          <option value="Wood">Wood</option>
          <option value="Acetate">Acetate</option>
        </NativeSelect>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel variant="standard">UV PROTECTION</InputLabel>
        <NativeSelect name="UV_Protection" defaultValue="---" onChange={handleChange}>
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
          label='Description'
          variant="standard"
          placeholder="Write your description here..."
          // style={{ width: "100%", padding: "8px" }}
        />
      </FormControl>
    </div>
  </Box>

  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
    <img src="/images/sizeModel.webp" alt="Size model" className="sizeModel" />
    <div>
      <Typography variant="h6" gutterBottom>
        Качване на изображения
      </Typography>

      <div style={{ marginBottom: 10 }}>
        <Typography variant="body1" gutterBottom>
          Основно изображение (1 снимка):
        </Typography>
        <Button variant="contained" component="label">
          Качи основно изображение
          <input hidden accept="image/*" type="file" onChange={handleMainImage} />
        </Button>
        {mainImage && (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Преглед на основно изображение:
            </Typography>
            <img
              src={URL.createObjectURL(mainImage)}
              alt="Main preview"
              style={{ maxWidth: "200px", maxHeight: "200px", marginTop: 8 }}
            />
          </>
        )}
      </div>

      <div>
        <Typography variant="body1" gutterBottom>
          Допълнителни изображения:
        </Typography>
        <Button variant="outlined" component="label">
          Качи допълнителни изображения
          <input hidden accept="image/*" type="file" multiple onChange={handleAdditionalImages} />
        </Button>
        {images.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Преглед на допълнителни изображения:
            </Typography>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
              {images.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "8px" }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  </div>

  <Button variant="contained" sx={{ m: 5 }} onClick={createApiCall}>
    Submit
  </Button>
</>
)
};

export default Create;
