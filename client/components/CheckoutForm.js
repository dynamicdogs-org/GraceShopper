import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitOrderThunk} from '../store/order'
import {getCartThunk} from '../store/cart'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class CheckoutForm extends Component {
  constructor() {
    super()
    this.state = {
      address: '',
      paymentType: ''
    }
  }

  componentDidMount() {
    this.props.getCart(this.props.userId)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = () => {}

  render() {
    return (
      <div>
        <h1>CheckoutForm</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            // id="outlined-multiline-static"
            label="Address"
            name="address"
            multiline
            rows="4"
            value={this.state.address}
            // className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
          />
          <FormControl variant="outlined">
            <InputLabel
              // ref={inputLabel}
              htmlFor="outlined-age-simple"
            >
              Payment type
            </InputLabel>
            <Select
              name="paymentType"
              value={this.state.paymentType}
              onChange={this.handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="credit card">Credit card</MenuItem>
              <MenuItem value="gift card">Gift card</MenuItem>
              <MenuItem value="paypal">Paypal</MenuItem>
            </Select>
          </FormControl>
          <Button
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
