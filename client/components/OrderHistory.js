import React, {Component} from 'react'
import {connect} from 'react-redux'
import {orderHistoryThunk} from '../store/orderHistory'
import {Link} from 'react-router-dom'

class OrderHistory extends Component {
  componentDidMount = () => {
    this.props.getOrderHistoryThunk(this.props.userId)
  }

  render() {
    console.log('this.propsorderHistory', this.props)
    return (
      <div>
        <h1>User Order History</h1>
        <h5>User ID: {this.props.userId}</h5>
        <ul>
          {this.props.orderHistory.map((singleOrder, index) => {
            console.log('singleOrder', singleOrder)
            // return (
            // <h3 key={index}>Order Date: {singleOrder.date}</h3>
            // <ul key={index}>
            //   <li>{singleOrder.products.map((singleProduct, prodIdx) => {
            //     return (
            //       <p key={prodIdx}>{singleProduct.product}</p>
            //       )
            //   })}</li>
            // </ul>
            // )
          })}
        </ul>
      </div>
    )
  }
}

//mSTP
const mapStateToProps = state => ({
  userId: state.user.id,
  orderHistory: state.orderHistory
})

//mDTP
const mapDispatchToProps = dispatch => {
  return {
    getOrderHistoryThunk: userId => dispatch(orderHistoryThunk(userId))
  }
}

//connect
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
