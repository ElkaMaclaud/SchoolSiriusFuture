import React, { Fragment } from 'react'
import Auth from '../../Components/Auth/Auth'

const Login = () => {
  return (
   <Fragment>
    <Auth action={"AUTH_USER"} />
   </Fragment>
  )
}
export default Login