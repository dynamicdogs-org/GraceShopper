import axios from 'axios'

const initialState = []

//ACTION TYPES:
const GET_CART = 'GET_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const ADD_ITEM = 'ADD_ITEM'
const CNANGE_QUANTITY = 'CHANGE_QUANTITY'
const EMPTY_CART = 'EMPTY_CART'

//ACTION CREATORS:
const getCart = products => {
  return {
    type: GET_CART,
    payload: products
  }
}

const addItemToCart = newProd => {
  return {
    type: ADD_ITEM,
    payload: newProd
  }
}

const deleteItemFromCart = itemId => {
  return {
    type: DELETE_ITEM,
    payload: itemId
  }
}

export const emptyCart = userId => {
  return {
    type: EMPTY_CART,
    payload: userId
  }
}

//THUNKS:
export const getCartThunk = userId => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/carts/${userId}`)
      dispatch(getCart(data))
    } catch (error) {
      console.log('getCartThunk: There was an error getting the cart: ', error)
    }
  }
}

export const addItemToCartThunk = (userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/carts/${userId}/${productId}`)
      dispatch(addItemToCart(data))
    } catch (error) {
      console.log('TCL: addItemToCartThunk -> error', error)
    }
  }
}

export const deleteItemFromCartThunk = (userId, productId) => {
  return async function(dispatch) {
    try {
      await axios.delete(`/api/carts/${userId}/${productId}`)
      dispatch(deleteItemFromCart(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const emptyCartThunk = userId => {
  return async function(dispatch) {
    try {
      await axios.delete(`/api/carts/${userId}`)
      dispatch(emptyCart(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

//CART REDUCER:
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART: {
      return action.payload
    }
    case ADD_ITEM: {
      return [...state, action.payload]
    }
    case DELETE_ITEM: {
      return [...state].filter(elem => elem.id !== action.payload)
    }
    case EMPTY_CART: {
      return []
    }
    default:
      return state
  }
}

export default cartReducer
