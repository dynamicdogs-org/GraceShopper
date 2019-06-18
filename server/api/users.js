const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//User Security Middleware to check if user is logged and isAdmin.
router.use('/', (req, res, next) => {
  //If user not logged in, redirect to login page
  if (!req.user) {
    res.redirect('/login')
  } else if (!req.user.isAdmin) {
    //If logged in, but not admin, don't allow access
    res.redirect('/notauthorized')
  }
  next()
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.status(200).json(users)
    //res.json("Home route")
  } catch (err) {
    next(err)
  }
})

//Only available to admin
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (!user) {
      res.send('User was not found!')
    } else {
      res.json(user)
    }
  } catch (error) {
    next(error)
  }
})

//Only available to admin
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

//Only available to admin
router.put('/:userId', async (req, res, next) => {
  try {
    const [numAffectedRows, [updatedUser]] = await User.update(req.body, {
      where: {
        id: req.params.userId
      },
      returning: true
    })
    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
})

//Only available to admin
router.delete('/:userId', async (req, res, next) => {
  try {
    const numAffectedRows = await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.status(204).json(numAffectedRows)
  } catch (error) {
    next(error)
  }
})
