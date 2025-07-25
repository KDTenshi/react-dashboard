import type { FC } from "react";

import style from "./Column.module.css";
import { Task } from "../../Task";

type TColumnType = "todo" | "inProgress" | "done";

interface ColumnProps {
  type: TColumnType;
}

type TColumnData = { [key in TColumnType]: string };

const columnTitleStyles: TColumnData = {
  todo: style.Todo,
  inProgress: style.Progress,
  done: style.Done,
};

const columnTitles: TColumnData = {
  todo: "To Do",
  inProgress: "In Progress",
  done: "Done",
};

const Column: FC<ColumnProps> = ({ type }) => {
  return (
    <div className={style.Column}>
      <h4 className={columnTitleStyles[type]}>
        <span></span>
        {columnTitles[type]}
      </h4>
      <div className={style.List}>
        {/* <p className={style.Empty}>No tasks here</p> */}
        <Task />
      </div>
    </div>
  );
};

export default Column;
