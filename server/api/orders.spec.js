/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const User = db.model('user')

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

      const order1 = await Order.create({
        address: '5 Hanover Square, New York',
        paymentType: 'credit card',
        products: [
          {
            name: 'Blue Buffalo',
            description: 'Dog Food: Chicken',
            price: 1,
            image:
              'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1507146426996-ef05306b995a%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1500%26q%3D80',
            tags: 'food',
            stock: 10
          }
        ]
      })

      const order2 = await Order.create({
        address: '820 Macon St',
        paymentType: 'gift card',
        products: [
          {
            name: 'Blue Buffalo',
            description: 'Dog Food: Chicken',
            price: 1,
            image:
              'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1507146426996-ef05306b995a%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1500%26q%3D80',
            tags: 'food',
            stock: 10
          },
          {
            name: 'Huskys Favorite Food2',
            description: 'Dog Food: Vegetable2',
            price: 3022,
            image:
              'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            tags: 'food',
            stock: 6
          }
        ]
      })

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

    // it('POST /api/users', async () => {
    //   const res = await request(app)
    //     .post('/api/users')
    //     .send({
    //       email: 'scooby@doo.com',
    //       password: 'snax',
    //       firstName: 'Scooby',
    //       lastName: 'Doo'
    //     })
    //     .expect(201)

    //   const users = await request(app).get('/api/users')

    //   expect(users.body.length).to.be.equal(2)
    //   expect(res.body.firstName).to.be.equal('Scooby')
    // })

    // it('PUT /api/users/:userId', async () => {
    //   const res = await request(app)
    //     .put('/api/users/1')
    //     .send({email: 'codyZ2kool@puppybook.com'})
    //     .expect(200)

    //   expect(res.body.email).to.be.equal('codyZ2kool@puppybook.com')
    // })

    // it('DELETE /api/users/:userId', async () => {
    //   const res = await request(app)
    //     .delete('/api/users/1')
    //     .expect(204)

    //   const users = await request(app).get('/api/users')

    //   expect(users.body.length).to.be.equal(0)
    // })
  }) // end describe('/api/users')
}) // end describe('User routes')
