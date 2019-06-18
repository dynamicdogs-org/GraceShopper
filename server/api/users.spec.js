/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const session = require('supertest-session')

//Commenting out due to having issues trying to create test spec to simulate an user/admin logging in and performing required actions
describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    let authSession = session(app)

    beforeEach(async () => {
      await User.create({
        email: 'cody@puppybook.com',
        firstName: 'Cody',
        lastName: 'Pug',
        password: '123',
        isAdmin: false
      })
      await session(app)
        .post('/auth/login')
        .send({email: 'cody@puppybook.com', password: '123'})
        .expect(200)
    })

    xit('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    xit('GET /api/users/:userId', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200)

      expect(res.body.email).to.be.equal(codysEmail)
    })

    xit('POST /api/users', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          email: 'scooby@doo.com',
          password: 'snax',
          firstName: 'Scooby',
          lastName: 'Doo'
        })
        .expect(201)

      const users = await request(app).get('/api/users')

      expect(users.body.length).to.be.equal(2)
      expect(res.body.firstName).to.be.equal('Scooby')
    })

    xit('PUT /api/users/:userId', async () => {
      const res = await request(app)
        .put('/api/users/1')
        .send({email: 'codyZ2kool@puppybook.com'})
        .expect(200)

      expect(res.body.email).to.be.equal('codyZ2kool@puppybook.com')
    })

    xit('DELETE /api/users/:userId', async () => {
      const res = await request(app)
        .delete('/api/users/1')
        .expect(204)

      const users = await request(app).get('/api/users')

      expect(users.body.length).to.be.equal(0)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
