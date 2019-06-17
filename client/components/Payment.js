import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class Payment extends Component {
  constructor() {
    super()
    this.state = {
      nameOnCard: '',
      cardNumber: '',
      expDate: '',
      cvv: '',
      nameOnCardValid: false,
      cardNumberValid: false,
      expDateValid: false,
      cvvValid: false,
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.isComplete = this.isComplete.bind(this)
    this.toggleSubmitted = this.toggleSubmitted.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const payment = {
      nameOnCard: this.state.nameOnCard,
      cardEndingIn: this.state.cardNumber.slice(-4),
      expDate: this.state.expDate
    }
    this.props.setPayment(payment)
  }

  isComplete() {
    const {nameOnCard, cardNumber, expDate, cvv} = this.state
    return nameOnCard && cardNumber && expDate && cvv
  }

  toggleSubmitted() {
    this.setState(prevState => {
      return {submitted: !prevState.submitted}
    })
  }

  validateField(fieldname, value) {
    let {nameOnCardValid, cardNumberValid, expDateValid, cvvValid} = this.state
    switch (fieldName) {
      case 'nameOnCard':
        nameOnCardValid = value.match(/^[a-zA-z\s]+$/)
        break
      case 'cardNumber':
        cardNumberValid = value.match(
          /^(?:4[0-9]{12}(?:[0-9]{3})? | (?:5[1-5][0-9]{2} | 222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12} | 3[47][0-9]{13} | 3(?:0[0-5]|[68][0-9])[0-9]{11} | 6(?:011|5[0-9]{2})[0-9]{12} | (?:2131|1800|35\d{3})\d{11})$/
        )
        break
      case 'expDateValid':
        expDateValid = value > new Date()
        break
      case 'cvv':
        cvvValid = value.match(/^[0-9]{3}/)
        break
      default:
        break
    }
  }

  render() {
    return this.state.submitted ? (
      <div onClick={this.toggleSubmitted}>
        <p>Name: {this.state.nameOnCard}</p>
        <p>
          Card number: {`**** **** **** ${this.state.cardNumber.slice(-4)}`}
        </p>
        <p>Expiration date: {this.state.expDate}</p>
        <p>cvv: *** </p>
      </div>
    ) : (
      <div>
        <form>
          <Grid container spacing={3} onChange={this.handleChange}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="nameOnCard"
                name="nameOnCard"
                value={this.state.nameOnCard}
                label="Name on card"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardNumber"
                name="cardNumber"
                label="Card number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="expDate"
                name="expDate"
                value={this.state.expDate}
                label="Expiration date"
                type="date"
                InputLabelProps={{shrink: true}}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cvv"
                name="cvv"
                label="CVV"
                type="password"
                helperText="Last three digits on signature strip"
                fullWidth
              />
            </Grid>
          </Grid>

          <Button
            disabled={!this.isComplete()}
            size="medium"
            color="primary"
            onClick={() => {
              this.toggleSubmitted()
              this.handleSubmit(event)
            }}
          >
            Review Order
          </Button>
        </form>
      </div>
    )
  }
}

export default Payment
