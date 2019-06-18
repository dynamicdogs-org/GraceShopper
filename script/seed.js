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
      lastName: 'Pug',
      isAdmin: true
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
        'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      tags: 'food',
      stock: 5
    }),
    Product.create({
      name: 'Red Buffalo',
      description: 'Dog Food: Chicken',
      price: 3000,
      image:
        'https://images.unsplash.com/photo-1478369402113-1fd53f17e8b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      tags: 'food',
      stock: 7
    }),
    Product.create({
      name: 'Taste of the Wild',
      description: 'Dog Food: Chicken',
      price: 1000,
      image:
        'https://images.unsplash.com/photo-1453831362806-3d5577f014a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      tags: 'food',
      stock: 10
    }),
    Product.create({
      name: 'American Journey',
      description: 'Dog Food: Vegetable',
      price: 2050,
      image:
        'https://images.unsplash.com/photo-1504185945330-7a3ca1380535?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
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
      'https://images.unsplash.com/photo-1514537099923-4c0fc7c73161?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    tags: 'food',
    stock: 15
  })

  const prod2 = await Product.create({
    name: 'Huskys Favorite Food2',
    description: 'Dog Food: Vegetable2',
    price: 3022,
    image:
      'https://images.unsplash.com/photo-1541795795328-f073b763494e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    tags: 'food',
    stock: 6
  })

  const prod3 = await Product.create({
    name: 'Huskys Favorite Food3',
    description: 'Dog Food: Vegetable3',
    price: 2523,
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    tags: 'food',
    stock: 19
  })

  const order1 = await Order.create({
    address: '5 Hanover Square, New York',
    paymentDetails: {some: 'details'},
    products: [
      {
        name: 'Blue Buffalo',
        price: 1000,
        quantity: 4
      }
    ],
    orderTotal: 4000
  })

  const order2 = await Order.create({
    address: '820 Macon St',
    paymentType: 'gift card',
    paymentDetails: {some: 'details'},
    products: [
      {
        name: 'Blue Buffalo',
        price: 1000,
        quantity: 2
      },
      {
        name: 'Huskys Favorite Food2',
        price: 3022,
        quantity: 1
      }
    ],
    orderTotal: 5022
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
