import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitOrderThunk} from '../store/order'
import {getCartThunk} from '../store/cart'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Address from './Address'

class CheckoutForm extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address1: '',
      city: '',
      state: '',
      zip: '',
      paymentType: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getCart(this.props.userId)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  isComplete = () => {
    const {
      firstName,
      lastName,
      address1,
      city,
      state,
      zip,
      paymentType
    } = this.state
  }

  handleSubmit = () => {}

  render() {
    const cart = this.props.cart
    const address = this.state.address
    const paymentType = this.state.paymentType
    return (
      <div>
        <h1>Checkout</h1>
        <h3>Shipping address</h3>
        <Address />
        <form onSubmit={this.handleSubmit}>
          {/* <TextField
            // id="outlined-multiline-static"
            required
            label="Shipping address"
            name="address"
            multiline
            rows="4"
            value={this.state.address}
            // className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
          /> */}

          <FormControl variant="outlined">
            <InputLabel
              // ref={inputLabel}
              htmlFor="outlined-age-simple"
            >
              Payment type
            </InputLabel>
            <Select
              required
              name="paymentType"
              value={this.state.paymentType}
              onChange={this.handleChange}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="credit card">Credit card</MenuItem>
              <MenuItem value="gift card">Gift card</MenuItem>
              <MenuItem value="paypal">Paypal</MenuItem>
            </Select>
          </FormControl>
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
            // disabled={isIncomplete}
            size="medium"
            color="primary"
            onClick={() => this.handleSubmithandleSubmit()}
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
  submitOrder: order => dispatch(submitOrderThunk(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)

//