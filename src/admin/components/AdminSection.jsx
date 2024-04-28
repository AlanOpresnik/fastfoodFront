import { MenuItem, Select, TextField, InputLabel } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const AdminSection = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    color: "",
    limitedProduct: false,
    isNewProduct: false,
    ofert: false,
    tallas: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [fileInput, setFileInput] = useState(null);

  const handleImageChange = (e) => {
    const files = e.target.files;

    // Leer y mostrar previsualizaciones de imágenes
    const previews = Array.from(files).map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      return reader;
    });

    setFileInput(files);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(formData)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLimitedProductChange = (e) => {
    const value = e.target.value === "true";
    setFormData({
      ...formData,
      limitedProduct: value,
    });
  };

  const handleIsNewProductChange = (e) => {
    const value = e.target.value === "true";
    setFormData({
      ...formData,
      isNewProduct: value,
    });
  };

  const handleOfertChange = (e) => {
    const value = e.target.value === "true";
    setFormData({
      ...formData,
      ofert: value,
    });
  };

  const handleTallasChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      tallas: [value],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("color", formData.color);
    formDataToSend.append("limitedProduct", formData.limitedProduct);
    formDataToSend.append("isNewProduct", formData.isNewProduct);
    formDataToSend.append("tallas", formData.tallas);
    formDataToSend.append("ofert", formData.ofert);

    for (let i = 0; i < fileInput.length; i++) {
      formDataToSend.append("images", fileInput[i]);
    }
    
    try {
      
      const res = await axios.post(
        "http://ec2-52-5-132-0.compute-1.amazonaws.com:3900/api/products/postProduct",
        formDataToSend
      );
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        color: "",
        limitedProduct: false,
        isNewProduct: false,
        ofert: false,
        tallas: "",
      });
      setFileInput(null);
      setImagePreviews([]);
      console.log(res.data); // Puedes manejar la respuesta como desees
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            id="outlined-basic"
            label="Titulo del producto"
            variant="outlined"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            name="description"
            id="outlined-basic"
            label="Descripcion"
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            name="price"
            id="outlined-basic"
            label="Precio"
            variant="outlined"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
          />
          <TextField
            name="category"
            id="outlined-basic"
            label="Categoria"
            variant="outlined"
            value={formData.category}
            onChange={handleInputChange}
          />
          <TextField
            name="color"
            id="outlined-basic"
            label="Color"
            variant="outlined"
            value={formData.color}
            onChange={handleInputChange}
          />
          <InputLabel id="limitedProductLabel">
            Es un producto limitado?
          </InputLabel>
          <Select
            name="limitedProduct"
            value={formData.limitedProduct.toString()}
            onChange={handleLimitedProductChange}
            variant="outlined"
            labelId="limitedProductLabel"
          >
            <MenuItem value="true">Sí</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
          <InputLabel id="ofertLabel">Esta en oferta?</InputLabel>
          <Select
            name="ofert"
            value={formData.ofert.toString()}
            onChange={handleOfertChange}
            variant="outlined"
            labelId="ofertLabel"
          >
            <MenuItem value="true">Sí</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
          <InputLabel id="tallasLabel">Tallas disponibles</InputLabel>
          <Select
            name="tallas"
            value={formData.tallas.toString()}
            onChange={handleTallasChange}
            variant="outlined"
            labelId="tallasLabel"
          >
            {/* Aquí puedes mapear un array de tallas disponibles */}
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="L">L</MenuItem>
          </Select>
          <input type="file" onChange={handleImageChange} multiple />

          {/* Previsualizaciones de imágenes */}
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              style={{ maxWidth: "200px", maxHeight: "200px", margin: "10px" }}
            />
          ))}
          <button type="submit">subir prod</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSection;
