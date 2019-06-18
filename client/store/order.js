import axios from 'axios'
import {emptyCart} from './cart'

//action type
const SUBMIT_ORDER = 'SUBMIT_ORDER'

//action creators
const submitOrder = orderData => {
  return {
    type: SUBMIT_ORDER,
    payload: orderData
  }
}

//thunks
export const submitOrderThunk = function(order, userId) {
  return async function(dispatch) {
    try {
      const {data} = await axios.post(`/api/orders/user/${userId}`, order)
      if (data) {
        await axios.delete(`/api/carts/${userId}`)
        dispatch(emptyCart(userId))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

//initial state
const initialState = []

//reducers
const orderReducer = (orders = initialState, action) => {
  switch (action.type) {
    case SUBMIT_ORDER:
      return [...orders, action.payload]
    default:
      return orders
  }
}

export default orderReducer
