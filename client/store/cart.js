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

const changeQuantity = quantity => {
  return {
    type: CHANGE_QUANTITY,
    payload: quantity
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

      const product = data.product
      const quantity = data.quantity

      console.log('product: ', product)
      console.log('quantity: ', quantity)

      if (quantity) {
        // dispatch(changeQuantity(quantity))
        console.log("Quantity isn't null!")
      } else {
        console.log('Product being dispatched from add to cart: ', product)
        dispatch(addItemToCart(product))
        console.log('ELSE')
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
    // case ADD_ITEM: {
    //   return [...state, action.payload]
    // }
    case DELETE_ITEM: {
      return [...state].filter(elem => elem.id != action.payload)
    }

    default:
      return state
  }
}

export default cartReducer
