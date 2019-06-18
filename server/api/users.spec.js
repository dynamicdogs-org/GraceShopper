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

  let authSession = session(app)

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(async () => {
      await User.create({
        email: codysEmail,
        password: '123',
        firstName: 'Cody',
        lastName: 'Pug',
        isAdmin: true
      })

      await User.create({
        email: 'husky2@bark.com',
        password: 'imahusky2',
        firstName: 'Husky2',
        lastName: 'TheDog'
      })

      await authSession
        .post('/auth/login')
        .send({email: codysEmail, password: '123'})
        .expect(200)
    })

    it('GET /api/users', async () => {
      const res = await authSession.get('/api/users').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    it('GET /api/users/:userId', async () => {
      const res = await authSession.get('/api/users/1').expect(200)

      expect(res.body.email).to.be.equal(codysEmail)
    })

    it('POST /api/users', async () => {
      const res = await authSession
        .post('/api/users')
        .send({
          email: 'scooby@doo.com',
          password: 'snax',
          firstName: 'Scooby',
          lastName: 'Doo'
        })
        .expect(201)

      const users = await authSession.get('/api/users')

      expect(users.body.length).to.be.equal(3)
      expect(res.body.firstName).to.be.equal('Scooby')
    })

    it('PUT /api/users/:userId', async () => {
      const res = await authSession
        .put('/api/users/1')
        .send({email: 'codyZ2kool@puppybook.com'})
        .expect(200)

      const user = await authSession.get('/api/users/1')

      expect(user.body.email).to.be.equal('codyZ2kool@puppybook.com')
    })

    it('DELETE /api/users/:userId', async () => {
      await authSession.delete('/api/users/2').expect(204)

      const users = await authSession.get('/api/users/')

      expect(users.body).to.be.an('array')
      expect(users.body.length).to.be.equal(1)
    })

    it('non-Admin user cannot access routes', async () => {
      //admin user logs out:
      await authSession.post('/auth/logout').expect(302)

      //non-admin user logs in:
      await authSession
        .post('/auth/login')
        .send({
          email: 'husky2@bark.com',
          password: 'imahusky2'
        })
        .expect(200)

      await authSession.get('/api/users/2').expect(302)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
