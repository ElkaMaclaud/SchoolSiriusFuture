import React, { CSSProperties, FC, ReactNode } from "react";
import classes from "./style/Avatar.module.css";

const Avatar: FC<{ children?: ReactNode; name?: string }> = ({
  children,
  name,
}) => {
  const style: CSSProperties = name
    ? {
        background: `url('${name}') center center`,
        backgroundSize: "cover",
      } : {};
  return <div style={style} className={classes.avatar}>{children}</div>;
};

export default Avatar;
