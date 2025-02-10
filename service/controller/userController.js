const router = require("express").Router();
const User = require('../schemas/UserSchema')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = require("../utills/jwt");
const mongoose = require("mongoose")

router.patch('/:id', async (req , res) =>{
  let editValue = ['cart']
  const { id } = req.params;
  const {data} = req.body;
  try{
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    let user = await User.findByIdAndUpdate(id);
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let newUser;
    if(data.type == "addToCart"){
       user.cart.push({
        id: data.id,
        quantity: data.quantity,
      })
       newUser = await User.findByIdAndUpdate(id, user);
    }else if(data.type == 'updateCount'){
      newUser = await User.findByIdAndUpdate(id, data.newUser, {new: true});
    }else if(data.type == 'order'){
      user.cart = []
      user.orders.push(data.formData)
      newUser = await User.findByIdAndUpdate(id, user), {new: true};
    } else if(data.type == "deleteFromCart"){
      user.cart = data.itemIDs;
      newUser = await User.findByIdAndUpdate(id, user);
    }else if(data.type == "likeItem"){
      user.wishlist.push(data.id)
      newUser = await User.findByIdAndUpdate(id, user);
    }else if(data.type == "unlikeItem"){
      user.wishlist.filter(item => item != data.id)
      user.wishlist = user.wishlist.filter(item => item != data.id)
      newUser = await User.findByIdAndUpdate(id, user);
    }
    res.status(200).json(newUser);

  }catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error });
  }

})
router.get('/:id', async (req,res) => {
  const {id} = req.params;
  
  try {
    // Проверка дали ID-то е валидно
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Търсене в базата данни
     const user = await User.findById(id);
    // Ако няма елемент с това ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error });
  }
}); 

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
  
      res.cookie('auth', token,{
        httpOnly: false, // Кукито ще бъде достъпно от JavaScript
        secure: false,   // Включи `true` за HTTPS в продукция
        sameSite: 'strict',
      })
  
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