'use strict'

const db = require('../server/db')
const {User, Product, Cart, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Pug'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Brown'
    }),
    User.create({
      email: 'scooby@doo.com',
      password: 'snax',
      firstName: 'Scooby',
      lastName: 'Doo'
    }),
    User.create({
      email: 'snoopy@peanuts.com',
      password: 'woodstock',
      firstName: 'Snoopy',
      lastName: 'Brown'
    }),
    User.create({
      email: 'woof@bark.com',
      password: 'imadog',
      firstName: 'Spot',
      lastName: 'Thedog'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Blue Buffalo',
      description: 'Dog Food: Chicken',
      price: 1000,
      image:
        'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1507146426996-ef05306b995a%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1500%26q%3D80',
      tags: 'food',
      stock: 5
    }),
    Product.create({
      name: 'Red Buffalo',
      description: 'Dog Food: Chicken',
      price: 3000,
      image:
        'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      tags: 'food',
      stock: 7
    }),
    Product.create({
      name: 'Taste of the Wild',
      description: 'Dog Food: Chicken',
      price: 1000,
      image:
        'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      tags: 'food',
      stock: 10
    }),
    Product.create({
      name: 'American Journey',
      description: 'Dog Food: Vegetable',
      price: 2050,
      image:
        'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      tags: 'food',
      stock: 20
    })
  ])

  //Create Relationship rows with Product and User with Cart Table
  //Object.keys(${ModelName}.prototype) - Replace ModelName with appropriate table name
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
    price: 5055,
    image:
      'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    tags: 'food',
    stock: 15
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

  const prod3 = await Product.create({
    name: 'Huskys Favorite Food3',
    description: 'Dog Food: Vegetable3',
    price: 2523,
    image:
      'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    tags: 'food',
    stock: 19
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

  await user1.addProduct(prod1)
  await user2.addProduct(prod2)
  await user1.addProduct(prod3)

  await user1.addOrder(order1)
  await user1.addOrder(order2)

  console.log(`Created Cart Joint Table Successfully`)

  console.log(`Seeded Successfully`)
}
//
// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
