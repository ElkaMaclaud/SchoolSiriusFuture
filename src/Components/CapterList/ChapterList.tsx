// В идеале эти разделы должны приходить из бэка, но здесь я просто создаю моковые данные
import React, { cloneElement, useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import Pay from "../../UI_Component/Icons/Pay";
import { useAppDispatch } from "../../store/reduxHooks";
import { SET_MEET_THE_USER } from "../../store/slice";

const chapterList: IChapterList[] = [
  { component: <Home />, name: "Главная", path: "/profile" },
  { component: <Calendar />, name: "Расписание", path: "/lessonCalendar" },
  { component: <Pay />, name: "Оплата", path: "/pay" },
  { component: <Achievements />, name: "Достижения", path: "/achievements" },
  { component: <Puzzle />, name: "Тренажеры", path: "/puzzle" },
  { component: <Library />, name: "Библиотека", path: "/library" },
  { component: <Headset />, name: "Проверка связи", path: "/headset" },
  { component: <Settings />, name: "Настройки", path: "/settings" },
  { component: <Questions />, name: "Вопросы", path: "/questions" },
];

const ChapterList = () => {
  const location = useLocation()
  const [chapter, setChapter] = useState("");
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  
  const handleClick = (item: IChapterList) => {
    dispatch(SET_MEET_THE_USER(false))
    setChapter(item.name);
    navigate(item.path);
  }

  useEffect(()=> {
    setChapter(chapterList.find(item=>item.path===location.pathname)?.name || "")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])
  
  return (
    <div className={classes.sidebarChapterList}>
      {chapterList.map((item) => {
        return (
          <div
            onClick={() => {
              handleClick(item)
            }}
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
            <div>{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};
export default ChapterList;
