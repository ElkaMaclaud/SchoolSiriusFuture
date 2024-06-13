import React, { CSSProperties, FC, ReactNode } from 'react'

const Button:FC<{children: ReactNode, style?: CSSProperties}> = ({children, style}) => {
  return (
    <button style={style}>
        {children}
    </button>
  )
}

export default Button
