import axios from 'axios'

//initial state:
const initialState = []

//ACTION TYPES:
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

//ACTION CREATORS :
const getAllProducts = products => {
  return {
    type: GET_ALL_PRODUCTS,
    payload: products
  }
}

//THUNKS:
export const getAllProductsThunk = function() {
  console.log('getAllProductsThunk was invoked!')
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/products')
      console.log('thunk data', data)
      dispatch(getAllProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//PRODUCT REDUCER:
export const product = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      console.log('payload', action.payload)
      return action.payload
    default:
      return state
  }
}
