import { useState, type FC } from "react";

import style from "./Task.module.css";
import { useAppDispatch } from "../../../app/store/appStore";
import { deleteTask, editSelectedTask, unsetSelectedTask } from "../../../shared/store/boardSlice";
import type { TTask } from "../../../shared/types/types";

import { PriorityPicker } from "../../PriorityPicker";
import { ConfirmDelete } from "../../ConfirmDelete";
import { DateDisplay, Popup, Warning } from "../../../shared/ui";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [deadline, setDeadline] = useState(task.deadline);

  const [isTitleWarning, setIsTitleWarning] = useState(false);
  const [isDateWarning, setIsDateWarning] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTask({ selectedTask: task }));
  };

  const handleConfirm = () => {
    const newTitle = title.trim();
    const newDescription = description.trim();

    if (!newTitle) setIsTitleWarning(true);

    if (task.date >= deadline) setIsDateWarning(true);

    if (newTitle && task.date < deadline) {
      dispatch(editSelectedTask({ title: newTitle, description: newDescription, priority, deadline }));
      dispatch(unsetSelectedTask());
    }
  };

  return (
    <Popup hide={() => dispatch(unsetSelectedTask())}>
      {confirmDelete && <ConfirmDelete handleDelete={handleDelete} hidePopup={() => setConfirmDelete(false)} />}
      <button className={style.Delete} onClick={() => setConfirmDelete(true)}>
        <span className="material-symbols-outlined">delete</span>Delete
      </button>
      <div className={style.Group}>
        <input
          type="text"
          className={style.Input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
        />
        {isTitleWarning && (
          <Warning text="Invalid title" isShown={isTitleWarning} hide={() => setIsTitleWarning(false)} />
        )}
      </div>
      <div className={style.Group}>
        <p className={style.Label}>Description</p>
        <textarea
          className={style.Description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="No description..."
        ></textarea>
      </div>
      <div className={style.Group}>
        <p className={style.Label}>Priority</p>
        <PriorityPicker activePriority={priority} setPriority={setPriority} />
      </div>
      <div className={style.Dates}>
        <div className={style.Group}>
          <p className={style.Label}>Created at</p>
          <DateDisplay timestamp={task.date} />
        </div>
        <div className={style.Group}>
          <p className={style.Label}>Deadline</p>
          <DateDisplay timestamp={deadline} setTimestamp={setDeadline} withPicker />
          {isDateWarning && (
            <Warning text="Invalid date" isShown={isDateWarning} hide={() => setIsDateWarning(false)} />
          )}
        </div>
      </div>
      <div className={style.Buttons}>
        <button className={style.Cancel} onClick={() => dispatch(unsetSelectedTask())}>
          Cancel
        </button>
        <button className={style.Confirm} onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </Popup>
  );
};

export default Task;
