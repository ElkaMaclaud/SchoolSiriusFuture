// В идеале эти разделы должны приходить из бэка, но здесь я просто создаю моковые данные
import React, { cloneElement, useState } from "react";
import classes from "./style/ChapterList.module.css";
import Home from "../../UI_Component/Icons/Home";
import Calendar from "../../UI_Component/Icons/Calendar";
import Path from "../../UI_Component/Icons/Path";
import Achievements from "../../UI_Component/Icons/Achievements";
import Library from "../../UI_Component/Icons/Library";
import Puzzle from "../../UI_Component/Icons/Puzzle";
import Headset from "../../UI_Component/Icons/Headset";
import Settings from "../../UI_Component/Icons/Settings";
import Questions from "../../UI_Component/Icons/Questions";
import { IChapterList } from "../../Type/ChapterListType";

const chapterList: IChapterList[] = [
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

const ChapterList = () => {
  const [chapter, setChapter] = useState(chapterList[0].name);
  return (
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
  );
};
export default ChapterList;
