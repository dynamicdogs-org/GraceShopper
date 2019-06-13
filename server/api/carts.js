const {Cart, User, Product} = require('../db/models')
const router = require('express').Router()
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const prods = await user.getProducts()
    res.json(prods)
  } catch (error) {
    next(error)
  }
})

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

router.delete('/:userId/:productId', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        userId: req.params.userId,
        productId: req.params.productId
      }
    })
    res.status(204).send('product removed from cart')
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/:productId', async (req, res, next) => {
  try {
    const [numAffectedRows, [updatedQuantity]] = await Cart.update(
      {quantity: req.body.quantity},
      {
        where: {
          userId: req.params.userId,
          productId: req.params.productId
        },
        returning: true
      }
    )
    res.status(200).json(updatedQuantity)
  } catch (error) {
    next(error)
  }
})