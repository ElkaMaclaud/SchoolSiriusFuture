import React, { CSSProperties, useRef } from "react";
import classes from "./style/Header.module.css";
import Group from "../../UI_Component/Icons/Group";
import MessageChat from "../../UI_Component/Icons/MessageChat";
import { Dropdown } from "../DropDown/DropDown";
import { useToggle } from "../../hooks/useToggle";


const Header = () => {
  const [showDropDown, setShowDropDown] = useToggle(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const setStyle = (width = 250): CSSProperties => {
    const left = parentRef.current
      ? parentRef.current?.offsetLeft + parentRef.current?.clientWidth
      : null;
    return {
      width: `${width}px`,
      left: `${(left || 100) - width / 2 - 150}px`,
      top: "120px"
    };
  };
  return (
    <div className={classes.header} ref={parentRef} >
      <div className={classes.headerTitle}>
        Добро пожаловать,&ensp;
        <p className={classes.headerUserName}>{"user.name"}</p>!
      </div>
      <div className={classes.headerAvatarWrapper}>
        <div className={classes.headerAvatar}>
          <MessageChat />
        </div>
        <div className={classes.headerAvatarUser}>
          <div className={classes.headerAvatar}></div>
          <div onClick={setShowDropDown}>
            <Group />
          </div>
        </div>
      </div>
      {showDropDown && (
          <Dropdown ref={ref} style={setStyle()}>
            <></>
          </Dropdown>
        )}
    </div>
  );
};

export default Header;
