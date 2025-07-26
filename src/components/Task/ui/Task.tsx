import type { FC } from "react";

import style from "./Task.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { unsetSelectedTask } from "../../../shared/store/boardSlice";

const Task: FC = () => {
  const selectedTask = useAppSelector((state) => state.board.selectedTask);
  const dispatch = useAppDispatch();

  if (!selectedTask) return;

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) dispatch(unsetSelectedTask());
  };

  const handleButtonClick = () => {
    dispatch(unsetSelectedTask());
  };

  return (
    <div className={style.Wrapper} onClick={handleClick}>
      <div className={style.Task}>
        <div className={style.Heading}>
          <h3 className={style.Title}>{selectedTask.title}</h3>
          <button className={style.Edit}>
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>
        <div className={style.Divider}>
          <p className={style.Label}>Description</p>
          <button className={style.Edit}>
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>
        <p className={style.Description}>{selectedTask.description}</p>
        <div className={style.Divider}>
          <p className={style.Label}>Priority</p>
        </div>
        <div className={style.Priorities}>
          <button className={selectedTask.priority === "low" ? [style.Low, style.Active].join(" ") : style.Low}>
            Low
          </button>
          <button
            className={selectedTask.priority === "moderate" ? [style.Moderate, style.Active].join(" ") : style.Moderate}
          >
            Moderate
          </button>
          <button className={selectedTask.priority === "high" ? [style.High, style.Active].join(" ") : style.High}>
            High
          </button>
        </div>
        <div className={style.Buttons}>
          <button className={style.Cancel} onClick={handleButtonClick}>
            Cancel
          </button>
          <button className={style.Confirm} onClick={handleButtonClick}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
