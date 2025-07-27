import { useEffect, useState, type FC } from "react";

import style from "./AddTask.module.css";
import type { TTaskPriority } from "../../../shared/types/types";
import { useAppDispatch } from "../../../app/store/appStore";
import { addTask, setIsAdding } from "../../../shared/store/boardSlice";
import { DateTimePicker } from "../../DateTimePicker";

const AddTask: FC = () => {
  const dispatch = useAppDispatch();

  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [priority, setPriority] = useState<TTaskPriority>("low");
  const [deadline, setDeadline] = useState(Date.now());

  const [isWarning, setIsWarning] = useState(false);
  const [isPickerShown, setIsPickerShown] = useState(false);

  useEffect(() => {
    if (isWarning) {
      setTimeout(() => {
        setIsWarning(false);
      }, 2000);
    }
  }, [isWarning]);

  const clearAdding = () => {
    setTitleValue("");
    setDescValue("");
    setPriority("low");

    dispatch(setIsAdding(false));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleValue.trim();
    const description = descValue.trim();

    if (title) {
      dispatch(addTask({ title, description, priority, deadline }));
      clearAdding();
    } else {
      setIsWarning(true);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) clearAdding();
  };

  return (
    <div className={style.Wrapper} onClick={handleClick}>
      {isPickerShown && (
        <DateTimePicker setIsShown={setIsPickerShown} timestamp={deadline} setTimestamp={setDeadline} />
      )}
      <div className={style.Add}>
        <h2 className={style.Title}>Add new task</h2>
        <form className={style.Form} onSubmit={handleSubmit}>
          <p className={style.Label}>Task title</p>
          <div className={style.WithWarning}>
            <input
              type="text"
              className={style.Input}
              placeholder="Task title..."
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            {isWarning && <p className={style.Warning}>Enter valid task title</p>}
          </div>
          <p className={style.Label}>Task description</p>
          <textarea
            className={style.Textarea}
            placeholder="Task description..."
            value={descValue}
            onChange={(e) => setDescValue(e.target.value)}
          ></textarea>
          <p className={style.Label}>Task priority</p>
          <div className={style.Priorities}>
            <button
              className={priority === "low" ? [style.Low, style.Active].join(" ") : style.Low}
              type="button"
              onClick={() => setPriority("low")}
            >
              Low
            </button>
            <button
              className={priority === "moderate" ? [style.Moderate, style.Active].join(" ") : style.Moderate}
              type="button"
              onClick={() => setPriority("moderate")}
            >
              Moderate
            </button>
            <button
              className={priority === "high" ? [style.High, style.Active].join(" ") : style.High}
              type="button"
              onClick={() => setPriority("high")}
            >
              High
            </button>
          </div>
          <p className={style.Label}>Task deadline</p>
          <div className={style.Deadline}>
            <p className={style.Date}>{new Date(deadline).toLocaleString()}</p>
            <button className={style.Calendar} type="button" onClick={() => setIsPickerShown(true)}>
              <span className="material-symbols-outlined">calendar_clock</span>
            </button>
          </div>
          <div className={style.Buttons}>
            <button className={style.Cancel} type="button" onClick={clearAdding}>
              Cancel
            </button>
            <button className={style.Confirm}>Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
