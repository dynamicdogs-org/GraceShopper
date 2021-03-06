import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link as RouterLink} from 'react-router-dom'
import {submitOrderThunk} from '../store/order'
import {getCartThunk} from '../store/cart'
import Address from './Address'
import Payment from './Payment'

import Link from '@material-ui/core/Link'
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
    this.setState({submitted: true})
  }

  render() {
    const cart = this.props.cart
    const address = this.state.address
    const payment = this.state.payment
    const submitted = this.state.submitted
    return (
      <div>
        {submitted ? (
          <div>
            <h1>Order submitted</h1>
            <p>
              Thank you for your order! Your order is being processed and you
              will receive an email confirmation shortly.
            </p>
          </div>
        ) : (
          <h1>Checkout</h1>
        )}
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
            <List disablePadding>
              {cart.map((product, idx) => {
                const quantity = product.cart.quantity
                return (
                  <ListItem key={idx}>
                    <ListItemText primary={product.name} />
                    <ListItemText
                      secondary={`unit price: ${product.displayPrice}`}
                    />
                    <ListItemText secondary={`quantity: ${quantity}`} />
                    <Typography variant="body2">
                      {`$${product.price * quantity / 100}`}
                    </Typography>
                  </ListItem>
                )
              })}
              <ListItem>
                <Typography variant="body1">
                  Total: ${cart.reduce((acc, cur) => {
                    return acc + cur.cart.quantity * cur.price
                  }, 0) / 100}
                </Typography>
              </ListItem>
            </List>
            {submitted ? (
              <Link color="inherit" component={RouterLink} to="/home">
                <Button variant="contained" color="default">
                  Return to home page
                </Button>
              </Link>
            ) : (
              <Button
                disabled={!this.isComplete}
                type="submit"
                size="medium"
                color="secondary"
                variant="contained"
              >
                Submit order
              </Button>
            )}
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
