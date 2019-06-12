const {Cart, User, Product} = require('../db/models')
const router = require('express').Router()
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: [{model: Product, through: Cart}]
    })
    res.json(cart.products)
  } catch (error) {
    next(error)
  }
})
