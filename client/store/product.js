import axios from 'axios'

// initial state:
const initialState = []

//ACTION TYPES:
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//ACTION CREATORS :
const getAllProducts = products => {
  return {
    type: GET_ALL_PRODUCTS,
    payload: products
  }
}

const getSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    payload: product
  }
}

//THUNKS:
export const getAllProductsThunk = function() {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getAllProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getSingleProductThunk = function(productId) {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(getSingleProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//PRODUCT REDUCER:
export const product = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.payload
    case GET_SINGLE_PRODUCT:
      return action.payload
    default:
      return state
  }
}
