import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const NotAuthorized = props => {
  const {email} = props.user

  return (
    <div>
      <h3>Hello {email}, you are not authrozied to perform this action</h3>
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

export default connect(mapState)(NotAuthorized)
