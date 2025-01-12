const router = require('express').Router()
const Sunglasses = require('../schemas/SunglassesSchema')
const authenticate = require("../utills/authenticate");
const mongoose = require("mongoose");

router.post('/add', async (req, res) => {

    const newSunglasses = new Sunglasses({
        frameWidth: req.body.frameWidth,
        frameHeight: req.body.frameHeight,
        lensWidth: req.body.lensWidth,
        templeLength: req.body.templeLength,
        gender: req.body.gender,
        frameShape: req.body.frameShape,
        lensType: req.body.lensType,
        frameMaterial: req.body.frameMaterial,
        UV_Protection: req.body.UV_Protection,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        name: req.body.name,
    });
  
    try {
        await newSunglasses.save();
        res.status(201).json({ message: 'Слънчевите очила са добавени успешно!' });
    } catch (error) {
        console.error('Error saving sunglasses:', error); // Логване на грешката
        res.status(500).json({ message: 'Грешка при добавяне на слънчевите очила', error });
    }
  });
  
  router.get("/:id", authenticate ,async (req, res) => {
    const { id } = req.params;

    try {
      // Проверка дали ID-то е валидно
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
  
      // Търсене в базата данни
      const item = await Sunglasses.findById(id);
  
      // Ако няма елемент с това ID
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      // Връщане на елемента
      res.status(200).json(item);
    } catch (error) {
      console.error("Error fetching item:", error);
      res.status(500).json({ message: "Server error", error });
    }
  }); 
  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      // Проверка дали ID-то е валидно
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
  
      // Търсене и изтриване на елемента от базата данни
      const item = await Sunglasses.findByIdAndDelete(id);
  
      // Ако няма елемент с това ID
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      // Връщане на успех
      res.status(200).json({ message: "Item successfully deleted" });
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  
  router.get('/', async (req, res) => {
      try {
          const sunglasses = await Sunglasses.find({});
          res.status(200).json(sunglasses);
      } catch (error) {
          res.status(500).json({ message: 'Error fetching sunglasses', error });
      }
  });

  module.exports = router