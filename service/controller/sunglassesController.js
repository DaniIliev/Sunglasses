const router = require('express').Router()
const Sunglasses = require('../schemas/SunglassesSchema')
const authenticate = require("../utills/authmiddleware");
const mongoose = require("mongoose");
const upload = require("../storage")

router.post('/add',  upload.array('images', 5),async (req, res) => {
  const imageUrls = req.files.map(file => file.path);
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
        images: imageUrls,
        description: req.body.description,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        name: req.body.name,
        frameColor: req.body.frameColor,
    });
  
    try {
        await newSunglasses.save();
        res.status(201).json({ message: 'Слънчевите очила са добавени успешно!' });
    } catch (error) {
        console.error('Error saving sunglasses:', error); // Логване на грешката
        res.status(500).json({ message: 'Грешка при добавяне на слънчевите очила', error });
    }
  });

  router.patch('/edit/:id', upload.array('images', 5), async (req, res) => {
    const { id } = req.params;
    const imageUrls = req.files.map(file => file.path);
  
    const updateData = {
      frameWidth: req.body.frameWidth,
      frameHeight: req.body.frameHeight,
      lensWidth: req.body.lensWidth,
      templeLength: req.body.templeLength,
      gender: req.body.gender,
      frameShape: req.body.frameShape,
      lensType: req.body.lensType,
      frameMaterial: req.body.frameMaterial,
      UV_Protection: req.body.UV_Protection,
      description: req.body.description,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      name: req.body.name,
      frameColor: req.body.frameColor,
    };
    if (imageUrls.length > 0) {
      updateData.images = imageUrls; // само ако има качени нови
    }
  
    try {
      const updated = await Sunglasses.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) return res.status(404).json({ message: 'Не са намерени очила с това ID.' });
  
      res.json({ message: 'Очилата са обновени успешно.', data: updated });
    } catch (error) {
      console.error('Error updating sunglasses:', error);
      res.status(500).json({ message: 'Грешка при обновяване', error });
    }
  });

  router.get("/:id" ,async (req, res) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      const item = await Sunglasses.findById(id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      console.error("Error fetching item:", error);
      res.status(500).json({ message: "Server error", error });
    }
  }); 
  
  router.delete("/delete/:id", async (req, res) => {
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
        // const { startIndex, limit } = req.query;

        // const start = parseInt(startIndex, 24);
        // const pageLimit = parseInt(limit, 24);

          const sunglasses = await Sunglasses.find({})
          // .skip(start)
          // .limit(pageLimit);
          res.status(200).json(sunglasses);
      } catch (error) {
          res.status(500).json({ message: 'Error fetching sunglasses', error });
      }
  });

  module.exports = router