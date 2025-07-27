import { useEffect, useState, type FC } from "react";

import style from "./Task.module.css";
import { useAppDispatch } from "../../../app/store/appStore";
import { deleteTask, editSelectedTask, unsetSelectedTask } from "../../../shared/store/boardSlice";
import type { TTask } from "../../../shared/types/types";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (isWarning) {
      setTimeout(() => {
        setIsWarning(false);
      }, 2000);
    }
  }, [isWarning]);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) dispatch(unsetSelectedTask());
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Popup)) setConfirmDelete(false);
  };

  const handleButtonClick = () => {
    dispatch(unsetSelectedTask());
  };

  const handleDelete = () => {
    dispatch(deleteTask({ selectedTask: task }));
  };

  const handleConfirm = () => {
    const newTitle = title.trim();
    const newDescription = description.trim();

    if (!newTitle) setIsWarning(true);

    if (newTitle) {
      dispatch(editSelectedTask({ title: newTitle, description: newDescription, priority }));
      dispatch(unsetSelectedTask());
    }
  };

  return (
    <div className={style.Wrapper} onClick={handleClick}>
      <div className={style.Task}>
        {confirmDelete && (
          <div className={style.Popup} onClick={handlePopupClick}>
            <div className={style.Body}>
              <h3 className={style.Question}>Confirm delete?</h3>
              <div className={style.Actions}>
                <button className={style.Cancel} onClick={() => setConfirmDelete(false)}>
                  Cancel
                </button>
                <button className={style.Confirm} onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        <button className={style.Delete} onClick={() => setConfirmDelete(true)}>
          <span className="material-symbols-outlined">delete</span>Delete
        </button>
        <div className={style.Heading}>
          <div className={style.Title}>
            <input
              type="text"
              className={style.Input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
            />
            {isWarning && <p className={style.Warning}>Enter valid task title</p>}
          </div>
        </div>
        <div className={style.Divider}>
          <p className={style.Label}>Description</p>
        </div>
        <textarea
          className={style.Description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="No description..."
        ></textarea>
        <div className={style.Divider}>
          <p className={style.Label}>Priority</p>
        </div>
        <div className={style.Priorities}>
          <button
            className={priority === "low" ? [style.Low, style.Active].join(" ") : style.Low}
            onClick={() => setPriority("low")}
          >
            Low
          </button>
          <button
            className={priority === "moderate" ? [style.Moderate, style.Active].join(" ") : style.Moderate}
            onClick={() => setPriority("moderate")}
          >
            Moderate
          </button>
          <button
            className={priority === "high" ? [style.High, style.Active].join(" ") : style.High}
            onClick={() => setPriority("high")}
          >
            High
          </button>
        </div>
        <div className={style.Buttons}>
          <button className={style.Cancel} onClick={handleButtonClick}>
            Cancel
          </button>
          <button className={style.Confirm} onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
