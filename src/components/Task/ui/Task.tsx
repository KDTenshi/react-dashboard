import type { FC } from "react";

import style from "./Task.module.css";

const Task: FC = () => {
  return (
    <div className={style.Task}>
      <h4 className={style.Title}>Task title</h4>
      <p className={style.Desc}>Task description</p>
    </div>
  );
};

export default Task;
