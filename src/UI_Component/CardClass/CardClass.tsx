import React, { CSSProperties, FC, ReactNode } from 'react'
import classes from "./style/CardClass.module.css"

const CardClass:FC<{children: ReactNode, styles?: CSSProperties}> = ({children, styles}) => {
  return (
    <div className={classes.wrapperCard} style={styles}>
      {children}
    </div>
  )
}

export default CardClass
