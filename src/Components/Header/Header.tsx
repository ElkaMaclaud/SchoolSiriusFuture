import React, { useState } from "react";
import classes from "./style/Header.module.css";
import Group from "../../UI_Component/Icons/Group";
import MessageChat from "../../UI_Component/Icons/MessageChat";
import { Modal } from "../Modal/Modal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={classes.header}>
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
          <div
            onClick={() => {
              console.log("hug");
              setShowModal(true);
            }}
          >
            <Group />
          </div>
        </div>
      </div>
      {showModal && <Modal>GHJGJHGHJ</Modal>}
    </div>
  );
};

export default Header;
