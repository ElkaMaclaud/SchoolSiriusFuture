import React, { useEffect } from "react";
import classes from "./style/Sidebar.module.css";
import SiriusLabel from "../../UI_Component/Icons/SiriusLabel";
import GiftIllustration from "../../UI_Component/Icons/GiftIllustration";
import LogoText from "../../UI_Component/Icons/LogoText";
import ChapterList from "../CapterList/ChapterList";


const Sidebar = () => {
  useEffect(() => {
    // Запрос
  });
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarLogo}>
        <SiriusLabel />
        <LogoText />
      </div>
      <ChapterList />
      <div className={classes.sidebarFooter}>
        <p className={classes.sidebarFooterHeader}>Учитесь бесплатно</p>
        <p className={classes.sidebarFooterDescription}>
          Приводите друзей с детьми заниматься в Sirius Future и получайте
          подарки!
        </p>
        <button>Узнать</button>
        <div className={classes.sidebarFooterGiftBox}>
          <GiftIllustration />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
