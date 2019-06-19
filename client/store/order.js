import axios from 'axios'

//action type
const SUBMIT_ORDER = 'SUBMIT_ORDER'
const GET_USER_ORDER = 'GET_USER_ORDER'

//action creators
const submitOrder = orderData => {
  return {
    type: SUBMIT_ORDER,
    payload: orderData
  }
}

const getUserOrders = order => {
  return {
    type: GET_USER_ORDER,
    payload: order
  }
}

//thunks
export const submitOrderThunk = function(order, userId) {
  return async function(dispatch) {
    try {
      const {data} = await axios.post(`/api/orders/user/${userId}`, order)
      dispatch(submitOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getUserOrdersThunk = function(userId) {
  console.log('getuserorderTHUnk')
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/orders/user/${userId}`)
      dispatch(getUserOrders(data))
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
    case GET_USER_ORDER:
      return [...orders, ...action.payload]
    default:
      return orders
  }
}

export default orderReducer
