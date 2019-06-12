import axios from 'axios'

//initial state:
const initialState = []

//ACTION TYPES:
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const FAKE_THUNK = 'FAKE_THUNK'

//ACTION CREATORS :
const getAllProducts = products => {
  return {
    type: GET_ALL_PRODUCTS,
    payload: products
  }
}

const fakeThunkCreator = () => {
  return {
    type: FAKE_THUNK,
    payload: [1, 2, 3]
  }
}

//THUNKS:
export const getAllProductsThunk = function() {
  console.log('getAllProductsThunk was invoked!')
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getAllProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fakeThunk = function() {
  return async function(dispatch) {
    console.log('fakeThunk was dispatched!')
    dispatch(fakeThunkCreator())
  }
}

//PRODUCT REDUCER:
export const product = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return [...state, action.payload]
    case FAKE_THUNK:
      return action.payload
    default:
      return state
  }
}
