import React, { FC, useState, useRef, CSSProperties, ChangeEvent } from "react";
import { ILesson } from "../../store/slice";
import classes from "./style/CellContent.module.css";
import Pay from "../../UI_Component/Icons/Pay";

const CellContent: FC<{
  lesson: ILesson;
  changeSchedule: boolean;
  style: CSSProperties;
  parentValue: string;
  formattedTime: string;
  edit: boolean;
}> = ({ lesson, changeSchedule, style, parentValue, formattedTime, edit }) => {
  const [change, setChange] = useState(false);
  const [value, setValue] = useState(parentValue.split("\n")[0]);
  const [valueTwo, setValueTwo] = useState(parentValue.split("\n")[1]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRefTwo = useRef<HTMLInputElement | null>(null);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  if (changeSchedule && change && edit) {
    return (
      <div className={classes.cardInput}>
        <input
          type="text"
          ref={inputRef}
          onChange={handleChange}
          value={value}
        />
        {!lesson.paid && <Pay color={"#E12828"} />}
        <input
          type="text"
          ref={inputRefTwo}
          onChange={(e) => {
            setValueTwo(e.target.value);
          }}
          value={valueTwo}
        />
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
        {formattedTime}
        {!lesson.paid && <Pay color={"#E12828"} />}
      </div>
      <div className={classes.cardLessonName}>{lesson.lessonName}</div>
    </div>
  );
};
export default CellContent;
