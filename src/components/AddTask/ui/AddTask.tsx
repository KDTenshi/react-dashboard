import { useState, type FC } from "react";

import type { TTaskPriority } from "../../../shared/types/types";

import { useAppDispatch } from "../../../app/store/appStore";
import { addTask, setIsAdding } from "../../../shared/store/boardSlice";

import style from "./AddTask.module.css";
import { PriorityPicker } from "../../PriorityPicker";
import { DateDisplay, Popup, WithWarning } from "../../../shared/ui";

const AddTask: FC = () => {
  const dispatch = useAppDispatch();

  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [priority, setPriority] = useState<TTaskPriority>("low");
  const [deadline, setDeadline] = useState(Date.now());

  const [isTitleWarning, setIsTitleWarning] = useState(false);
  const [isDateWarning, setIsDateWarning] = useState(false);

  const handleSubmit = () => {
    const date = Date.now();

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
      <h2 className={style.Title}>Add new task</h2>
      <div className={style.Group}>
        <p className={style.Label}>Task title</p>
        <WithWarning message="Invalid date" isShown={isTitleWarning} hideWarning={() => setIsTitleWarning(false)}>
          <input
            type="text"
            className={style.Input}
            placeholder="Task title..."
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
        </WithWarning>
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
          <WithWarning message="Invalid date" isShown={isDateWarning} hideWarning={() => setIsDateWarning(false)}>
            <DateDisplay timestamp={deadline} setTimestamp={setDeadline} withPicker />
          </WithWarning>
        </div>
      </div>
      <div className={style.Buttons}>
        <button className={style.Cancel} onClick={() => dispatch(setIsAdding(false))}>
          Cancel
        </button>
        <button className={style.Confirm} onClick={handleSubmit}>
          Confirm
        </button>
      </div>
    </Popup>
  );
};

export default AddTask;
