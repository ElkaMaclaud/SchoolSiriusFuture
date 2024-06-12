import React from "react";
import classes from "./style/Header.module.css";
import Group from "../../UI_Component/Icons/Group";
import MessageChat from "../../UI_Component/Icons/MessageChat";


const Header = () => {
  return <div className={classes.header}>
    <div  className={classes.headerTitle}>Добро пожаловать,&ensp;<p className={classes.headerUserName}>{"user.name"}</p>!</div>
    <div className={classes.headerAvatarWrapper}>
        <div className={classes.headerAvatar}><MessageChat /></div>
        <div className={classes.headerAvatarUser}><div  className={classes.headerAvatar}></div><Group /></div>
    </div>
  </div>;
};

export default Header;
