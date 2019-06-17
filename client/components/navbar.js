import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link'
import {logout} from '../store'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: '#33eaff'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    flex: 1
  },
  navBarColor: {}
}))

const Navbar = ({handleClick, isLoggedIn, userId, isAdmin}) => {
  const classes = useStyles()
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Dynamic Dogs
          <Link color="inherit" component={RouterLink} to="/products">
            <Button color="inherit">View Products</Button>
          </Link>
        </Typography>

        {/* Link from Material UI links together to achieve same feature as (Link as RouterLink) from React Router */}
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link color="inherit" component={RouterLink} to={`/cart/${userId}`}>
              <Button color="inherit">Cart</Button>
            </Link>

            <Link color="inherit" component={RouterLink} to="/home">
              <Button color="inherit">My Account</Button>
            </Link>

            {/* Displays Admin Page only when user is an admin */}
            {isAdmin && (
              <Link color="inherit" component={RouterLink} to="/adminpage">
                <Button color="inherit">Admin Page</Button>
              </Link>
            )}

            <Button color="inherit" onClick={handleClick}>
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Link color="inherit" component={RouterLink} to="/login">
              <Button color="inherit">Login</Button>
            </Link>

            <Link color="inherit" component={RouterLink} to="/signup">
              <Button color="inherit">Sign Up</Button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
