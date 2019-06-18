import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const AdminPage = props => {
  const {email} = props.user

  return (
    <div>
      <h3>Welcome, {email} to Your Admin Page</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(AdminPage)
