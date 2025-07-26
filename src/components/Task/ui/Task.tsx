import type { FC } from "react";

import style from "./Task.module.css";
import type { TTask } from "../../../shared/types/types";
import { useAppDispatch } from "../../../app/store/appStore";
import { setSelectedTask } from "../../../shared/store/boardSlice";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleTaskClick = () => {
    dispatch(setSelectedTask({ task }));
  };

  return (
    <div className={style.Task} onClick={handleTaskClick}>
      <h4 className={style.Title}>{task.title}</h4>
      <p className={style.Desc}>{task.description}</p>
    </div>
  );
};

export default Task;
