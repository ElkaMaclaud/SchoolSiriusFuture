import React, { Fragment } from 'react'
import Auth from '../../Components/Auth/Auth'
import Sidebar from '../../Components/Sidebar/Sidebar'

const Login = () => {
  return (
   <Fragment>
    <Sidebar />
    <Auth/>
   </Fragment>
  )
}
export default Login