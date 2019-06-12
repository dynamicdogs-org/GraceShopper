const {Cart, User, Product} = require('../db/models')
const router = require('express').Router()
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    //Might want to change to update quantity instead of creating new
    const [prod, wasCreated] = await Cart.findOrCreate({
      where: {
        userId: req.body.userId,
        productId: req.body.productId
      }
    })
    res.status(201).json(prod)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const prods = await user.getProducts()
    res.json(prods)
  } catch (error) {
    next(error)
  }
})
