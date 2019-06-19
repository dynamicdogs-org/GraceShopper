import React from 'react'
import {connect} from 'react-redux'
import {Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {getCartThunk, deleteItemFromCartThunk} from '../store/cart'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import {Container} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

class disconnectedCart extends React.Component {
  componentDidMount = () => {
    this.props.getCart(this.props.userId)
  }

  render() {
    const {cart, userId} = this.props
    return cart.length ? (
      <Container>
        <List>
          <Typography variant="h5" align="center">
            Your Cart is Empty!
          </Typography>
          <Grid container spacing={2}>
            {cart.map((prod, index) => {
              return (
                <Grid item md={6} key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={prod.name} src={prod.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Link
                          color="inherit"
                          component={RouterLink}
                          to={`/products/${prod.id}`}
                        >
                          {prod.name}
                        </Link>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {prod.cart.quantity}({prod.displayPrice}) Each
                          </Typography>
                          {` — ${prod.description}`}
                          <IconButton
                            edge="end"
                            aria-label="Delete"
                            onClick={() => {
                              this.props.deleteItemFromCart(userId, prod.id)
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Grid>
              )
            })}
          </Grid>
        </List>
        <Link color="inherit" component={RouterLink} to="/cart/checkout">
          <Button variant="contained" color="secondary">
            Checkout
          </Button>
        </Link>
      </Container>
    ) : (
      <Typography variant="h1" align="center">
        Your Cart is Empty!
      </Typography>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => dispatch(getCartThunk(userId)),
    deleteItemFromCart: (userId, productId) =>
      dispatch(deleteItemFromCartThunk(userId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(disconnectedCart)
