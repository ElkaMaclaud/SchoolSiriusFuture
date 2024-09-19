import React, { FC } from "react";
import { ILesson } from "../../store/slice";
import classes from "./style/UpcomingLessons.module.css";
import Button from "../../UI_Component/Button/Button";
import Account from "../../UI_Component/Icons/Account";
import { getDay, getMonth } from "../../utils/getDate";
import { getDurationLesson } from "../../utils/getDurationLesson";

const UpcomingLessons: FC<{ lessons: ILesson[] }> = ({ lessons }) => {
  return (
    <div className={classes.wrapper}>
      <h2>Ближайшие уроки</h2>
      <ul>
        {lessons.length > 0 &&
          lessons.map((lesson) => {
            const key = Math.random().toString(36);
            return (
              <li key={key} className={classes.lesson}>
                <div className={classes.lessonDate}>
                  <div className={classes.lessonDateDay}>
                    {getDay(lesson.date)}
                  </div>
                  <div className={classes.lessonDateMonth}>
                    {getMonth(lesson.date)}
                  </div>
                </div>
                <div className={classes.lessonName}>{lesson.lessonName}</div>
                <div className={classes.lessonPeriodDate}>{`${lesson.date.slice(
                  11,
                  16
                )} - ${getDurationLesson(lesson.date)}`}</div>
                <div className={classes.lessonTeacherAvatar}>
                  <Account />
                </div>
                <div className={classes.lessonTeacher}>{lesson.teacher}</div>
                <div className={classes.lessonButtons}>
                  <Button
                    style={{
                      backgroundColor: "#fff",
                      width: "56px",
                      height: "32px",
                      color: "#323854",
                      border: "1px solid #8D7FC7",
                      padding: "8px 10px 8px 10px",
                      fontSize: "12px",
                    }}
                  >
                    Button
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#8D7FC7",
                      width: "56px",
                      height: "32px",
                      color: "#fff",
                      padding: "8px 10px 8px 10px",
                      fontSize: "12px",
                    }}
                  >
                    Button
                  </Button>
                </div>
              </li>
            );
          })}
      </ul>
      <Button
        style={{
          backgroundColor: "#DECFFF",
          width: "344px",
          height: "40px",
          color: "#323854",
        }}
      >
        Button
      </Button>
    </div>
  );
};

export default UpcomingLessons;
