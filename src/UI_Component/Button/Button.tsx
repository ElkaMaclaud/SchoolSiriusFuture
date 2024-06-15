import React, { CSSProperties, FC, ReactNode } from "react";

const Button: FC<{
  children: ReactNode;
  style?: CSSProperties;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ children, style, checked, onChange }) => {
  return (
    <button style={style} onClick={() => onChange(!checked)}>
      {children}
    </button>
  );
};

export default Button;
