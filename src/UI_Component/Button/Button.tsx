import React, { CSSProperties, FC, ReactNode } from "react";

const Button: FC<{
  children: ReactNode;
  style?: CSSProperties;
  handleChange?: () => {};
}> = ({ children, style, handleChange }) => {
  return (
    <button style={style} onClick={handleChange}>
      {children}
    </button>
  );
};

export default Button;
