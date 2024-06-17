import React, { FC } from "react";
import { ILesson } from "../../store/slice";
import classes from "./style/UpcomingLessons.module.css";
import Account from "../../UI_Component/Icons/Account";
import { getDay, getMonth } from "../../utils/getDate";
import { getDurationLesson } from "../../utils/getDurationLesson";

const UpcomingLessons: FC<{ lessons: ILesson[] }> = ({ lessons }) => {
  return (
    <div className={classes.wrapper}>
      <h2>Ближайшие уроки</h2>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.date} className={classes.lesson}>
            <div className={classes.lessonDate}>
              <div className={classes.lessonDateDay}>{getDay(lesson.date)}</div>
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
              <button
                className={classes.button}              
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
              </button>
              <button
                className={classes.button}
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
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        className={classes.button}
        style={{
          backgroundColor: "#DECFFF",
          width: "344px",
          height: "40px",
          color: "#323854",
        }}
      >
        Button
      </button>
    </div>
  );
};

export default UpcomingLessons;
