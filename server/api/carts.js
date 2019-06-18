const {Cart, User, Product} = require('../db/models')
const router = require('express').Router()
module.exports = router

//Will create new component for UnAuthorized request
router.use('/:userId', (req, res, next) => {
  if (!req.user) {
    res.redirect('/login')
  } else if (+req.user.id !== +req.params.userId) {
    console.log('in cart API security middleware:::::: ')
    console.log('req.user.id', req.user.id)
    console.log('req.params.userId', req.params.userId)
    res.send('You are not authorized to perform this action')
  }
  next()
})

//Get All Cart Info for a particular user
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const prods = await user.getProducts()
    console.log('getCart prods returned: ', prods)
    res.json(prods)
  } catch (error) {
    next(error)
  }
})

//Add Item and User to the Cart Table
router.post('/:userId/:productId', async (req, res, next) => {
  try {
    console.log('ROUTER.POST API WAS CALLED!')
    const [product, wasCreated] = await Cart.findOrCreate({
      // const result = awaitCart.findOrCreate({
      where: {
        userId: req.params.userId,
        productId: req.params.productId
      }
    })
    //console.log('product in router.post: ', product)
    console.log('wasCreated: ', wasCreated)

    if (wasCreated === false) {
      console.log('wasCreated = false')
      console.log('Product quantity: ', product.quantity)
      //update quantity in carts model:
      //instance.increment(['number', 'count'], { by: 2 }) // increment number and count by 2
      //console.log('product.quantity before increment: ', product.quantity)
      product.increment(['quantity'], {by: 1})
      //console.log('Product.quantity after increment', new_prod.quantity)
      // const user = await User.findByPk(req.params.userId)
      // const prods = await user.getProducts({
      //   where: {
      //     id: productId,
      //   }
      //})
      //console.log("prods returned by addToCart: ", prods);

      res.status(201).json(0)

      // } else {
      //   res.status(201).send(prod)
    } else {
      //THE NEW OBJECT WAS CREATED:

      const user = await User.findByPk(req.params.userId)
      let productAdded = await user.getProducts({
        where: {
          id: req.params.productId
        }
      })
      productAdded = productAdded[0]

      console.log(
        'productAdded.cart returned by addToCart: ',
        productAdded.cart
      )
      res.status(201).json(productAdded)
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
