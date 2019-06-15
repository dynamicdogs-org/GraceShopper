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
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    flex: 1
  },
  navBarColor: {
    background: '#33eaff'
  }
}))

const Navbar = ({handleClick, isLoggedIn, userId}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static" cassName={classes.navBarColor}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dynamic Dogs
            <Button color="inherit">
              <Link color="inherit" component={RouterLink} to="/products">
                Products
              </Link>
            </Button>
          </Typography>

          {/* Link from Material UI links together to achieve same feature as (Link as RouterLink) from React Router */}
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Button color="inherit">
                <Link
                  color="inherit"
                  component={RouterLink}
                  to={`/cart/${userId}`}
                >
                  Cart
                </Link>
              </Button>
              <Button color="inherit">
                <Link color="inherit" component={RouterLink} to="/home">
                  My Account
                </Link>
              </Button>
              <Button color="inherit" onClick={handleClick}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button color="inherit">
                <Link color="inherit" component={RouterLink} to="/login">
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link color="inherit" component={RouterLink} to="/signup">
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
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
