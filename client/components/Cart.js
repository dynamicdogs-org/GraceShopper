import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCartThunk} from '../store/cart'
import Button from '@material-ui/core/Button'
import {deleteItemFromCartThunk} from '../store/cart'

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
                <Link to={`/products/${prod.id}`}>{prod.name}</Link>
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
