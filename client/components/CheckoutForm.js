import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {submitOrderThunk} from '../store/order'
import {getCartThunk} from '../store/cart'
import Address from './Address'
import Payment from './Payment'
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
    return (
      <div>
        <h1>Checkout</h1>
        <h3>Shipping address</h3>
        <Address setAddress={this.setAddress} />
        <h3>Payment</h3>
        <Payment setPayment={this.setPayment} />
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
          <Button
            disabled={!this.isComplete}
            type="submit"
            size="medium"
            color="primary"
          >
            Submit order
          </Button>
        </form>
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
