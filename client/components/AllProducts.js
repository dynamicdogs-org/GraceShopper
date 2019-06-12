import React, {Component} from 'react'
import axios from 'axios'
import redux from 'react-redux'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/product'
//import {fakeThunk} from '../store/product'

class DisconnectedAllProducts extends Component {
  componentDidMount() {
    //console.log("fake Thunk : ", fakeThunk);
    console.log('this.props.products: ', this.props)

    console.log(this.props.getAllProducts)
    // this.props.
    //this.props.fakeThunk();
  }

  render() {
    return <h1>This is our All Products page!</h1>
  }
}

//Container

const mapStateToProps = function(state) {
  return {
    products: state.products
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    //fakeThunk: () => dispatch(fakeThunk()),
    getAllProducts: () => dispatch(getAllProductsThunk())
  }
}
const AllProducts = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAllProducts
)
export default AllProducts

// module.exports = {
//   AllProducts
// }
