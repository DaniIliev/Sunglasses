const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const https = require('https');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authmiddleware = require("../utills/authmiddleware")
require('dotenv').config()

const app = express();

app.use(cookieParser());
app.use(
  cors({
    
    origin: ["http://localhost:5174",'https://vist-sunglasses.netlify.app', "http://localhost:5173"], // Замести това с URL-то на React приложението
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
// app.options('*', cors(corsOptions)); // <-- Handle preflight requests properly

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(authmiddleware.auth)
app.use(routes);

// const mongoURI = "mongodb://127.0.0.1:27017/sunglasses";
const mongoURI = process.env.MONGODB_URI;


mongoose
  .connect(mongoURI,{
    serverSelectionTimeoutMS: 60000,
    socketTimeoutMS: 60000
  })
  .then(() => console.log("MongoDB свързан успешно"))
  .catch((err) => {
    console.error("Грешка при свързване с MongoDB:", err);
  });

app.listen(5200, console.log("Server is listen on port 5200..."));
