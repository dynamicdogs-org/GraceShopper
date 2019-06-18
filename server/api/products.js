const router = require('express').Router()
const {User, Product} = require('../db/models/')

//GET Route
router.get('/', async (req, res, next) => {
  try {
    //console.log("req.user in get all products api: ", req.user);
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.productId)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
