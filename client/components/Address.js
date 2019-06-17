import React, {Component} from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const states = [
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
]

class Address extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
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
    const {firstName, lastName, address1, city, state, zip} = this.state
    return firstName && lastName && address1 && city && state && zip
  }

  toggleSubmitted() {
    this.setState(prevState => {
      return {submitted: !prevState.submitted}
    })
  }

  render() {
    return this.state.submitted ? (
      <div onClick={this.toggleSubmitted}>
        <p>
          {this.state.firstName} {this.state.lastName}
        </p>
        <p>{this.state.address1}</p>
        <p>{this.state.address2}</p>
        <p>
          {this.state.city}, {this.state.state} {this.state.zip}
        </p>
      </div>
    ) : (
      <div>
        <form>
          <Grid container spacing={3} onChange={this.handleChange}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                value={this.state.firstName}
                fullWidth
                autoComplete="fname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                value={this.state.lastName}
                fullWidth
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                value={this.state.address1}
                fullWidth
                autoComplete="billing address-line1"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                value={this.state.address2}
                fullWidth
                autoComplete="billing address-line2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                value={this.state.city}
                fullWidth
                autoComplete="billing address-level2"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl required fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  value={this.state.state}
                  name="state"
                  onChange={this.handleChange}
                  autoComplete="billing address"
                >
                  {states.map((state, idx) => (
                    <MenuItem key={idx} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                value={this.state.zip}
                fullWidth
                autoComplete="billing postal-code"
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
            Payment information
          </Button>
        </form>
      </div>
    )
  }
}

//mapDispatch in order to add the address to the cart??

export default Address
