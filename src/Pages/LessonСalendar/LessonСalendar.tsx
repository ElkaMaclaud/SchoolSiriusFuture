import React, { CSSProperties, useRef, useState } from "react";
import CalendarSlider from "../../Components/CalendarSlider/CalendarSlider";
import classes from "./style/LessonsCalendar.module.css";
import { useToggle } from "../../hooks/useToggle";
import Group from "../../UI_Component/Icons/Group";
import { Dropdown } from "../../Components/DropDown/DropDown";
import { OptionCard } from "../../UI_Component/OptionCard/OptionCard";
import Button from "../../UI_Component/Button/Button";

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
  const style: CSSProperties = {
    ...getСoordinates(),
    width: `${
      refParent.current?.clientWidth && refParent.current?.clientWidth + 5
    }px`,
    overflow: "hidden",
    padding: "0",
    zIndex: "1",
    boxShadow: "0px 0px 10px rgba(56, 49, 49, 0.1)",
    borderRadius: "10px",
  };
  function getСoordinates(): CSSProperties {
    const top = refParent.current?.offsetTop;
    const left = refParent.current?.offsetLeft;
    return { top: `${top && top + 45}px`, left: `${left}px` };
  }
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
            style={style}
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
