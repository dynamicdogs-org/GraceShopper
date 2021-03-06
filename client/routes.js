import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, AdminPage, NotAuthorized} from './components'
import {me} from './store'
import SingleProductDetail from './components/SingleProductDetail'
import AllProduct from './components/AllProducts'
import Cart from './components/Cart.js'
import CheckoutForm from './components/CheckoutForm'

/*
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, user} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products/:productId" component={SingleProductDetail} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path={`/cart/${user.id}`} component={Cart} />
            <Route exact path="/products" component={AllProduct} />
            <Route exact path="/cart/checkout" component={CheckoutForm} />
            {//Check if user is an admin, if admin, displays the admin page when requested
            //if not, then display the not authorized message
            user.isAdmin ? (
              <Route path="/adminpage" component={AdminPage} />
            ) : (
              <Route path="/adminpage" component={NotAuthorized} />
            )}
            <Route path="/notauthorized" component={NotAuthorized} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route path="/" component={AllProduct} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
