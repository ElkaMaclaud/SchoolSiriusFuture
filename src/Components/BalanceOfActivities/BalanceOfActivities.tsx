import React, { FC } from "react";
import classes from "./style/BalanceOfActivities.module.css";
import { ICountLessons } from "../../store/slice";

const BalanceOfActivities: FC<{ listLessons: ICountLessons }> = ({
  listLessons,
}) => {
  return (
    <div className={classes.wrapper}>
      <h2>Баланс занятий</h2>
      <ul>
        {Object.keys(listLessons).map((key) => (
          <li key={key} className={classes.lesson}>
            <div>{key}</div>
            <div className={classes.lessonRound}>{listLessons[key]}</div>
          </li>
        ))}
      </ul>
      <button className={classes.button}>Button</button>
    </div>
  );
};

export default BalanceOfActivities;
