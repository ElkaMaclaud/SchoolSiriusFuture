import React, { CSSProperties, useRef } from "react";
import classes from "./style/Header.module.css";
import Group from "../../UI_Component/Icons/Group";
import MessageChat from "../../UI_Component/Icons/MessageChat";
import { Dropdown } from "../DropDown/DropDown";
import { useToggle } from "../../hooks/useToggle";
import Avatar from "../Avatar/Avatar";
import ProfileContent from "../ProfileContent/ProfileContent";
import { useAppSelector } from "../../store/reduxHooks";


const Header = () => {
  const { user, meetTheUser } = useAppSelector((state) => state.page);
  const [showDropDown, setShowDropDown] = useToggle(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const setStyle = (width = 250): CSSProperties => {
    const left = parentRef.current
      ? parentRef.current?.offsetLeft + parentRef.current?.clientWidth
      : null;
    const top = parentRef.current?.offsetTop;
    return {
      width: `${width}px`,
      left: `${(left || 100) - width / 2 - 150}px`,
      top: `${top ? top - 45 : 70}px`,
      border: "1px solid #7362BC",
      padding: "10px",
      height: "262px"
    };
  };
  return (
    <div className={classes.header} ref={parentRef} >
      {meetTheUser && <div className={classes.headerTitle}>
        Добро пожаловать,&ensp;
        <p className={classes.headerUserName}>{user.email.split("@")[0] || "Дорогой друг"}</p>!
      </div>}
      <div className={meetTheUser ? classes.headerAvatarWrapper : classes.headerAvatarWrapperNoTitle}>
        <Avatar><MessageChat /><span className={classes.roundUnreadMessages}>2</span></Avatar>
         <div className={classes.headerAvatarUser}>
          <Avatar name={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs2zuKiljDl2LdFG9q4Uh_EbD0pfwbtEWH7w&s"}/>
          <div onClick={setShowDropDown}>
            <Group />
          </div>
        </div>
      </div>
      {showDropDown && (
          <Dropdown ref={ref} style={setStyle()}>
            <ProfileContent handleClick={setShowDropDown}/>
          </Dropdown>
        )}
    </div>
  );
};

export default Header;
