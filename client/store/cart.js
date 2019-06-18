import axios from 'axios'

const initialState = []

//ACTION TYPES:
const GET_CART = 'GET_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const ADD_ITEM = 'ADD_ITEM'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'

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

const changeQuantity = (prodId, quantity) => {
  return {
    type: CHANGE_QUANTITY,
    prodId: prodId,
    quantity: quantity
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
      //WAS:
      const {data} = await axios.post(`/api/carts/${userId}/${productId}`)
      //const {data.product, data.quantity} = await axios.post(`/api/carts/${userId}/${productId}`);
      //const result = await axios.post(`/api/carts/${userId}/${productId}`)
      //console.log("Result: ", result);

      const productAdded = data
      //const prodId = product.productId
      //const quantity = data.quantity;

      // console.log('product in addItemToCartThunk: ', product)
      // console.log('quantity in addItemToCartThunk: ', quantity)

      if (!productAdded) {
        console.log("productAdded = 'none'!")
        dispatch(changeQuantity(productId, 1))
      } else {
        console.log(
          'Product being dispatched from addItemToCartThunk: ',
          productAdded
        )
        dispatch(addItemToCart(productAdded))
      }
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

//CART REDUCER:
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART: {
      return action.payload
    }
    //OLD:
    case ADD_ITEM: {
      return [...state, action.payload]
    }

    case CHANGE_QUANTITY: {
      console.log('CHANGE QUAN REDUCER CALLED! ')
      console.log('State in change_quantity: ', state)
      console.log('action.quantity: ', action.quantity)
      const newState = [...state].map(product => {
        console.log('product: ', product)
        // console.log('action.prodId: ', action.prodId)
        // console.log('product.cart.quantity: ', product.quantity)
        // console.log('Action quantity: ', action.quantity)
        if (product.productId === action.productId) {
          console.log(
            'product with matching id found in cart change_quantity reducer!'
          )
          //WAS:
          //product.cart.quantity = action.quantity
          product.quantity = product.quantity + action.quantity
        }
        return product
      })
      return newState
      // return [...state, {productId: action.prodId, quantity: action.quantity}]
    }

    case DELETE_ITEM: {
      return [...state].filter(elem => elem.id != action.payload)
    }

    default:
      return state
  }
}

export default cartReducer
