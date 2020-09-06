import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/layout'

export default ({ netlifyLogin, netlifyAdminStatus }) => {
  if (netlifyAdminStatus?.isLoggedIn) {
    navigate('/admin')
    return null
  }
  return (
    <Layout title="Login">
      <button className="text-lg" onClick={netlifyLogin}>
        Click to Log In
      </button>
    </Layout>
  )
}
