/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')
const User = db.model('user')
const Product = db.model('product')
const session = require('supertest-session')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let authSession = session(app)

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
        lastName: 'TheDog',
        isAdmin: true
      })

      await authSession
        .post('/auth/login')
        .send({email: 'husky1@bark.com', password: 'imahusky'})
        .expect(200)

      const prod1 = await Product.create({
        name: 'Huskys Favorite Food',
        description: 'Dog Food: Vegetable',
        price: 5055,
        image:
          'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
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
        stock: 15
      })

      const prod3 = await Product.create({
        name: 'Huskys Favorite Food3',
        description: 'Dog Food: Vegetable3',
        price: 2523,
        image:
          'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        tags: 'food',
        stock: 20
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
      const res = await authSession.get('/api/carts/1').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].id).to.be.equal(2)
      expect(res.body[1].id).to.be.equal(3)
    })

    it("does not GET another user's cart", async () => {
      const res = await authSession.get('/api/carts/2').expect(302)

      expect(res.text).to.be.equal('Found. Redirecting to /notauthorized')
    })

    xit('POST /api/carts/1/3', async () => {
      const res = await authSession.post('/api/carts/1/3').expect(201)

      expect(res.body.productId).to.be.equal(3)
    })

    it('PUT /api/carts/:userId/:productId', async () => {
      const res = await authSession
        .put('/api/carts/1/2')
        .send({quantity: 10})
        .expect(200)

      expect(res.body.quantity).to.be.equal(10)
    })

    it('DELETE /api/carts/:userId/:productId', async () => {
      const res = await authSession.delete('/api/carts/1/3').expect(204)

      const users = await authSession.get('/api/carts/1')

      expect(users.body.length).to.be.equal(1)
    })

    it('DELETE /api/carts/:userId', async () => {
      const res = await authSession.delete('/api/carts/1').expect(204)

      const cart = await authSession.get('/api/carts/1')

      expect(cart.body.length).to.be.equal(0)
    })

    it('GET, POST, PUT, DELETE routes are accessible by Admin user', async () => {
      //regular user logs out:
      await authSession.post('/auth/logout').expect(302)

      //admin user logs in:
      await authSession
        .post('/auth/login')
        .send({
          email: 'husky2@bark.com',
          password: 'imahusky2'
        })
        .expect(200)

      const initialCart = await authSession.get('/api/carts/1').expect(200)

      await authSession
        .put('/api/carts/1/2')
        .send({quantity: 10})
        .expect(200)
      await authSession.delete('/api/carts/1/3').expect(204)

      const updatedCart = await authSession.get('/api/carts/1').expect(200)

      expect(initialCart.body.length).to.be.equal(2)
      expect(initialCart.body[0].cart.quantity).to.be.equal(1)

      expect(updatedCart.body.length).to.be.equal(1)
      expect(updatedCart.body[0].cart.quantity).to.be.equal(10)
    })
  }) // end describe('/api/carts')
}) // end describe('Carts routes')
//
