import { useState, type FC } from "react";

import style from "./DateDisplay.module.css";
import { getDateString } from "../../utils/getDateString";
import DatePicker from "../DatePicker/DatePicker";

interface DateDisplayProps {
  timestamp: number;
  format?: "short" | "long";
  withPicker?: boolean;
  setTimestamp?: (arg: number) => void;
}

const DateDisplay: FC<DateDisplayProps> = ({ timestamp, format = "long", withPicker = false, setTimestamp }) => {
  const [isPickerShown, setIsPickerShown] = useState(false);

  return (
    <div className={style.Container}>
      {isPickerShown && setTimestamp && (
        <DatePicker timestamp={timestamp} setTimestamp={setTimestamp} setIsShown={setIsPickerShown} />
      )}

      <p className={format === "long" ? style.Long : style.Short}>
        {format === "short" && <span className="material-symbols-outlined">calendar_clock</span>}
        {getDateString(timestamp, format)}
      </p>
      {withPicker && setTimestamp && format === "long" && (
        <button className={style.Button} type="button" onClick={() => setIsPickerShown(true)}>
          <span className="material-symbols-outlined">calendar_clock</span>
        </button>
      )}
    </div>
  );
};

export default DateDisplay;
