import React, { CSSProperties, forwardRef, ReactNode } from "react";
import classes from "./style/DropDown.module.css";

interface DropdownProps {
  children: ReactNode;
  style?: CSSProperties;
  after?: boolean;
  notPseudoElement?: boolean;
}
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, style, after, notPseudoElement }, ref) => {
    return (
      <div
        ref={ref}
        className={
          notPseudoElement
            ? classes.containerNotBefore
            : after
            ? classes.containerAfter
            : classes.container
        }
        style={style}
      >
        {children}
      </div>
    );
  }
);
