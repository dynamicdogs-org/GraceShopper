import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_ALL_ADMIN_PRODUCTS = 'GET_ALL_ADMIN_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_USERS_PRODUCTS = 'REMOVE_USERS_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {
  users: [],
  products: []
}

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const getAllAdminProducts = products => ({
  type: GET_ALL_ADMIN_PRODUCTS,
  products
})
//Export action creator to user/logout to be called when logging out and removing any info that the admin state might contain
export const removeUsersProducts = () => ({type: REMOVE_USERS_PRODUCTS})
const deleteProduct = prodId => ({
  type: DELETE_PRODUCT,
  prodId
})
const addProduct = prod => ({
  type: ADD_PRODUCT,
  prod
})

/**
 * THUNK CREATORS
 */
export const getAllUsersThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(getAllUsers(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllAdminProductsThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getAllAdminProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteProductThunk = prodId => async dispatch => {
  try {
    const res = await axios.delete(`/api/products/${prodId}`)
    dispatch(deleteProduct(prodId))
  } catch (err) {
    console.error(err)
  }
}

export const addProductThunk = prod => async dispatch => {
  try {
    const {data} = await axios.post('/api/products', prod)
    dispatch(addProduct(data))
  } catch (error) {
    console.log('TCL: error', error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, users: [...action.users]}
    case GET_ALL_ADMIN_PRODUCTS:
      return {...state, products: [...action.products]}
    case REMOVE_USERS_PRODUCTS:
      return initialState
    case ADD_PRODUCT:
      return {...state, products: [...state.products, action.prod]}
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(prod => prod.id !== action.prodId)
      }
    default:
      return state
  }
}
