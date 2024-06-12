import React, { cloneElement, useEffect, useState } from "react";
import classes from "./style/Sidebar.module.css";
import SiriusLabel from "../../UI_Component/SiriusLabel";
import GiftIllustration from "../../UI_Component/GiftIllustration";
import LogoText from "../../UI_Component/LogoText";
import Home from "../../UI_Component/Home";
import Calendar from "../../UI_Component/Calendar";
import Path from "../../UI_Component/Path";
import Achievements from "../../UI_Component/Achievements";
import Library from "../../UI_Component/Library";
import Puzzle from "../../UI_Component/Puzzle";
import Headset from "../../UI_Component/Headset";
import Settings from "../../UI_Component/Settings";
import Questions from "../../UI_Component/Questions";

const chapterList = [
  { component: <Home isActive={false} />, name: "Главная" },
  { component: <Calendar isActive={false} />, name: "Расписание" },
  { component: <Path isActive={false} />, name: "Оплата" },
  { component: <Achievements isActive={false} />, name: "Достижения" },
  { component: <Puzzle isActive={false} />, name: "Тренажеры" },
  { component: <Library isActive={false} />, name: "Библиотека" },
  { component: <Headset isActive={false} />, name: "Проверка связи" },
  { component: <Settings isActive={false} />, name: "Настройки" },
  { component: <Questions isActive={false} />, name: "Воопросы" },
];
const Sidebar = () => {
  const [chapter, setChapter] = useState(chapterList[0].name);
  useEffect(() => {
    // Запрос
  });
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarLogo}>
        <SiriusLabel />
        <LogoText />
      </div>
      <div className={classes.sidebarChapterList}>
        {chapterList.map((item) => {
          return (
            <div
              className={
                chapter === item.name
                  ? classes.sidebarChapterActive
                  : classes.sidebarChapter
              }
            >
              {cloneElement(item.component, {
                isActive: chapter === item.name,
              })}
              <p onClick={() => setChapter(item.name)}>{item.name}</p>
            </div>
          );
        })}
      </div>
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
