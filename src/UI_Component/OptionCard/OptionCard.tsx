import React, { CSSProperties, FC, useState } from "react";
import classes from "./style/OptionCard.module.css";


export const OptionCard: FC<{
  value: string;
  list: Array<string>;
  style?: CSSProperties;
  handleClick?: (arg: string) => void;
}> = ({ value, list, style, handleClick }) => {
  const [hover, setHover] = useState(value);
  return (
    <div className={classes.wrapper} style={style}>
      {list.map((item) => {
        const key = item
        return (
          <div
            onMouseOver={() => setHover(item)}
            style={hover === item ? {backgroundColor: "#eeeeff"} : {}}
            key={key}
            onClick={handleClick ? () => handleClick(item) : () => null}
            className={
              value === item ? classes.optionActive : classes.option
            }
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
