import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllAdminProductsThunk, deleteProductThunk} from '../store/admin'
import SingleProduct from './SingleProduct'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/styles'
import {Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'

const styles = {
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    flex: 1
  }
}

class disconnectedAdminProducts extends Component {
  componentDidMount() {
    this.props.getAllAdminProducts()
  }

  handleDeleteProduct = prodId => {
    this.props.deleteProduct(prodId)
  }

  render() {
    const {products, classes} = this.props
    return products.length ? (
      <Container>
        <Typography
          variant="h6"
          color="primary"
          align="center"
          className={classes.title}
        >
          Welcome To Admin Products Page
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          align="center"
          className={classes.title}
        >
          <Link
            color="inherit"
            component={RouterLink}
            to="/adminpage/products/addproduct"
          >
            <Button size="small" color="primary">
              Add Product
            </Button>
          </Link>
        </Typography>

        <div className={classes.root}>
          <Grid container spacing={3}>
            {products.map(prod => {
              return (
                <Grid item md={4} key={prod.id}>
                  <SingleProduct
                    product={prod}
                    admin="true"
                    handleDeleteProduct={this.handleDeleteProduct}
                  />
                </Grid>
              )
            })}
          </Grid>
        </div>
      </Container>
    ) : (
      <Container>No products at this time...</Container>
    )
  }
}

//Container

const mapStateToProps = function(state) {
  return {
    products: state.admin.products
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getAllAdminProducts: () => dispatch(getAllAdminProductsThunk()),
    deleteProduct: prodId => dispatch(deleteProductThunk(prodId))
  }
}

//Connect AllProducts to the Redux Store
const AdminProducts = connect(mapStateToProps, mapDispatchToProps)(
  disconnectedAdminProducts
)

//Export Class Component with Material UI Styling
export default withStyles(styles)(AdminProducts)
