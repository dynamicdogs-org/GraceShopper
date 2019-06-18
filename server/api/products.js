const router = require('express').Router()
const {User, Product} = require('../db/models/')

//Custom Middleware to allow admin access to particular routes within this Route
const adminOnly = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login')
  } else if (!req.user.isAdmin) {
    res.redirect('/notauthorized')
  }
  next()
}

//GET Route
router.get('/', async (req, res, next) => {
  try {
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

router.delete('/:productId', adminOnly, async (req, res, next) => {
  try {
    const numAffectedRows = await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.status(204).json(numAffectedRows)
  } catch (error) {
    console.log('TCL: error', error)
  }
})

module.exports = router
