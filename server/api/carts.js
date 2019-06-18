const {Cart, User, Product} = require('../db/models')
const router = require('express').Router()
module.exports = router

router.use('/:userId', (req, res, next) => {
  if (!req.user) {
    res.redirect('/login')
  } else if (+req.user.id === +req.params.userId || req.user.isAdmin) {
    next()
  } else {
    res.redirect('/notauthorized')
  }
})

//Get All Cart Info for a particular user
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const prods = await user.getProducts()
    res.json(prods)
  } catch (error) {
    next(error)
  }
})

//Add Item and User to the Cart Table
router.post('/:userId/:productId', async (req, res, next) => {
  try {
    const [product, wasCreated] = await Cart.findOrCreate({
      // const result = awaitCart.findOrCreate({
      where: {
        userId: req.params.userId,
        productId: req.params.productId
      }
    })
    if (wasCreated === false) {
      product.increment(['quantity'], {by: 1})
      res.status(201).json(0)
    } else {
      //THE NEW OBJECT WAS CREATED:
      const user = await User.findByPk(req.params.userId)
      let productAdded = await user.getProducts({
        where: {
          id: req.params.productId
        }
      })
      productAdded = productAdded[0]
      res.status(201).json(productAdded)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/:productId', async (req, res, next) => {
  try {
    console.log('delete single product')
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

router.delete('/:userId', async (req, res, next) => {
  try {
    console.log('delete all products')
    await Cart.destroy({
      where: {
        userId: req.params.userId
      }
    })
    res.status(204).send('Cart emptied.')
  } catch (error) {
    next(error)
  }
})

//To update cart quantity for a specific product
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
