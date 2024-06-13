import React, { CSSProperties, useRef, useState } from "react";
import CalendarSlider from "../../Components/CalendarSlider/CalendarSlider";
import classes from "./style/LessonsCalendar.module.css";
import { useToggle } from "../../hooks/useToggle";
import Group from "../../UI_Component/Icons/Group";
import { Dropdown } from "../../Components/DropDown/DropDown";
import { OptionCard } from "../../UI_Component/OptionCard/OptionCard";
import Button from "../../UI_Component/Button/Button";
import { setStyle } from "../../utils/setStyleDropdown";

export const optionsSort = [
  "Ментальная арифметика",
  "Программирование",
  "Скорочтение",
];

const buttonStyle: CSSProperties = {
  width: "344px",
  height: "40px",
  padding: "10px 40px 10px 40px",
  gap: "8px",
  borderRadius: "30px",
  backgroundColor: "#DECFFF",
  color: "#323854"
}

const LessonСalendar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const refParent = useRef<HTMLDivElement>(null);
  const [showDropDown, toggleShowDropDown] = useToggle(false);
  const [selectSort, setSelectSort] = useState("");

  const handleChange = (select: string) => {
    setSelectSort(select);
    toggleShowDropDown();
  };
  return (
    <div className={classes.lessonCalendarWrapper}>
     <div>
     <div className={classes.lessonCalendarSelect}>
        <div
          className={classes.select}
          ref={refParent}
          onClick={toggleShowDropDown}
        >
          <input readOnly={true} value={selectSort} placeholder="Выбрать предмет"/>
          <div className={showDropDown ? classes.optionACtive : classes.option}>
            <Group />
          </div>
        </div>
        <div>
          <Button style={buttonStyle}>Изменить расписание</Button>
        </div>
        {showDropDown && (
          <Dropdown
            ref={ref}
            children={
              <OptionCard
                value={selectSort}
                list={optionsSort}
                handleClick={handleChange}
              />
            }
            style={setStyle(refParent)}
            notPseudoElement
          />
        )}
      </div>
     </div>
      <div>
        <CalendarSlider />
      </div>
    </div>
  );
};

export default LessonСalendar;
