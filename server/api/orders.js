const router = require('express').Router()
const {Order, User, Product, Cart} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // const cart = await Cart.findAll({
    //   where: {
    //     userId: req.user.id
    //   }
    // })
    // const products = cart.map(async product => {
    //   const productData = await Product.findByPk(product.productId, {
    //     attributes: ['name', 'displayPrice', 'price']
    //   })
    //   return {...productData, quantity: product.quantity}
    // })
    // const orderTotal = products.reduce(
    //   (acc, cur) => acc + cur.price * cur.quantity
    // )
    // const address = req.body.address
    // const paymentType = req.body.paymentType
    // const order = await Order.create({
    //   address,
    //   paymentType,
    //   orderTotal,
    //   products
    // })

    const order = await Order.create({...req.body, userId: req.user.id})
    console.log('req.body is =======>', req.body)
    console.log('order is: ', order)
    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const [numAffectedRows, [updatedOrderStatus]] = await Order.update(
      {
        orderStatus: req.body.orderStatus
      },
      {
        where: {
          id: req.params.orderId
        },
        returning: true
      }
    )
    res.status(200).json(updatedOrderStatus)
  } catch (error) {
    next(error)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        id: req.params.orderId
      }
    })
    res.status(200).send('Order deleted.')
  } catch (error) {
    next(error)
  }
})

module.exports = router
