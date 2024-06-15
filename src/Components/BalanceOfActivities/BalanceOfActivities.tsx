import React, { FC } from "react";
import classes from "./style/BalanceOfActivities.module.css";
import { ICountLessons } from "../../store/slice";
import Button from "../../UI_Component/Button/Button";

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
      <Button
        style={{
          backgroundColor: "#DECFFF",
          width: "100%",
          height: "40px",
          color: "#323854",
        }}
      >
        Button
      </Button>
    </div>
  );
};

export default BalanceOfActivities;
