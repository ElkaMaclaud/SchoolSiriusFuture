import React, { CSSProperties, useRef } from "react";
import classes from "./style/Header.module.css";
import Group from "../../UI_Component/Icons/Group";
import MessageChat from "../../UI_Component/Icons/MessageChat";
import { Dropdown } from "../DropDown/DropDown";
import { useToggle } from "../../hooks/useToggle";
import Avatar from "../Avatar/Avatar";
import ProfileContent from "../ProfileContent/ProfileContent";


const Header = () => {
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
      top: `${top ? top + 65 : 145}px`,
      border: "1px solid #7362BC",
      padding: "10px",
      height: "262px"
    };
  };
  return (
    <div className={classes.header} ref={parentRef} >
      <div className={classes.headerTitle}>
        Добро пожаловать,&ensp;
        <p className={classes.headerUserName}>{"user.name"}</p>!
      </div>
      <div className={classes.headerAvatarWrapper}>
        <Avatar > <MessageChat /></Avatar>
         <div className={classes.headerAvatarUser}>
          <Avatar name={"https://s3-alpha-sig.figma.com/img/dae3/59ff/8f6d0de811237737f4dd4647e4b450b5?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cYD5~UVyi0e5FV6UufOzKn-kYLLkBtdbeNVh8Sc5D7hexbteNXIDyMA3L7QQ791nLZ~~MEdKDi16wngFy2UFv9AXHxGBInvlziicEY4n8U9pz~vSTdifZPI7eFWmINMRvMaIv69pbbIVwlksZ6jDGpx24XjEIit9WqE-ni6WDUUvw798cEJMbN8rZv9f6ghzfOpivOBDYZnCAyg3Fl9r8PRFckK4nCUuFvPZkxXKMybOqq7ojoOJ1iMITpNuGJxHHR9ODy8jXBtobCQQeHO2xUA7XwTiVQjpDKNtESAsYvWdo5RUviy1YIuUSqGqcjz~lvUKSTNfz8-lkSbYw5iqeQ__"}/>
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
