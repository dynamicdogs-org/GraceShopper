const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

//clear the database before all tests
describe('Products Model', () => {
  before(() => {
    return db.sync({force: true})
  })

  let product
  beforeEach(() => {
    product = Product.build({
      name: 'Blue Buffalo',
      description: 'Dog Food: Chicken',
      price: 1000,
      image:
        'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1507146426996-ef05306b995a%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1500%26q%3D80',
      tags: 'food',
      stock: 10
    })
  })

  // erase all tasks after each spec
  afterEach(() => {
    return db.sync({force: true})
  })

  describe('attributes definition', () => {
    it('includes name, description', async () => {
      const savedProduct = await product.save()
      expect(savedProduct.name).to.equal('Blue Buffalo')
      expect(savedProduct.description).to.equal('Dog Food: Chicken')
    })
  })
})
