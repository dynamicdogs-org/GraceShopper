/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const Product = db.model('product')
const User = db.model('user')
const Cart = db.model('cart')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    beforeEach(async () => {
      const user1 = await User.create({
        email: 'husky1@bark.com',
        password: 'imahusky',
        firstName: 'Husky',
        lastName: 'TheDog'
      })

      const prod1 = await Product.create({
        name: 'Blue Buffalo',
        price: 1000,
        image:
          'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1507146426996-ef05306b995a%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1500%26q%3D80',
        tags: 'food',
        stock: 10
      })

      const prod2 = await Product.create({
        name: 'Huskys Favorite Food2',
        description: 'Dog Food: Vegetable2',
        price: 3022,
        image:
          'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        tags: 'food',
        stock: 6
      })

      const order1 = await Order.create({
        address: '5 Hanover Square, New York',
        paymentType: 'credit card',
        products: [prod1],
        orderTotal: 2000
      })

      const order2 = await Order.create({
        address: '820 Macon St',
        paymentType: 'gift card',
        products: [prod1, prod2],
        orderTotal: 5022
      })

      await user1.addProduct(prod1)

      await user1.addOrder(order1)
      await user1.addOrder(order2)
    })

    it('GET /api/orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
      expect(res.body[1].products.length).to.be.equal(2)
    })

    it('GET /api/orders/:orderId', async () => {
      const res = await request(app)
        .get('/api/orders/2')
        .expect(200)

      expect(res.body.paymentType).to.be.equal('gift card')
    })

    //this test is commented out
    xit('POST /api/orders', async () => {
      const orders1 = await request(app).get('/api/orders')
      const res = await request(app)
        .post('/api/orders')
        .send({
          address: '5 Hanover Sq',
          paymentType: 'gift card',
          //need a way to send logged in user id for testing
          id: 1
        })
        .expect(201)

      const orders2 = await request(app).get('/api/orders')

      expect(orders1.body.length).to.be.equal(2)

      expect(orders2.body.length).to.be.equal(3)
      expect(res.body.paymentType).to.be.equal('gift card')
    })

    it('PUT /api/orders/:orderId', async () => {
      const res = await request(app)
        .put('/api/orders/2')
        .send({orderStatus: 'processed'})
        .expect(200)

      const orderRes = await request(app).get('/api/orders/2')

      expect(res.body.orderStatus).to.be.equal('processed')
      expect(orderRes.body.orderStatus).to.be.equal('processed')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
