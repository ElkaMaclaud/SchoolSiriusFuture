import React, { CSSProperties, forwardRef, ReactNode, useEffect } from "react";
import classes from "./style/DropDown.module.css";

interface DropdownProps {
  children: ReactNode;
  style?: CSSProperties;
  after?: boolean;
  notPseudoElement?: boolean;
  onClickOutside?: () => void;
}
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, style, after, notPseudoElement, onClickOutside }, ref) => {

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref && 'current' in ref && ref.current && !ref.current.contains(event.target as Node)) {
          onClickOutside && onClickOutside();
        }
      };
    
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, onClickOutside]);
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
