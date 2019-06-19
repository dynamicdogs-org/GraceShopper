'use strict'

const db = require('../server/db')
const {User, Product, Cart, Order} = require('../server/db/models')

const products = [
  {
    name: 'blandit ultrices enim',
    price: 8317,
    description:
      'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
    tags: 'Triple-buffered',
    stock: 27,
    image:
      'https://cdn.pixabay.com/photo/2015/11/20/17/51/fabric-dog-1053580__340.jpg'
  },
  {
    name: 'odio',
    price: 4236,
    description:
      'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    tags: 'forecast',
    stock: 11,
    image:
      'https://image.shutterstock.com/image-photo/jack-russell-terrier-dog-running-260nw-342653459.jpg'
  },
  {
    name: 'ultrices posuere',
    price: 984,
    description:
      'Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.',
    tags: 'dynamic',
    stock: 14,
    image:
      'https://image.shutterstock.com/image-photo/dog-baby-jack-russell-terrier-260nw-522593821.jpg'
  },
  {
    name: 'metus',
    price: 7226,
    description:
      'Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.',
    tags: 'Optional',
    stock: 20,
    image:
      'https://image.shutterstock.com/image-photo/sweetest-puppies-260nw-410286619.jpg'
  },
  {
    name: 'quis',
    price: 7751,
    description: 'Nulla ut erat id mauris vulputate elementum.',
    tags: 'intangible',
    stock: 25,
    image: 'https://cdn.pixabay.com/photo/2017/10/30/08/12/dog-2901704__340.jpg'
  },
  {
    name: 'non velit',
    price: 634,
    description: 'Donec dapibus. Duis at velit eu est congue elementum.',
    tags: 'encoding',
    stock: 6,
    image:
      'https://cdn.pixabay.com/photo/2015/05/28/15/24/malinois-and-border-collie-788032__340.jpg'
  },
  {
    name: 'suspendisse ornare consequat',
    price: 840,
    description:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.',
    tags: 'mobile',
    stock: 21,
    image: 'https://cdn.pixabay.com/photo/2016/08/01/13/13/dog-1561011__340.jpg'
  },
  {
    name: 'nascetur ridiculus',
    price: 6142,
    description: 'Duis mattis egestas metus.',
    tags: 'array',
    stock: 7,
    image:
      'https://cdn.pixabay.com/photo/2017/07/31/08/12/dogs-2556820__340.jpg'
  },
  {
    name: 'nonummy maecenas tincidunt',
    price: 6798,
    description: 'Duis ac nibh.',
    tags: '24/7',
    stock: 17,
    image: 'https://cdn.pixabay.com/photo/2019/05/19/21/02/dog-4215239__340.jpg'
  },
  {
    name: 'cum sociis natoque',
    price: 7718,
    description: 'Curabitur at ipsum ac tellus semper interdum.',
    tags: 'Versatile',
    stock: 10,
    image:
      'https://cdn.pixabay.com/photo/2017/04/14/16/14/retriever-2230676__340.jpg'
  },
  {
    name: 'vulputate vitae nisl',
    price: 9812,
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    tags: 'regional',
    stock: 18,
    image:
      'https://cdn.pixabay.com/photo/2017/03/08/01/19/chihuahua-2125691__340.jpg'
  },
  {
    name: 'sit',
    price: 1439,
    description:
      'Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.',
    tags: 'transitional',
    stock: 3,
    image:
      'https://cdn.pixabay.com/photo/2014/10/14/09/03/terrier-487963__340.jpg'
  },
  {
    name: 'ante vel',
    price: 9414,
    description: 'In eleifend quam a odio.',
    tags: 'help-desk',
    stock: 25,
    image: 'https://cdn.pixabay.com/photo/2013/07/26/11/50/dog-167663__340.jpg'
  },
  {
    name: 'vestibulum',
    price: 5851,
    description: 'Curabitur convallis.',
    tags: 'capacity',
    stock: 21,
    image: 'https://cdn.pixabay.com/photo/2013/02/02/18/55/dog-77424__340.jpg'
  },
  {
    name: 'a libero',
    price: 679,
    description: 'Integer tincidunt ante vel ipsum.',
    tags: 'Team-oriented',
    stock: 29,
    image:
      'https://cdn.pixabay.com/photo/2019/02/02/16/57/golden-retriever-3970969__340.jpg'
  },
  {
    name: 'in purus eu',
    price: 4752,
    description:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis.',
    tags: 'frame',
    stock: 18,
    image: 'https://cdn.pixabay.com/photo/2019/02/23/14/46/dog-4015761__340.jpg'
  },
  {
    name: 'in leo maecenas',
    price: 3238,
    description:
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.',
    tags: 'Diverse',
    stock: 22,
    image: 'https://cdn.pixabay.com/photo/2018/02/22/15/11/dog-3173214__340.jpg'
  },
  {
    name: 'libero rutrum ac',
    price: 1075,
    description: 'Donec ut mauris eget massa tempor convallis.',
    tags: 'Inverse',
    stock: 4,
    image:
      'https://cdn.pixabay.com/photo/2015/11/20/17/51/fabric-dog-1053580__340.jpg'
  },
  {
    name: 'mauris viverra',
    price: 2288,
    description: 'Etiam faucibus cursus urna. Ut tellus.',
    tags: 'capacity',
    stock: 1,
    image:
      'https://image.shutterstock.com/image-photo/jack-russell-terrier-dog-running-260nw-342653459.jpg'
  },
  {
    name: 'integer non velit',
    price: 5823,
    description: 'Maecenas rhoncus aliquam lacus.',
    tags: 'tertiary',
    stock: 29,
    image:
      'https://image.shutterstock.com/image-photo/dog-baby-jack-russell-terrier-260nw-522593821.jpg'
  },
  {
    name: 'suspendisse potenti',
    price: 4157,
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus.',
    tags: 'even-keeled',
    stock: 14,
    image:
      'https://image.shutterstock.com/image-photo/sweetest-puppies-260nw-410286619.jpg'
  },
  {
    name: 'bibendum imperdiet',
    price: 540,
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
    tags: 'contextually-based',
    stock: 4,
    image: 'https://cdn.pixabay.com/photo/2017/10/30/08/12/dog-2901704__340.jpg'
  },
  {
    name: 'neque libero convallis',
    price: 7872,
    description:
      'Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    tags: 'Exclusive',
    stock: 5,
    image:
      'https://cdn.pixabay.com/photo/2015/05/28/15/24/malinois-and-border-collie-788032__340.jpg'
  },
  {
    name: 'mollis molestie',
    price: 1210,
    description: 'Integer ac neque.',
    tags: 'support',
    stock: 17,
    image: 'https://cdn.pixabay.com/photo/2016/08/01/13/13/dog-1561011__340.jpg'
  },
  {
    name: 'tortor',
    price: 9380,
    description: 'Pellentesque ultrices mattis odio.',
    tags: 'Adaptive',
    stock: 29,
    image:
      'https://cdn.pixabay.com/photo/2017/07/31/08/12/dogs-2556820__340.jpg'
  },
  {
    name: 'justo in blandit',
    price: 1013,
    description: 'Duis mattis egestas metus. Aenean fermentum.',
    tags: 'support',
    stock: 7,
    image: 'https://cdn.pixabay.com/photo/2019/05/19/21/02/dog-4215239__340.jpg'
  },
  {
    name: 'in faucibus',
    price: 4698,
    description: 'Sed ante. Vivamus tortor.',
    tags: 'Enhanced',
    stock: 21,
    image:
      'https://cdn.pixabay.com/photo/2017/04/14/16/14/retriever-2230676__340.jpg'
  },
  {
    name: 'sem duis',
    price: 3388,
    description: 'Duis ac nibh.',
    tags: 'grid-enabled',
    stock: 14,
    image:
      'https://cdn.pixabay.com/photo/2017/03/08/01/19/chihuahua-2125691__340.jpg'
  },
  {
    name: 'arcu sed',
    price: 9237,
    description: 'Pellentesque eget nunc.',
    tags: 'Digitized',
    stock: 29,
    image:
      'https://cdn.pixabay.com/photo/2014/10/14/09/03/terrier-487963__340.jpg'
  },
  {
    name: 'integer',
    price: 1864,
    description:
      'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    tags: 'Cloned',
    stock: 29,
    image: 'https://cdn.pixabay.com/photo/2013/07/26/11/50/dog-167663__340.jpg'
  },
  {
    name: 'quisque',
    price: 3569,
    description:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    tags: 'synergy',
    stock: 7,
    image: 'https://cdn.pixabay.com/photo/2013/02/02/18/55/dog-77424__340.jpg'
  },
  {
    name: 'dictumst aliquam',
    price: 5461,
    description: 'Proin risus. Praesent lectus.',
    tags: 'Implemented',
    stock: 3,
    image:
      'https://cdn.pixabay.com/photo/2019/02/02/16/57/golden-retriever-3970969__340.jpg'
  },
  {
    name: 'rhoncus mauris',
    price: 7454,
    description: 'Nulla tempus.',
    tags: 'challenge',
    stock: 24,
    image: 'https://cdn.pixabay.com/photo/2019/02/23/14/46/dog-4015761__340.jpg'
  },
  {
    name: 'magnis dis',
    price: 5147,
    description: 'Vivamus vestibulum sagittis sapien.',
    tags: 'modular',
    stock: 30,
    image: 'https://cdn.pixabay.com/photo/2018/02/22/15/11/dog-3173214__340.jpg'
  },
  {
    name: 'cras',
    price: 8894,
    description: 'Nunc purus. Phasellus in felis.',
    tags: 'Diverse',
    stock: 12,
    image:
      'https://cdn.pixabay.com/photo/2015/11/20/17/51/fabric-dog-1053580__340.jpg'
  },
  {
    name: 'libero nam dui',
    price: 8279,
    description: 'Etiam faucibus cursus urna. Ut tellus.',
    tags: 'Reverse-engineered',
    stock: 30,
    image:
      'https://image.shutterstock.com/image-photo/jack-russell-terrier-dog-running-260nw-342653459.jpg'
  },
  {
    name: 'etiam vel augue',
    price: 5140,
    description:
      'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.',
    tags: 'Stand-alone',
    stock: 7,
    image:
      'https://image.shutterstock.com/image-photo/dog-baby-jack-russell-terrier-260nw-522593821.jpg'
  },
  {
    name: 'augue aliquam',
    price: 9593,
    description:
      'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    tags: 'content-based',
    stock: 22,
    image:
      'https://image.shutterstock.com/image-photo/sweetest-puppies-260nw-410286619.jpg'
  },
  {
    name: 'orci luctus et',
    price: 5781,
    description:
      'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.',
    tags: 'Persistent',
    stock: 16,
    image: 'https://cdn.pixabay.com/photo/2017/10/30/08/12/dog-2901704__340.jpg'
  },
  {
    name: 'proin leo odio',
    price: 7928,
    description: 'Aenean sit amet justo. Morbi ut odio.',
    tags: 'toolset',
    stock: 15,
    image:
      'https://cdn.pixabay.com/photo/2015/05/28/15/24/malinois-and-border-collie-788032__340.jpg'
  },
  {
    name: 'nulla',
    price: 1090,
    description: 'Nulla nisl. Nunc nisl.',
    tags: 'circuit',
    stock: 19,
    image: 'https://cdn.pixabay.com/photo/2016/08/01/13/13/dog-1561011__340.jpg'
  },
  {
    name: 'dictumst morbi',
    price: 1264,
    description: 'Pellentesque eget nunc.',
    tags: 'data-warehouse',
    stock: 6,
    image:
      'https://cdn.pixabay.com/photo/2017/07/31/08/12/dogs-2556820__340.jpg'
  },
  {
    name: 'sagittis sapien',
    price: 5522,
    description:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.',
    tags: 'initiative',
    stock: 13,
    image: 'https://cdn.pixabay.com/photo/2019/05/19/21/02/dog-4215239__340.jpg'
  },
  {
    name: 'quam fringilla',
    price: 2069,
    description: 'Morbi porttitor lorem id ligula.',
    tags: 'utilisation',
    stock: 23,
    image:
      'https://cdn.pixabay.com/photo/2017/04/14/16/14/retriever-2230676__340.jpg'
  },
  {
    name: 'tincidunt',
    price: 5535,
    description: 'Etiam justo.',
    tags: 'Streamlined',
    stock: 23,
    image:
      'https://cdn.pixabay.com/photo/2017/03/08/01/19/chihuahua-2125691__340.jpg'
  },
  {
    name: 'nulla',
    price: 7911,
    description: 'Duis ac nibh.',
    tags: 'policy',
    stock: 4,
    image:
      'https://cdn.pixabay.com/photo/2014/10/14/09/03/terrier-487963__340.jpg'
  },
  {
    name: 'convallis eget',
    price: 7976,
    description:
      'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.',
    tags: 'next generation',
    stock: 23,
    image: 'https://cdn.pixabay.com/photo/2013/07/26/11/50/dog-167663__340.jpg'
  },
  {
    name: 'accumsan felis',
    price: 7340,
    description:
      'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.',
    tags: 'Re-engineered',
    stock: 25,
    image: 'https://cdn.pixabay.com/photo/2013/02/02/18/55/dog-77424__340.jpg'
  },
  {
    name: 'in blandit',
    price: 1053,
    description: 'Duis bibendum. Morbi non quam nec dui luctus rutrum.',
    tags: 'data-warehouse',
    stock: 20,
    image:
      'https://cdn.pixabay.com/photo/2019/02/02/16/57/golden-retriever-3970969__340.jpg'
  },
  {
    name: 'non',
    price: 8653,
    description: 'Proin eu mi. Nulla ac enim.',
    tags: 'parallelism',
    stock: 30,
    image: 'https://cdn.pixabay.com/photo/2019/02/23/14/46/dog-4015761__340.jpg'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  for (let idx = 0; idx < products.length; idx++) {
    await Product.create(products[idx])
  }

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

  // const products = await Promise.all([
  //   Product.create({
  //     name: 'Blue Buffalo',
  //     description: 'Dog Food: Chicken',
  //     price: 1000,
  //     image:
  //       'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  //     tags: 'food',
  //     stock: 5
  //   }),
  //   Product.create({
  //     name: 'Red Buffalo',
  //     description: 'Dog Food: Chicken',
  //     price: 3000,
  //     image:
  //       'https://images.unsplash.com/photo-1478369402113-1fd53f17e8b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  //     tags: 'food',
  //     stock: 7
  //   }),
  //   Product.create({
  //     name: 'Taste of the Wild',
  //     description: 'Dog Food: Chicken',
  //     price: 1000,
  //     image:
  //       'https://images.unsplash.com/photo-1453831362806-3d5577f014a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  //     tags: 'food',
  //     stock: 10
  //   }),
  //   Product.create({
  //     name: 'American Journey',
  //     description: 'Dog Food: Vegetable',
  //     price: 2050,
  //     image:
  //       'https://images.unsplash.com/photo-1504185945330-7a3ca1380535?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  //     tags: 'food',
  //     stock: 20
  //   })
  // ])

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
