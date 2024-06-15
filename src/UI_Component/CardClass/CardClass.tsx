import React, { CSSProperties, FC, ReactNode } from 'react'
import classes from "./style/CardClass.module.css"

const CardClass:FC<{children: ReactNode, style?: CSSProperties}> = ({children, style}) => {
  return (
    <div className={classes.wrapperCard} style={style}>
      {children}
    </div>
  )
}

export default CardClass
