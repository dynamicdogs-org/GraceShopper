import React, {Component} from 'react'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import OrderProduct from './OrderProduct'
import {getUserOrdersThunk} from '../store/order'
import {connect} from 'react-redux'

class OrderSummary extends Component {
  componentDidMount = () => {
    this.props.getUserOrders(this.props.userId)
  }

  render() {
    console.log(this.props.orders)
    const orders = this.props.orders
    return (
      <div>
        {orders ? (
          <div>
            {orders.map((order, idx) => (
              <OrderProduct key={idx} products={order.products} />
            ))}
            <ListItem>
              <Typography variant="body1">
                Total: ${this.props.orders.reduce((acc, cur) => {
                  return acc + cur.quantity * cur.price
                }, 0) / 100}
              </Typography>
            </ListItem>
          </div>
        ) : (
          <h1>Order is undefined</h1>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.order,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getUserOrders: userId => dispatch(getUserOrdersThunk(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary)
