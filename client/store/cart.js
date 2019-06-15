import axios from 'axios'

const initialState = []

//ACTION TYPES:
const GET_CART = 'GET_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const ADD_ITEM = 'ADD_ITEM'
const CNANGE_QUANTITY = 'CHANGE_QUANTITY'

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

//THUNKS:
export const getCartThunk = userId => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/cart/${userId}`)
      dispatch(getCart(data))
    } catch (error) {
      console.log('There was an error getting the cart: ', error)
    }
  }
}

export const addItemToCartThunk = (userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/cart/${userId}/${productId}`)
      dispatch(addItemToCart(data))
    } catch (error) {
      console.log('TCL: addItemToCartThunk -> error', error)
    }
  }
}

export const deleteItemFromCartThunk = (userId, productId) => {
  return async function(dispatch) {
    try {
      await axios.delete(`/api/cart/${userId}/${productId}`)
      dispatch(deleteItemFromCart(productId))
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
      return [...state].filter(elem => elem.id != action.payload)
    }

    default:
      return state
  }
}

export default cartReducer
