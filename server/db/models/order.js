const sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  address: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  paymentType: {
    type: sequelize.ENUM('credit card', 'gift card', 'paypal'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  orderStatus: {
    type: sequelize.ENUM('submitted', 'processed', 'shipped', 'delivered'),
    defaultValue: 'submitted',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  products: {
    type: sequelize.ARRAY(sequelize.JSON),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rawDate: {
    type: sequelize.DATE
  },
  date: {
    type: sequelize.VIRTUAL,
    get() {
      return (
        this.rawDate.getMonth() +
        1 +
        '/' +
        this.rawDate.getDate() +
        '/' +
        this.rawDate.getFullYear()
      )
    }
  },
  time: {
    type: sequelize.VIRTUAL,
    get() {
      return (
        this.rawDate.getHours() +
        ':' +
        this.rawDate.getMinutes() +
        ':' +
        this.rawDate.getSeconds()
      )
    }
  }
})

Order.beforeValidate(orderInstance => {
  orderInstance.rawDate = orderInstance.createdAt
})

module.exports = Order
