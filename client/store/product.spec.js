// import { expect } from 'chai';
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import history from '../history'
// import { getAllProductsThunk } from './product';

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = {product: []}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('getAllProductsThunk', () => {
//     it('eventually dispatches the GET ALL PRODUCT action', async () => {
//       const fakeProduct = {
//         type: 'GET_ALL_PRODUCTS',
//         name: 'Blue Buff'
//       }
//       mockAxios.onGet('/products').replyOnce(200, fakeProduct)
//       await store.dispatch(getAllProductsThunk())
//       const actions = store.getActions()
//       console.log(actions[0].type)
//       expect(actions[0].type).to.be.equal('GET_ALL_PRODUCTS')
//       expect(actions[0].payload).to.be.deep.equal(fakeProduct)
//     })
//   })

// });
