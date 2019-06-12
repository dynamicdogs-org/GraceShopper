/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')
const User = db.model('user')
const Product = db.model('product')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/carts/', () => {
    beforeEach(async () => {
      const user1 = await User.create({
        email: 'husky1@bark.com',
        password: 'imahusky',
        firstName: 'Husky',
        lastName: 'TheDog'
      })

      const user2 = await User.create({
        email: 'husky2@bark.com',
        password: 'imahusky2',
        firstName: 'Husky2',
        lastName: 'TheDog'
      })

      const prod1 = await Product.create({
        name: 'Huskys Favorite Food',
        description: 'Dog Food: Vegetable',
        price: 50.55,
        image:
          'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        tags: 'food',
        stock: 'In stock'
      })

      const prod2 = await Product.create({
        name: 'Huskys Favorite Food2',
        description: 'Dog Food: Vegetable2',
        price: 30.22,
        image:
          'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        tags: 'food',
        stock: 'In stock'
      })

      const prod3 = await Product.create({
        name: 'Huskys Favorite Food3',
        description: 'Dog Food: Vegetable3',
        price: 25.23,
        image:
          'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        tags: 'food',
        stock: 'In stock'
      })

      const cart1 = await Cart.create({
        userId: 1,
        productId: 2
      })

      const cart2 = await Cart.create({
        userId: 1,
        productId: 3
      })

      const cart3 = await Cart.create({
        userId: 2,
        productId: 3
      })
    })

    it('GET /api/carts/:userId', async () => {
      const res = await request(app)
        .get('/api/carts/1')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].id).to.be.equal(2)
    })

    it('POST /api/carts', async () => {
      const res = await request(app)
        .post('/api/carts')
        .send({userId: 2, productId: 3})
        .expect(201)

      expect(res.body.productId).to.be.equal(3)
    })

    it('PUT /api/carts/:userId/:productId', async () => {
      const res = await request(app)
        .put('/api/carts/1/2')
        .send({quantity: 10})
        .expect(200)

      expect(res.body.quantity).to.be.equal(10)
    })

    it('DELETE /api/carts/:userId/:productId', async () => {
      const res = await request(app)
        .delete('/api/carts/2/3')
        .expect(204)

      const users = await request(app).get('/api/carts/2')

      expect(users.body.length).to.be.equal(0)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
