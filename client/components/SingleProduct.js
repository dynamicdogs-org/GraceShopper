import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProductThunk} from '../store/product'

class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
  }

  render() {
    const product = this.props.products
    return (
      <div>
        <h1>Single product page</h1>
        <h3>{product.name}</h3>
        <img src={product.image} />
        <h4>{product.displayPrice}</h4>
        <h5>{product.stockMessage}</h5>
        <p>{product.description}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.product,
  users: state.user
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: productId => dispatch(getSingleProductThunk(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
