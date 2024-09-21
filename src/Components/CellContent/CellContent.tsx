import React, { FC, useState, CSSProperties, ChangeEvent, KeyboardEvent } from "react";
import { ILesson, SET_CHANGE_LESSONS } from "../../store/slice";
import classes from "./style/CellContent.module.css";
import Pay from "../../UI_Component/Icons/Pay";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { getDurationLesson } from "../../utils/getDurationLesson";

const CellContent: FC<{
  lesson: ILesson;
  changeSchedule: boolean;
  style: CSSProperties;
  edit: boolean;
}> = ({ lesson, changeSchedule, style, edit }) => {
  const { lessonСalendar } = useAppSelector((state) => state.page);
  const [change, setChange] = useState(false);
  const [valueTime, setValueTime] = useState(`${lesson.date.slice(11, 16)}`);
  const [valueTimeEnd, setValueTimeEnd] = useState(
    `${getDurationLesson(lesson.date)}`
  );
  const dispatch = useAppDispatch();

  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setValueTime(e.target.value);
    const durationTime =
      getDurationLesson(
        lesson.date.slice(0, 11) + e.target.value + lesson.date.slice(16)
      ) || valueTimeEnd;
    const value = durationTime === "Invalid Date" ? valueTimeEnd : durationTime;
    setValueTimeEnd(`${value}`);
  };
  const handleChangeTimeEnd = (e: ChangeEvent<HTMLInputElement>) => {
    setValueTimeEnd(e.target.value);
    const durationTime =
      getDurationLesson(
        lesson.date.slice(0, 11) + e.target.value + lesson.date.slice(16),
        "-"
      ) || valueTimeEnd;
    const value = durationTime === "Invalid Date" ? valueTime : durationTime;
    setValueTime(`${value}`);
  };
  const changeLesson = () => {
    setChange(!change);
    const newLesson = {
      ...lesson,
      modified: true,
      date: `${lesson.date.slice(0, 11)}${valueTime}${lesson.date.slice(16)}`,
    };
    dispatch(
      SET_CHANGE_LESSONS(
        lessonСalendar.map((les) => {
          if (les._id === lesson._id) {
            return newLesson;
          }
          return lesson;
        })
      )
    );
  };
  const handleBlur = () => {
    changeLesson();
  };
  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if ("key" in event && event.key === "Enter") {
      changeLesson();
    }
  };

  if (changeSchedule && change && edit) {
    return (
      <div className={classes.cardInput}>
        <div className={classes.cardInputDate}>
          <input
            type="text"
            onChange={handleChangeTime}
            value={valueTime}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
          />
          <div>—</div>
          <input
            type="text"
            value={valueTimeEnd}
            onChange={handleChangeTimeEnd}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
          />
        </div>
        {!lesson.paid && <Pay color={"#E12828"} />}
        <div className={classes.cardLessonName}>{lesson.lessonName}</div>
      </div>
    );
  }
  return (
    <div
      className={classes.wrapperCard}
      style={style}
      onClick={() => setChange(!change)}
    >
      <div className={classes.cardLessonDatePay}>
        {`${lesson.date.slice(11, 16)} - ${getDurationLesson(lesson.date)}`}
        {!lesson.paid && <Pay color={"#E12828"} />}
      </div>
      <div className={classes.cardLessonName}>{lesson.lessonName}</div>
    </div>
  );
};
export default CellContent;
