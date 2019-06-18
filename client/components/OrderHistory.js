import React, {Component} from 'react'
import {connect} from 'react-redux'
import orderHistoryThunk from '../store/orderHistory'

class OrderHistory extends Component {
  componentDidMount = () => {
    this.props.getOrderHistoryThunk(this.props.userId)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>User Order History</h1>
      </div>
    )
  }
}

//mSTP
const mapStateToProps = state => ({
  userId: state.user.id,
  orderHistory: state
})

//mDTP
const mapDispatchToProps = dispatch => {
  return {
    getOrderHistoryThunk: userId => dispatch(orderHistoryThunk(userId))
  }
}

//connect
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
