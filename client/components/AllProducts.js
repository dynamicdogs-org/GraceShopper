import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/product'
import {addItemToCartThunk} from '../store/cart'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  handleAddToCart = (userId, productId) => {
    this.props.addItem(userId, productId)
  }

  handleDeleteFrom = (userId, productId) => {}

  render() {
    const {product, userId} = this.props
    return product.length ? (
      <div>
        <h1>This is our All Products page!</h1>
        <ul>
          {product.map(prod => {
            return (
              <li key={prod.id}>
                <Link to={`/products/${prod.id}`}>{prod.name}</Link>
                {userId && (
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleAddToCart(userId, prod.id)}
                  >
                    Add to Cart
                  </Button>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    ) : (
      <div>No products at this time...</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
