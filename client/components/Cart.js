import react from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'

import {getCartThunk} from '../store/'

class disconnectedCart extends Component() {
  componentDidMount() {
    console.log('Cart props: ', this.props)
    //this.props.getCart(this.props.userId);
  }

  render() {
    console.log('This.props: ', this.props)
    return <div>This is User's cart</div>
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => dispatch(getCartThunk(userId))
  }
}

const Cart = connect(mapStateToProps)(mapDispatchToProps)(disconnectedCart)

export default Cart
