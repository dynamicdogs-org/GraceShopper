import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {submitOrderThunk} from '../store/order'
import {getCartThunk} from '../store/cart'
import Address from './Address'
import Payment from './Payment'
import OrderSummary from './OrderSummary'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

class CheckoutForm extends Component {
  constructor() {
    super()
    this.state = {
      address: '',
      payment: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setAddress = this.setAddress.bind(this)
    this.setPayment = this.setPayment.bind(this)
    this.isComplete = this.isComplete.bind(this)
  }

  componentDidMount() {
    this.props.getCart(this.props.userId)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  setAddress(address) {
    this.setState({address})
  }

  setPayment(payment) {
    this.setState({payment})
  }

  isComplete() {
    return this.state.address && this.state.payment
  }

  handleSubmit(event) {
    event.preventDefault()
    const cart = this.props.cart
    const orderTotal = cart.reduce((acc, cur) => {
      return acc + cur.cart.quantity * cur.price
    }, 0)
    const products = cart.map(product => ({
      product: product.name,
      unitPrice: product.displayPrice,
      quantity: product.cart.quantity
    }))
    const address = this.state.address
    const paymentDetails = this.state.payment
    this.props.submitOrder(
      {orderTotal, address, paymentDetails, products},
      this.props.userId
    )
    history.push('/home')
  }

  render() {
    const cart = this.props.cart
    const address = this.state.address
    const payment = this.state.payment
    return (
      <div>
        <h1>Checkout</h1>
        <h3>Shipping address</h3>
        {address ? (
          <pre>{address}</pre>
        ) : (
          <Address setAddress={this.setAddress} />
        )}

        {address ? (
          <div>
            <h3>Payment</h3>
            {payment ? (
              <pre>
                {`Name on card: ${payment.nameOnCard}
Card number ending in: ${payment.cardEndingIn}
Expiration date: ${payment.expDate}`}
              </pre>
            ) : (
              <Payment setPayment={this.setPayment} />
            )}
          </div>
        ) : null}
        {address && payment ? (
          <form onSubmit={this.handleSubmit}>
            <h2>Order summary:</h2>
            <OrderSummary />
            <Button
              disabled={!this.isComplete}
              type="submit"
              size="medium"
              color="primary"
            >
              Submit order
            </Button>
          </form>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  cart: state.cart,
  orders: state.order
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => dispatch(getCartThunk(userId)),
  submitOrder: (order, userId) => dispatch(submitOrderThunk(order, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)

//
