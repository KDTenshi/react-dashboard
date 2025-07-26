import { useState, type FC } from "react";

import style from "./Column.module.css";
import { Task } from "../../Task";
import type { TColumnType } from "../../../shared/types/types";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { addTask } from "../../../shared/store/boardSlice";

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
  const dispatch = useAppDispatch();

  const [isAdding, setIsAdding] = useState(false);
  const [addingValue, setAddingValue] = useState("");

  const handleAddTask = () => {
    const title = addingValue.trim();

    if (title) dispatch(addTask({ title }));

    setIsAdding(false);
    setAddingValue("");
  };

  const handleAddTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleAddTask();
  };

  return (
    <div className={style.Column}>
      <h4 className={columnTitleStyles[type]}>
        <span className={style.Dot}></span>
        {columnTitles[type]}
        {type === "todo" && (
          <button className={style.Button} onClick={() => setIsAdding(true)}>
            <span className="material-symbols-outlined">add</span>
          </button>
        )}
      </h4>
      <div className={style.List}>
        {isAdding && (
          <form className={style.Add} onSubmit={handleAddTaskSubmit}>
            <input
              type="text"
              className={style.Input}
              value={addingValue}
              autoFocus
              onChange={(e) => setAddingValue(e.target.value)}
              onBlur={handleAddTask}
              placeholder="Task title..."
            />
          </form>
        )}
        {column.tasks.length === 0 && !isAdding && <p className={style.Empty}>No tasks here</p>}
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
