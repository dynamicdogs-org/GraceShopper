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
      formErrors: {nameOnCard: '', cardNumber: '', expDate: '', cvv: ''},
      nameOnCardValid: false,
      cardNumberValid: false,
      expDateValid: false,
      cvvValid: false,
      formValid: false,
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.isComplete = this.isComplete.bind(this)
    this.toggleSubmitted = this.toggleSubmitted.bind(this)
    this.validateField = this.validateField.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
    })
    this.validateField(name, value)
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

  validateField(fieldName, value) {
    let {
      formErrors,
      nameOnCardValid,
      cardNumberValid,
      expDateValid,
      cvvValid
    } = this.state
    switch (fieldName) {
      case 'nameOnCard':
        nameOnCardValid = value.match(/^[a-zA-z\s]+$/)
        formErrors.nameOnCard = nameOnCardValid
          ? ''
          : 'must contain only letters a-z and spaces'
        break
      case 'cardNumber':
        cardNumberValid = value.match(/^[0-9]{15,19}$$/)
        formErrors.cardNumber = cardNumberValid
          ? ''
          : 'Card number must be between 15 and 19 digits.'
        break
      case 'expDate':
        const today = new Date().toISOString().slice(0, 10)
        expDateValid = value >= today
        formErrors.expDate = expDateValid ? '' : 'Date cannot be in the past.'
        break
      case 'cvv':
        cvvValid = value.match(/^[0-9]{3}/)
        formErrors.cvv = cvvValid ? '' : 'Must be 3 digits.'
        break
      default:
        break
    }
    this.setState(
      {
        formErrors,
        nameOnCardValid,
        cardNumberValid,
        expDateValid,
        cvvValid
      },
      this.validateForm
    )
  }

  validateForm() {
    this.setState(prevState => {
      return {
        formValid:
          prevState.nameOnCardValid &&
          prevState.cardNumberValid &&
          prevState.expDateValid &&
          prevState.cvvValid
      }
    })
    console.log(this.state.formErrors)
  }

  render() {
    const errors = this.state.formErrors
    const nameOnCardError = errors.nameOnCard
    const cardNumberError = errors.cardNumber
    const expDateError = errors.expDate
    const cvvError = errors.cvv
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
                error={!!nameOnCardError}
                id="nameOnCard"
                name="nameOnCard"
                value={this.state.nameOnCard}
                label="Name on card"
                helperText={nameOnCardError ? nameOnCardError : null}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                error={!!cardNumberError}
                id="cardNumber"
                name="cardNumber"
                label="Card number"
                helperText={cardNumberError ? cardNumberError : null}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                error={!!expDateError}
                id="expDate"
                name="expDate"
                value={this.state.expDate}
                label="Expiration date"
                type="date"
                InputLabelProps={{shrink: true}}
                helperText={expDateError ? expDateError : null}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                error={!!cvvError}
                id="cvv"
                name="cvv"
                label="CVV"
                type="password"
                helperText={
                  cvvError ? cvvError : 'Last three digits on signature strip'
                }
                fullWidth
              />
            </Grid>
          </Grid>

          <Button
            disabled={!this.state.formValid}
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
