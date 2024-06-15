import React from "react";
import classes from "./style/Sidebar.module.css";
import SiriusLabel from "../../UI_Component/Icons/SiriusLabel";
import GiftIllustration from "../../UI_Component/Icons/GiftIllustration";
import LogoText from "../../UI_Component/Icons/LogoText";
import ChapterList from "../CapterList/ChapterList";


const Sidebar = () => {
  // useEffect(() => {
  //   Запрос для получения разделов
  //   Но пока на бэке этого нет, просто из моковых данных на клиенте берем данные
  // });
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarLogo}>
        <SiriusLabel />
        <LogoText />
      </div>
      <ChapterList />
      <div className={classes.sidebarFooter}>
        <div className={classes.sidebarFooterHeader}>Учитесь бесплатно</div>
        <div className={classes.sidebarFooterDescription}>
          Приводите друзей с детьми заниматься в Sirius Future и получайте
          подарки!
        </div>
        <button>Узнать</button>
        <div className={classes.sidebarFooterGiftBox}>
          <GiftIllustration />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
