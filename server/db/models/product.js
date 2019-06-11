const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'There is no description for this item.'
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  tags: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  stock: {
    type: Sequelize.STRING,
    defaultValue: 'OUT OF STOCK'
  }
})

module.exports = Product
