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
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.isComplete = this.isComplete.bind(this)
    this.toggleSubmitted = this.toggleSubmitted.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
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

  render() {
    return this.state.submitted ? (
      <div onClick={this.toggleSubmitted}>
        <p>Name: {this.state.nameOnCard}</p>
        <p>
          Card number: {`**** **** **** ${this.state.cardNumber.slice(12)}`}
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
            }}
          >
            Review Order
          </Button>
        </form>
      </div>
    )
  }
}

//Add payment info to cart?

export default Payment
