/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(() => {
      return Product.create({
        name: 'Blue Buffalo',
        description: 'Dog Food: Chicken',
        price: 1,
        image:
          'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1507146426996-ef05306b995a%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1500%26q%3D80',
        tags: 'food',
        stock: 10
      })
    })

    //
    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Blue Buffalo')
    })

    it('Get /api/products/1', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body.name).to.be.equal('Blue Buffalo')
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
//
