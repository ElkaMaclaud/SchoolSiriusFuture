import React, {  useRef, useState } from "react";
import { Arrow } from "../../UI_Component/Icons/Arrow";
import classes from "./style/CalendarSlider.module.css";
import CardSmall from "../../UI_Component/CardSmall/CardSmall";
import Questions from "../../UI_Component/Icons/Questions";
import { useToggle } from "../../hooks/useToggle";
import { Dropdown } from "../DropDown/DropDown";
import { setStyle } from "../../utils/setStyleDropdown";

const CalendarSlider = () => {
  const currentDate = new Date().getDate();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const ref = useRef<HTMLDivElement>(null);
  const refParent = useRef<HTMLDivElement>(null);
  const [showDropDown, toggleShowDropDown] = useToggle(false);

  const getStyle = (date: number) => {
    if (date === currentDate) return { backgroundColor: "#EEEEFF" };
    return {};
  };

  const goToToday = () => {
    setCurrentYear(new Date().getFullYear());
    setCurrentMonth(new Date().getMonth() + 1);
  };

  const changeMonth = (increment: number) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;

    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const createCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth - 1, 0).getDay();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    let date = 1;
    let calendarRows = [];

    for (let i = 0; i < 5; i++) {
      let cells = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          const lastMonthDays = new Date(
            currentYear,
            currentMonth - 1,
            0
          ).getDate();
          cells.push(
            <td key={`other-${j}`} className="other-month">
              {lastMonthDays - firstDay + j + 1}
              {
                <CardSmall style={getStyle(date)}>
                  Контент для карточки
                </CardSmall>
              }
            </td>
          );
        } else if (date > daysInMonth) {
          cells.push(
            <td key={`other-${j}`} className="other-month">
              {date - daysInMonth}
              {
                <CardSmall style={getStyle(date)}>
                  Контент для карточки
                </CardSmall>
              }
            </td>
          );
          date++;
        } else {
          cells.push(
            <td key={date}>
              {date}
              {
                <CardSmall style={getStyle(date)}>
                  Контент для карточки
                </CardSmall>
              }
              {
                <CardSmall style={getStyle(date)}>
                  Контент для карточки
                </CardSmall>
              }
            </td>
          );
          date++;
        }
      }
      calendarRows.push(<tr key={i}>{cells}</tr>);
    }

    return calendarRows;
  };
  const monthName = new Date(currentYear, currentMonth - 1).toLocaleString(
    "default",
    {
      month: "long",
    }
  );
  const capitalizedMonth =
    monthName.charAt(0).toUpperCase() + monthName.slice(1);

  return (
    <div className={classes.wrapperCalendar}>
      <div className={classes.wrapperCalendarInfo}>
        <div className={classes.wrapperCalendarButtons}>
          <div onClick={() => changeMonth(-1)}>
            <Arrow left />
          </div>
          <p className={classes.wrapperCalendarMothNane}>
            {capitalizedMonth} {currentYear}
          </p>
          <div onClick={() => changeMonth(1)}>
            <Arrow />
          </div>
        </div>
        <div className={classes.wrapperCalendarButtonToday}>
          <button onClick={goToToday}>Сегодня</button>
          <div onClick={toggleShowDropDown}><Questions color={"#7362BC"} /></div>
          {showDropDown && (
            <Dropdown
              ref={ref}
              style={{...setStyle(refParent), top: "250px"}}
              children={
                <div style={{padding: "20px"}}>
                  <h3>Частые вопросы</h3>
                  <ul>
                    Список вопросов: 
                    <li>Как научиться быстро читать</li>
                    <li>Как научиться быстро считать</li>
                    <li>Как научиться программировать</li>
                  </ul>
                </div>
              }
              notPseudoElement
            />
          )}
        </div>
      </div>
      <table className={classes.wrapperCalendarTable}>
        <thead>
          <tr>
            <th>Пн</th>
            <th>Вт</th>
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
            <th>Вс</th>
          </tr>
        </thead>
        <tbody>{createCalendar()}</tbody>
      </table>
    </div>
  );
};

export default CalendarSlider;
