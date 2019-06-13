import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'

class disconnectedCart extends React.Component {
  componentDidMount = () => {
    this.props.getCart(this.props.userId)
  }

  render() {
    console.log(this.props)
    return <div>This is User's cart</div>
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
