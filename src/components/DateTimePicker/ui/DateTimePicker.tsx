import { useEffect, useState, type FC } from "react";

import style from "./DateTimePicker.module.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface DateTimePickerProps {
  setIsShown: (arg: boolean) => void;
  timestamp: number;
  setTimestamp: (arg: number) => void;
}

const DateTimePicker: FC<DateTimePickerProps> = ({ setIsShown, timestamp, setTimestamp }) => {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const [selectedHours, setSelectedHours] = useState(hours);
  const [selectedMinutes, setSelectedMinutes] = useState(minutes);
  const [selectedDay, setSelectedDay] = useState(day);
  const [selectedMonth, setSelectedMonth] = useState(+month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [daysCount, setDaysCount] = useState(32 - new Date(year, month, 32).getDate());
  const [calendarOffset, setCalendarOffset] = useState(0);

  useEffect(() => {
    setDaysCount(32 - new Date(selectedYear, selectedMonth, 32).getDate());
    setCalendarOffset(new Date(selectedYear, selectedMonth, 1).getDay() - 1);
  }, [selectedMonth, selectedYear]);

  const increaseSelectedMonth = () => {
    if (selectedMonth + 1 > 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const decreaseSelectedMonth = () => {
    if (selectedMonth - 1 < 0) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);

    const newDate = new Date(selectedYear, selectedMonth, day, selectedHours, selectedMinutes);
    setTimestamp(newDate.getTime());
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    const timeStrings = e.target.value.split(":");

    const newHours = +timeStrings[0];
    const newMinutes = +timeStrings[1];

    setSelectedHours(newHours);
    setSelectedMinutes(newMinutes);

    const newDate = new Date(selectedYear, selectedMonth, day, newHours, newMinutes);
    setTimestamp(newDate.getTime());
  };

  const parseNumber = (num: number) => {
    return num / 10 < 1 ? `0${num}` : num;
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) {
      setIsShown(false);

      const newDate = new Date(selectedYear, selectedMonth, selectedDay, selectedHours, selectedMinutes);
      setTimestamp(newDate.getTime());
    }
  };

  return (
    <div className={style.Wrapper} onClick={handleClick}>
      <div className={style.Picker}>
        <div className={style.Preview}>
          <input
            type="time"
            className={style.Time}
            value={`${parseNumber(selectedHours)}:${parseNumber(selectedMinutes)}`}
            onChange={handleTimeChange}
          />
          <p className={style.Date}>{new Date(timestamp).toDateString()}</p>
        </div>
        <div className={style.Heading}>
          <button className={style.Button} onClick={() => setSelectedYear(selectedYear - 1)}>
            <span className="material-symbols-outlined">keyboard_double_arrow_left</span>
          </button>
          <button className={style.Button} onClick={decreaseSelectedMonth}>
            <span className="material-symbols-outlined">keyboard_arrow_left</span>
          </button>
          <p className={style.Date}>
            {months[selectedMonth]} {selectedYear}
          </p>
          <button className={style.Button} onClick={increaseSelectedMonth}>
            <span className="material-symbols-outlined">keyboard_arrow_right</span>
          </button>
          <button className={style.Button} onClick={() => setSelectedYear(selectedYear + 1)}>
            <span className="material-symbols-outlined">keyboard_double_arrow_right</span>
          </button>
        </div>
        <div className={style.Days}>
          {weekDays.map((day) => (
            <div className={style.WeekDay} key={day}>
              {day}
            </div>
          ))}
          {[...new Array(daysCount + calendarOffset)].map((day, index) => (
            <div
              className={index < calendarOffset ? "" : style.Day}
              key={`${day}${index}`}
              onClick={() => handleDayClick(index - calendarOffset + 1)}
            >
              {index < calendarOffset ? "" : index - calendarOffset + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
