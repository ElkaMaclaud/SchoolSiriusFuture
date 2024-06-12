import React, { CSSProperties } from 'react'
import CardClass from '../../UI_Component/CardClass/CardClass'
const style: CSSProperties = {width: "356px", height: "318px"}
const Profile = () => {
  return (
    <div>
      <CardClass styles={style}>Profile</CardClass>
    </div>
  )
}

export default Profile
