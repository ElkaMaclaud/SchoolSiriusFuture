// В идеале эти разделы должны приходить из бэка, но здесь я просто создаю моковые данные
import React, { cloneElement, useState } from "react";
import classes from "./style/ChapterList.module.css";
import Home from "../../UI_Component/Icons/Home";
import Calendar from "../../UI_Component/Icons/Calendar";
import Achievements from "../../UI_Component/Icons/Achievements";
import Library from "../../UI_Component/Icons/Library";
import Puzzle from "../../UI_Component/Icons/Puzzle";
import Headset from "../../UI_Component/Icons/Headset";
import Settings from "../../UI_Component/Icons/Settings";
import Questions from "../../UI_Component/Icons/Questions";
import { IChapterList } from "../../Type/ChapterListType";
import { useNavigate } from "react-router-dom";
import Pay from "../../UI_Component/Icons/Pay";

const chapterList: IChapterList[] = [
  { component: <Home />, name: "Главная", path: "/profile" },
  { component: <Calendar />, name: "Расписание", path: "/lessonСalendar" },
  { component: <Pay/>, name: "Оплата", path: "/pay" },
  { component: <Achievements />, name: "Достижения", path: "/achievements" },
  { component: <Puzzle />, name: "Тренажеры", path: "/puzzle" },
  { component: <Library />, name: "Библиотека", path: "/library" },
  { component: <Headset />, name: "Проверка связи", path: "/headset" },
  { component: <Settings />, name: "Настройки", path: "/settings" },
  { component: <Questions />, name: "Вопросы", path: "/questions" },
];

const ChapterList = () => {
  const [chapter, setChapter] = useState(chapterList[0].name);
  const navigate = useNavigate()
  return (
    <div className={classes.sidebarChapterList}>
      {chapterList.map((item) => {
        return (
          <div
            key={item.name}
            className={
              chapter === item.name
                ? classes.sidebarChapterActive
                : classes.sidebarChapter
            }
          >
            {cloneElement(item.component, {
              color: chapter === item.name ? "#fff" : "#434B74",
            })}
            <p onClick={() => {setChapter(item.name); navigate(item.path)}}>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};
export default ChapterList;
