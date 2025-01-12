const router = require("express").Router();
const userController = require('../controller/userController')
const sunglassesController = require('../controller/sunglassesController')

router.use('/users', userController)
router.use('/sunglasses', sunglassesController)

module.exports = router;
