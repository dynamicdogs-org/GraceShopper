import React from 'react'
import {connect} from 'react-redux'
import {Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import {getCartThunk, deleteItemFromCartThunk} from '../store/cart'

class disconnectedCart extends React.Component {
  componentDidMount = () => {
    this.props.getCart(this.props.userId)
  }

  render() {
    const {cart, userId} = this.props
    return cart.length ? (
      <div>
        <h1>This is Your Cart!</h1>
        <ul>
          {cart.map((prod, index) => {
            return (
              <li key={index}>
                <Link component={RouterLink} to={`/products/${prod.id}`}>
                  {prod.name}
                </Link>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  //issue a thunk that'll delete stuff from db
                  onClick={() => {
                    this.props.deleteItemFromCart(userId, prod.id)
                  }}
                >
                  Delete
                </Button>
              </li>
            )
          })}
        </ul>
        <Link color="inherit" component={RouterLink} to="/cart/checkout">
          <Button variant="contained" color="secondary">
            Checkout
          </Button>
        </Link>
      </div>
    ) : (
      <div>No products at this time...</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => dispatch(getCartThunk(userId)),
    deleteItemFromCart: (userId, productId) =>
      dispatch(deleteItemFromCartThunk(userId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(disconnectedCart)
