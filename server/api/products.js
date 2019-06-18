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

router.post('/', adminOnly, async (req, res, next) => {
  try {
    const prod = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price * 100,
      image: req.body.image,
      tags: req.body.tags,
      stock: req.body.stock
    })
    res.status(201).json(prod)
  } catch (error) {
    next(error)
  }
})

module.exports = router
