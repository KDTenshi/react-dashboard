import type { FC } from "react";

import style from "./TaskCard.module.css";
import type { TTask, TTaskPriority } from "../../../shared/types/types";
import { useAppDispatch } from "../../../app/store/appStore";
import { setSelectedTask } from "../../../shared/store/boardSlice";

interface TaskCardProps {
  task: TTask;
}

const priorityStyles: { [key in TTaskPriority]: string } = {
  low: style.Low,
  moderate: style.Moderate,
  high: style.High,
};

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setSelectedTask({ task }));
  };

  return (
    <div className={style.Card} onClick={handleClick}>
      <h4 className={style.Title}>{task.title}</h4>
      <div className={style.Info}>
        <p className={style.Date}>
          <span className="material-symbols-outlined">calendar_clock</span>
          10.08
        </p>
        <p className={priorityStyles[task.priority]}>{task.priority}</p>
      </div>
    </div>
  );
};

export default TaskCard;
