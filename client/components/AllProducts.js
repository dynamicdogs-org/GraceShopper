import React, {Component} from 'react'
import axios from 'axios'
import redux, {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/product'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return this.props.state.product.length > 0 ? (
      <div>
        <h1>This is our All Products page!</h1>
        <ul>
          {this.props.state.product.map(element => {
            return (
              <li key={element.id}>
                <Link to={`/products/${element.id}`}>{element.name}</Link>
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
  console.log('mapstate', state)
  return {
    state: state
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
