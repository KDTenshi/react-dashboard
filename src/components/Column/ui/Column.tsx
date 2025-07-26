import { type FC } from "react";

import style from "./Column.module.css";
import type { TColumnType } from "../../../shared/types/types";
import { useAppSelector } from "../../../app/store/appStore";
import { TaskCard } from "../../TaskCard";

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
  const column = useAppSelector((state) => state.board.columns[type]);

  return (
    <div className={style.Column}>
      <h4 className={columnTitleStyles[type]}>
        <span className={style.Dot}></span>
        {columnTitles[type]}
      </h4>
      <div className={style.List}>
        {column.tasks.length === 0 && <p className={style.Empty}>No tasks here</p>}
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
