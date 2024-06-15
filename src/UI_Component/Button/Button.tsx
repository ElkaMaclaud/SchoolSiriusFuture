import React, { CSSProperties, FC, ReactNode } from "react";
import classes from "./style/Button.module.css"

const Button: FC<{
  children: ReactNode;
  style?: CSSProperties;
  handleChange?: () => {};
}> = ({ children, style, handleChange }) => {
  return (
    <button style={style} onClick={handleChange} className={classes.button}>
      {children}
    </button>
  );
};

export default Button;
