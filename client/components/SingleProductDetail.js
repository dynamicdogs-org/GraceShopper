import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/product'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import {GridList} from '@material-ui/core'

class SingleProductDetail extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
  }

  render() {
    const product = this.props.products
    return (
      <div>
        {/* <h1>Single product page</h1> */}
        <Container>
          <GridList container direction="row">
            <Grid item sm>
              <img src={product.image} className="full-img" />
            </Grid>
            <Grid item sm>
              <Box>
                <h3>{product.name}</h3>
                <h4>{product.displayPrice}</h4>
                <h5>{product.stockMessage}</h5>
                <p>{product.description}</p>
              </Box>
            </Grid>
          </GridList>
        </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductDetail)
