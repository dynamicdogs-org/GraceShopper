const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'There is no description for this item.',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  displayPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      return `$${this.price / 100}`
    }
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
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  stockMessage: {
    type: Sequelize.VIRTUAL,
    get() {
      if (this.stock === 0) {
        return 'OUT OF STOCK'
      } else if (this.stock <= 5) {
        return `Going fast! Only ${this.stock} remaining!`
      } else {
        return 'In stock.'
      }
    }
  }
})

module.exports = Product
