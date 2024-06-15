import React, {
  ChangeEvent,
  FC,
  useState,
  useRef,
  CSSProperties,
} from "react";
import { ILesson } from "../../store/slice";
import classes from "./style/CellContent.module.css";
import Pay from "../../UI_Component/Icons/Pay";

const CellContent: FC<{
  lesson: ILesson;
  changeSchedule: boolean;
  style: CSSProperties;
  parentValue: string;
  formattedTime: string;
}> = ({ lesson, changeSchedule, style, parentValue, formattedTime }) => {
  const [change, setChange] = useState(false);
  const [value, setValue] = useState(parentValue);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  if (changeSchedule && change) {
    return (
      <input
        className={classes.cardInput}
        ref={inputRef}
        onChange={(e) => {
          handleChange(e);
        }}
        value={value}
      />
    );
  }
  return (
    <div
      className={classes.wrapperCard}
      style={style}
      onClick={() => setChange(!change)}
    >
      <div className={classes.cardLessonDatePay}>{formattedTime}<Pay color={"#E12828"} /></div>
      <div className={classes.cardLessonName}>{lesson.lessonName}</div>
    </div>
  );
};
export default CellContent;
