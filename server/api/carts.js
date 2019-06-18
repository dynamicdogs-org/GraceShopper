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
    //EXAMPLE of findOrCreate
    //User
    // .findOrCreate({where: {username: 'sdepold'}, defaults: {job: 'Technical Lead JavaScript'}})
    // .then(([user, created]) => {
    //   console.log(user.get({
    //     plain: true
    //   }))
    //   console.log(created)

    //WAS:
    const [prod, wasCreated] = await Cart.findOrCreate({
      // const result = awaitCart.findOrCreate({
      where: {
        userId: req.params.userId,
        productId: req.params.productId
      }
    })
    console.log('prod: ', prod)
    console.log('wasCreated: ', wasCreated)

    if (wasCreated === false) {
      console.log('Product quantity: ', prod.quantity)
      //update quantity in carts model:
      //instance.increment(['number', 'count'], { by: 2 }) // increment number and count by 2
      prod.increment(['quantity'], {by: 1})
      res.status(201).json(prod.quantity)
    } else {
      res.status(201).send(prod)
    }

    // .then(
    //   (result) => {
    //     console.log("prod: ", result[0]);
    //     console.log("wasCreated: ", result[1]);
    //   }
    // )
    // .then((prod, wasCreated) => {
    //   console.log("prod: ", prod);
    //   console.log("wasCreated: ", wasCreated);
    // })
    // .then ((prod, wasCreated) => {
    //   console.log(`prod: ${prod}, wasCreated: ${wasCreated}`)
    // })
    // .then (//callback with results of request
    //   (result) => {
    //     if (wasCreated >= 1) {
    //       console.log("Product quantity: ", prod.quantity);
    //       prod.quantity+=1;
    //     }
    //   }
    // )
    // .then(
    //   (prod) => {
    //     res.status(201).json(prod)
    //   }
    // )
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
