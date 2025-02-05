const router = require("express").Router();
const userController = require('../controller/userController')
const sunglassesController = require('../controller/sunglassesController')
const purchaseController = require('../controller/purchaseController')

router.use('/users', userController)
router.use('/sunglasses', sunglassesController)
router.use('/purchase', purchaseController)
module.exports = router;
