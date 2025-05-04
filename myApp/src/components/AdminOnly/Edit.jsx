import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Button, Typography } from "@mui/material";
import { REACT_APP_API_URL } from "../../env";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const Edit = () => {
  const apiUrl = REACT_APP_API_URL;
  const navigate = useNavigate()
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
        console.log(data)
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
    navigate('/sunglasses')    

    } catch (err) {
      console.error("Update error:", err);

      toast.error("❌ Грешка при обновяването :(",{
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
    <>
      <Box component="form" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, m: 4 }}>
        <div className="textFields" style={{ width: '50%' }}>
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

        <div className="selectOption" style={{ width: '50%' }}>
          {[
            {
              name: "gender",
              label: "GENDER",
              options: ["---", "Man", "Women", "Unisex"]
            },
            {
              name: "frameColor",
              label: "FRAME COLOR",
              options:[
                "---", "black", "blue", "clear", "gold", "green", "grey", "multi", "neural",
                "orange", "pink", "purple", "red", "silver", "tort", "white", "yellow"
              ]
            },
            {
              name: "frameShape",
              label: "FRAME SHAPE",
              options: ["---", "Pilot/Aviator", "Round", "Squared", "Rechtangular", "Cat eye"]
            },
            {
              name: "lensType",
              label: "LENS TYPE",
              options: ["---", "Standart sun lenses", "Polarized", "Mirrored", "With a color transition", "Diobtric sunglasses"]
            },
            {
              name: "frameMaterial",
              label: "FRAME MATERIAL",
              options: ["---", "Titan", "Tree", "Acetate"]
            },
            {
              name: "UV_Protection",
              label: "UV PROTECTION",
              options: ["---", "0", "1", "2", "3", "4"]
            }
          ].map((select) => (
            <FormControl key={select.name} fullWidth>
              <InputLabel variant="standard">{select.label}</InputLabel>
              <NativeSelect
                name={select.name}
                value={formData[select.name] || "---"}
                onChange={handleChange}
              >
                {select.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
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

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        <img src="/images/sizeModel.webp" alt="Size model" className="sizeModel" />

        <div>
          <Typography variant="h6" gutterBottom>
            Качване на изображения
          </Typography>

          <div style={{ marginBottom: 10 }}>
            <Typography variant="body1">Основно изображение:</Typography>
            <Button variant="contained" component="label">
              Смени основно изображение
              <input hidden accept="image/*" type="file" onChange={handleMainImage} />
            </Button>
            {mainImage && (
              <img
                src={URL.createObjectURL(mainImage)}
                alt="Main preview"
                style={{ maxWidth: "200px", maxHeight: "200px", marginTop: 8 }}
              />
            )}
          </div>

          <div>
            <Typography variant="body1">Допълнителни изображения:</Typography>
            <Button variant="outlined" component="label">
              Добави допълнителни изображения
              <input hidden accept="image/*" type="file" multiple onChange={handleAdditionalImages} />
            </Button>
            {images.length > 0 && (
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
            )}
          </div>
        </div>
      </div>

      <Button variant="contained" sx={{ m: 5 }} onClick={handleUpdate}>
        Обнови продукта
      </Button>
    </>
  );
};

export default Edit;
