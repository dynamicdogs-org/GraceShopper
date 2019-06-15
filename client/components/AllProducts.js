import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/product'
import {addItemToCartThunk} from '../store/cart'
import SingleProduct from './SingleProduct'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/styles'

const styles = {
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    flex: 1
  }
}

class disconnectedAllProducts extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  handleAddToCart = (userId, productId) => {
    this.props.addItem(userId, productId)
  }

  render() {
    const {product, userId} = this.props
    const {classes} = this.props

    return product.length ? (
      <Container>
        <Typography
          variant="h6"
          color="primary"
          align="center"
          className={classes.title}
        >
          Welcome To Our Products Page!
        </Typography>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {product.map(prod => {
              return (
                <Grid item xs={4} key={prod.id}>
                  <SingleProduct
                    product={prod}
                    userId={userId}
                    handleAddToCart={this.handleAddToCart}
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
    product: state.product,
    userId: state.user.id
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk()),
    addItem: (userId, productId) =>
      dispatch(addItemToCartThunk(userId, productId))
  }
}

//Connect AllProducts to the Redux Store
const AllProducts = connect(mapStateToProps, mapDispatchToProps)(
  disconnectedAllProducts
)

//Export Class Component with Material UI Styling
export default withStyles(styles)(AllProducts)
