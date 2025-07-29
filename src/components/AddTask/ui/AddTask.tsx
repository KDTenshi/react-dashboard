import { useState, type FC } from "react";

import type { TTaskPriority } from "../../../shared/types/types";

import { useAppDispatch } from "../../../app/store/appStore";
import { addTask, setIsAdding } from "../../../shared/store/boardSlice";

import style from "./AddTask.module.css";
import { PriorityPicker } from "../../PriorityPicker";
import { DateDisplay, DatePicker, Popup, Warning } from "../../../shared/ui";

const AddTask: FC = () => {
  const dispatch = useAppDispatch();

  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [priority, setPriority] = useState<TTaskPriority>("low");
  const [deadline, setDeadline] = useState(Date.now());

  const [isTitleWarning, setIsTitleWarning] = useState(false);
  const [isDateWarning, setIsDateWarning] = useState(false);
  const [isPickerShown, setIsPickerShown] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const date = Math.floor(Date.now() / 1000 / 60) * 1000 * 60;

    const title = titleValue.trim();
    const description = descValue.trim();

    if (!title) setIsTitleWarning(true);

    if (deadline < date) setIsDateWarning(true);

    if (title && deadline >= date) {
      dispatch(addTask({ title, description, priority, deadline }));
      dispatch(setIsAdding(false));
    }
  };

  return (
    <Popup hide={() => dispatch(setIsAdding(false))}>
      {isPickerShown && <DatePicker setIsShown={setIsPickerShown} timestamp={deadline} setTimestamp={setDeadline} />}
      <h2 className={style.Title}>Add new task</h2>
      <form className={style.Form} onSubmit={handleSubmit}>
        <div className={style.Group}>
          <p className={style.Label}>Task title</p>
          <input
            type="text"
            className={style.Input}
            placeholder="Task title..."
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          {isTitleWarning && (
            <Warning text="Invalid title" isShown={isTitleWarning} hide={() => setIsTitleWarning(false)} />
          )}
        </div>
        <div className={style.Group}>
          <p className={style.Label}>Task description</p>
          <textarea
            className={style.Textarea}
            placeholder="Task description..."
            value={descValue}
            onChange={(e) => setDescValue(e.target.value)}
          ></textarea>
        </div>
        <div className={style.Group}>
          <p className={style.Label}>Task priority</p>
          <PriorityPicker activePriority={priority} setPriority={setPriority} />
        </div>
        <div className={style.Group}>
          <p className={style.Label}>Task deadline</p>
          <div className={style.Deadline}>
            <DateDisplay timestamp={deadline} setTimestamp={setDeadline} withPicker />
            {isDateWarning && (
              <Warning text="Invalid date" isShown={isDateWarning} hide={() => setIsDateWarning(false)} />
            )}
          </div>
        </div>
        <div className={style.Buttons}>
          <button className={style.Cancel} type="button" onClick={() => dispatch(setIsAdding(false))}>
            Cancel
          </button>
          <button className={style.Confirm}>Confirm</button>
        </div>
      </form>
    </Popup>
  );
};

export default AddTask;
