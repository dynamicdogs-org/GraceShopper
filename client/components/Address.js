import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
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
      city: '',
      state: '',
      zip: '',
      paymentType: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.isComplete = this.isComplete.bind(this)
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

  handleSubmit = () => {
    return <Link to="/" />
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
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
                fullWidth
                autoComplete="billing address-line1"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
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
                fullWidth
                autoComplete="billing address-level2"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl required fullWidth>
                <InputLabel htmlFor="age-simple">State</InputLabel>
                <Select
                  value={this.state.state}
                  name="state"
                  onChange={this.handleChange}
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
                type=""
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="billing postal-code"
              />
            </Grid>
          </Grid>

          <Button
            disabled={this.isComplete()}
            size="medium"
            color="primary"
            onClick={() => this.handleSubmit()}
          >
            Payment information
          </Button>
        </form>
      </div>
    )
  }
}

export default Address

//
