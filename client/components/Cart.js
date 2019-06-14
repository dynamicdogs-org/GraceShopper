import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCartThunk} from '../store/cart'

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
    getCart: userId => dispatch(getCartThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(disconnectedCart)
