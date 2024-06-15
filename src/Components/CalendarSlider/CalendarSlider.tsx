import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { Arrow } from "../../UI_Component/Icons/Arrow";
import classes from "./style/CalendarSlider.module.css";
import Questions from "../../UI_Component/Icons/Questions";
import { useToggle } from "../../hooks/useToggle";
import { Dropdown } from "../DropDown/DropDown";
import { setStyle } from "../../utils/setStyleDropdown";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { createCalendar } from "../../utils/getPeriodDate";
import {
  FETCH_LESSONS_NAME_AND_DATE,
  ILesson,
  SET_LOADING,
} from "../../store/slice";
import Spinner from "../Spinner/Spinner";
import CellContent from "../CellContent/CellContent";

interface ISelectProps {
  select: string;
  changeSchedule: boolean;
}

const CalendarSlider: FC<ISelectProps> = ({ select, changeSchedule }) => {
  const { lessons, loading } = useAppSelector((state) => state.page);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const ref = useRef<HTMLDivElement>(null);
  const refParent = useRef<HTMLDivElement>(null);
  const [showDropDown, toggleShowDropDown] = useToggle(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const periodDate = createCalendar(
      createCalendarPeriods().firstDate,
      createCalendarPeriods().daysInMonth,
      currentMonth,
      currentYear
    );
    const startDate = periodDate[0];
    const endDate = periodDate[1];
    const dto = { name: select || "Ментальная арифметика", startDate, endDate };
    dispatch(SET_LOADING(true));
    dispatch(FETCH_LESSONS_NAME_AND_DATE({ ...dto }));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, select]);

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

  const createCalendarPeriods = () => {
    const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDate = 1 - firstDay + (firstDay === 0 ? -6 : 1);

    return { firstDate, daysInMonth };
  };
  const CellContentList: FC<{
    lessonsForDate: ILesson[];
  }> = ({ lessonsForDate }) => {
    return (
      <Fragment>
        {lessonsForDate.map((lesson) => {
          const getStyle = () => {
            const lessonDate = new Date(lesson.date);
            if (lessonDate.getMonth() === currentMonth - 2) {
              return {
                backgroundColor: "transparent",
                border: `${lesson.wasAbsent ? "1px solid #79747F" : "1px solid #22782B"}`,
                textDecoration: `${lesson.wasAbsent ? "line-through" : "none"}`,
                cursor: changeSchedule ? "pointer" : "auto",
              };
            } else if (
              lessonDate.getMonth() === currentMonth - 1 &&
              lessonDate.getDate() === 1
            ) {
              return {
                backgroundColor: "#EEEEFF",
                cursor: changeSchedule ? "pointer" : "auto",
              };
            }
            return {
              cursor: changeSchedule ? "pointer" : "auto",
            };
          };

          const lessonDate = new Date(lesson.date);
          lessonDate.setTime(lessonDate.getTime() + 45 * 60000);
          const formattedTime = lessonDate.toLocaleTimeString([], {
            timeZone: "UTC",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <CellContent
              key={lesson.date}
              changeSchedule={changeSchedule}
              lesson={lesson}
              style={getStyle()}
              parentValue={`${lesson.date.slice(11, 16)} - ${formattedTime}\n${lesson.lessonName}`}
              formattedTime={`${lesson.date.slice(11, 16)} - ${formattedTime}`}
              edit={lessonDate.getMonth() === currentMonth - 2 ? false : true}
            />
          );
        })}
      </Fragment>
    );
  };

  const createCalendarRender = () => {
    const { firstDate, daysInMonth } = createCalendarPeriods();

    let date = firstDate;
    let calendarRows = [];

    for (let i = 0; i < 5; i++) {
      let cells = [];
      for (let j = 0; j < 7; j++) {
        const currentDate = new Date(currentYear, currentMonth - 1, date);

        const lessonsForDate = lessons.filter((lesson) => {
          const lessonDate = new Date(lesson.date);

          return (
            lessonDate.getFullYear() === currentDate.getFullYear() &&
            lessonDate.getMonth() === currentDate.getMonth() &&
            lessonDate.getDate() === currentDate.getDate()
          );
        });

        let cellContent = null;
        if (lessonsForDate.length > 0) {
          cellContent = <CellContentList lessonsForDate={lessonsForDate} />;
        }

        if (date < 1) {
          const prevMonthDate = new Date(
            currentYear,
            currentMonth - 1,
            date
          ).getDate();
          cells.push(
            <td key={`prev-${prevMonthDate}`}>
              <div className={classes.otherMonth}>{prevMonthDate}</div>
              {cellContent}
            </td>
          );
        } else if (date > daysInMonth) {
          const nextMonthDate = date - daysInMonth;
          cells.push(
            <td key={`next-${nextMonthDate}`}>
              <div className={classes.otherMonth}>{nextMonthDate}</div>
              {cellContent}
            </td>
          );
        } else {
          cells.push(
            <td key={date}>
              <div className={classes.date}>{date}</div>
              {cellContent}
            </td>
          );
        }
        date++;
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
          <div className={classes.wrapperCalendarMothNane}>
            {capitalizedMonth} {currentYear}
          </div>
          <div onClick={() => changeMonth(1)}>
            <Arrow />
          </div>
        </div>
        <div className={classes.wrapperCalendarButtonToday}>
          <button onClick={goToToday}>Сегодня</button>
          <div onClick={toggleShowDropDown}>
            <Questions color={"#7362BC"} />
          </div>
          {showDropDown && (
            <Dropdown
              ref={ref}
              style={{ ...setStyle(refParent), top: "250px" }}
              children={
                <div style={{ padding: "20px" }}>
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
        {loading && <Spinner />}
        <tbody>{createCalendarRender()}</tbody>
      </table>
    </div>
  );
};

export default CalendarSlider;
