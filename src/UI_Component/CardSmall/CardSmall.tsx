import React, { CSSProperties, FC, ReactNode } from "react";
import classes from "./style/CardSmall.module.css";

const CardSmall:FC<{children: ReactNode, style?: CSSProperties}> = ({children, style}) => {
  return <div className={classes.wrapperCard} style={style}>{children}</div>;
};

export default CardSmall;
