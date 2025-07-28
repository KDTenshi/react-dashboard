import { useEffect, useState, type FC } from "react";

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
  const [isExpired, setIsExpired] = useState(task.deadline < Date.now());

  const handleClick = () => {
    dispatch(setSelectedTask({ task }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (task.deadline < Date.now()) setIsExpired(true);
    }, 30000);

    return () => clearInterval(interval);
  });

  return (
    <div className={style.Card} onClick={handleClick}>
      <h4 className={style.Title}>{task.title}</h4>
      <div className={style.Info}>
        <p className={isExpired ? style.Expired : style.Date}>
          <span className="material-symbols-outlined">calendar_clock</span>
          {new Date(task.deadline).toDateString()}
        </p>
        <p className={priorityStyles[task.priority]}>{task.priority}</p>
      </div>
    </div>
  );
};

export default TaskCard;
