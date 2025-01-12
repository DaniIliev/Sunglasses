const router = require("express").Router();
const User = require('../schemas/UserSchema')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = require("../utills/jwt");


router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Намерете потребителя по имейл
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Wrong email or password!" });
      }
  
      // Проверка на паролата
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Wrong email or password!" });
      }
  
      // Генериране на токен
      const payload = { _id: user._id, email: user.email, name: user.name };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  
      // console.log("Generated Token:", token);
  
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // Увери се, че това е правилно за локално тестване
        sameSite: 'strict',
      });
  
      // Връщане на токена към клиента
      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      // Проверка за съществуващ потребител
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Създаване на нов потребител
      const newUser = new User({
        username: username,
        email: email,
        password: password,
      });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Error registering user", error });
    }
  });
  
  router.post("/logout", (req, res) => {
    res.clearCookie("token"); // Името на вашето cookie за сесия
    return res.status(200).json({ message: "Logged out successfully" });
  });
  
  router.get("/", async (req, res) => {
    try {
      const users = await User.find({}, "username email");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  });

  module.exports = router