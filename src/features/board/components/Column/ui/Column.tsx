import { type FC } from "react";

import style from "./Column.module.css";
import { useAppSelector } from "../../../../../app/store/appStore";
import type { TColumnType } from "../../../../../shared/types/types";
import { TaskCard } from "../../../../tasks/components/TaskCard";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";

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

  const { setNodeRef } = useSortable({ id: column.title, data: { type: "column" } });

  return (
    <div className={style.Column}>
      <h4 className={columnTitleStyles[type]}>
        <span className={style.Dot}></span>
        {columnTitles[type]}
      </h4>
      <div className={style.List} ref={setNodeRef}>
        {column.taskIDs.length === 0 && <p className={style.Empty}>No tasks here</p>}
        <SortableContext items={column.taskIDs} strategy={verticalListSortingStrategy}>
          {column.taskIDs.map((id) => (
            <TaskCard key={id} taskID={id} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
