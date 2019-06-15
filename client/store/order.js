import axios from 'axios'

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
export const submitOrderThunk = function(order) {
  return async function(dispatch) {
    try {
      const {data} = await axios.post('/api/orders', order)
      dispatch(submitOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//initial state
const initialState = []

//reducers
export const orderReducer = (orders = initialState, action) => {
  switch (action.type) {
    case SUBMIT_ORDER:
      return [...orders, action.payload]
    default:
      return orders
  }
}

//
