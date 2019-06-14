const router = require('express').Router()
const {Order} = require('../db/models')

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

// router.get('/:orderId', async (req, res, next) => {
//   try {

//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
