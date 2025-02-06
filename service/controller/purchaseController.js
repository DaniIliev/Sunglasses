const router = require('express').Router()
const Purchase = require('../schemas/PurchaseSchema')
const mongoose = require("mongoose")

router.post('/', async (req, res) => {

    const newPurchase = new Purchase({
        additionalInfo: req.body.additionalInfo,
        address: req.body.address,
        addressNum: req.body.addressNum,
        area: req.body.area,
        city: req.body.city,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber,
        state: req.body.state,
        sunglasses: req.body.sunglasses,
        totalPurchasePrice: req.body.totalPurchasePrice,
        zipCode: req.body.zipCode,
        orderCode: req.body.orderCode,
        purchaseDate: req.body.purchaseDate
    });
    try{
        await newPurchase.save();
        res.status(201).json(newPurchase);
    } catch (error) {
        console.error('Error saving sunglasses:', error); // Логване на грешката
        res.status(500).json({ message: 'Грешка при добавяне на слънчевите очила', error });
    }
})

router.get('/', async (req, res) => {
    try {
        const purchases = await Purchase.find({});
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sunglasses', error });
    }
});

router.get('/:id', async (req,res) => {
    const {id} = req.params;
    
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
  
       const purchase = await Purchase.findById(id);
      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }
  
    
      res.status(200).json(purchase);
    } catch (error) {
      console.error("Error fetching purchase:", error);
      res.status(500).json({ message: "Server error", error });
    }
  }); 
module.exports = router
