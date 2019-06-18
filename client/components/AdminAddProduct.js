import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {addProductThunk} from '../store/admin'
import history from '../history'

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width: 200
  }
}

class disconnectedAdminAddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: 0,
      image: '',
      tags: '',
      stock: 0
    }
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOnSubmit = event => {
    event.preventDefault()
    this.props.addProduct(this.state)
    history.push('/adminpage/products')
  }

  render() {
    const {classes} = this.props

    return (
      <div className={classes.container}>
        <form onSubmit={this.handleOnSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={this.handleOnChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            onChange={this.handleOnChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="image"
            label="Image"
            name="image"
            autoComplete="image"
            onChange={this.handleOnChange}
          />
          <TextField
            id="outlined-number"
            label="Price"
            type="number"
            name="price"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
            onChange={this.handleOnChange}
          />
          <TextField
            id="outlined-number"
            label="Stock"
            type="number"
            name="stock"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
            onChange={this.handleOnChange}
          />
          <TextField
            id="outlined-number"
            label="Tags"
            name="tags"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
            onChange={this.handleOnChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Product
          </Button>
        </form>
      </div>
    )
  }
}

const mapDispatchTostate = dispatch => {
  return {
    addProduct: prod => dispatch(addProductThunk(prod))
  }
}

const AdminAddProduct = connect(null, mapDispatchTostate)(
  disconnectedAdminAddProduct
)

//Export Class Component with Material UI Styling
export default withStyles(styles)(AdminAddProduct)
