import axios from 'axios'

//action type
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

//action creator
const gotOrderHistory = data => ({
  type: GET_ORDER_HISTORY,
  payload: data
})

//thunk
export const orderHistoryThunk = function(userId) {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/orders/${userId}`)
      dispatch(gotOrderHistory(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//init state
const initialState = []

//reducer
const orderHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return action.payload
    default:
      return state
  }
}

export default orderHistoryReducer
