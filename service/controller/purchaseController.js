const router = require('express').Router()
const Purchase = require('../schemas/PurchaseSchema')

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
    });
    try{
        await newPurchase.save();
        res.status(201).json({ message: 'Слънчевите очила са добавени успешно!' });
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
module.exports = router
