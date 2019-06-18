const router = require('express').Router()
const {Order, User, Product, Cart} = require('../db/models')

//Custom Middleware to allow admin access to particular routes within this Route
const adminOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.redirect('/notauthorized')
  }
  next()
}

//Middleware to check if logged in user is Admin or or the owner of the order, if not redirect them
const adminOrUser = async (req, res, next) => {
  const order = await Order.findByPk(req.params.orderId)
  if (req.user.isAdmin || +req.user.id === +order.userId) {
    next()
  } else {
    res.redirect('/notauthorized')
  }
}

//Middleware to check if currently logged in user is admin or
//same id as the req.params.userId passed in by the checkout thunk
const newOrderAdminOrUser = (req, res, next) => {
  if (req.user.isAdmin || +req.user.id === +req.params.userId) {
    next()
  } else {
    res.redirect('/notauthorized')
  }
}

//Route to create order for a particular user
router.post('/user/:userId', newOrderAdminOrUser, async (req, res, next) => {
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

    const order = await Order.create({
      userId: req.user.id,
      paymentDetails: req.body.paymentDetails,
      address: req.body.address,
      products: req.body.products,
      orderTotal: req.body.orderTotal
    })
    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
})

//Route to get all orders info
//Only allow admins to retrieve all orders in orders model
router.get('/', adminOnly, async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
})

//Route to get a single/particular order info that belongs to a user
router.get('/:orderId', adminOrUser, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
})

//Route to get all orders that belong to a logged in User. Written by KL
//URI: /orders/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    const orderHistory = await Order.findAll({
      where: {
        userId: userId
      }
    })
    res.json(orderHistory)
  } catch (error) {
    next(error)
  }
})

//Route to update order status
router.put('/:orderId', adminOrUser, async (req, res, next) => {
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

//Route to delete order
router.delete('/:orderId', adminOrUser, async (req, res, next) => {
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
