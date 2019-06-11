const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
    //res.json("Home route")
  } catch (err) {
    next(err)
  }
})

//get single user
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
