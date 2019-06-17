import React from 'react'

const OauthLoginForm = props => {
  return (
    <form method="get" action="/auth/google">
      <button type="submit" className="btn oauth-google">
        Login with Google
      </button>
    </form>
  )
}

export default OauthLoginForm
