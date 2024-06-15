import React, { useRef, useState } from "react";
import CalendarSlider from "../../Components/CalendarSlider/CalendarSlider";
import classes from "./style/LessonsCalendar.module.css";
import { useToggle } from "../../hooks/useToggle";
import Group from "../../UI_Component/Icons/Group";
import { Dropdown } from "../../Components/DropDown/DropDown";
import { OptionCard } from "../../UI_Component/OptionCard/OptionCard";
import { setStyle } from "../../utils/setStyleDropdown";

export const optionsSort = [
  "Ментальная арифметика",
  "Программирование",
  "Скорочтение",
];

const LessonСalendar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const refParent = useRef<HTMLDivElement>(null);
  const [showDropDown, toggleShowDropDown] = useToggle(false);
  const [select, setSelect] = useState("");
  const [changeSchedule, setChangeSchedule] = useState(false);

  const handleChange = (select: string) => {
    setSelect(select);
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
            <input
              readOnly={true}
              value={select}
              placeholder="Выбрать предмет"
            />
            <div
              className={showDropDown ? classes.optionACtive : classes.option}
            >
              <Group />
            </div>
          </div>
          <div>
            <button
              className={changeSchedule ? classes.buttonActive : classes.button}
              onClick={() => setChangeSchedule(!changeSchedule)}
            >
              Изменить расписание
            </button>
          </div>
          {showDropDown && (
            <Dropdown
              ref={ref}
              children={
                <OptionCard
                  value={select}
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
        <CalendarSlider select={select} changeSchedule={changeSchedule} />
      </div>
    </div>
  );
};

export default LessonСalendar;
