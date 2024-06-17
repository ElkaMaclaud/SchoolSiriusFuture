import React, { FC } from "react";
import classes from "./style/TimeToNextLesson.module.css";
import { ITimeToNextLesson } from "../../store/slice";

const TimeToNextLesson: FC<{ nextLesson: ITimeToNextLesson }> = ({
  nextLesson,
}) => {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.header}>Следующее занятие начнется через:</h2>
      <div className={classes.date}>
        <div  className={classes.dateWrapper}>{nextLesson.days}</div><div className={classes.dateInfo}>д</div> 
        <div  className={classes.dateWrapper}>{nextLesson.hours}</div><div className={classes.dateInfo}>ч</div>
        <div  className={classes.dateWrapper}>{nextLesson.minutes}</div><div className={classes.dateInfo}>мин</div>
      </div>
      <button className={classes.button}>
        Button
      </button>
    </div>
  );
};

export default TimeToNextLesson;
