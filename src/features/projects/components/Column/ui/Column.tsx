import { type FC } from "react";

import style from "./Column.module.css";
import type { TColumnType } from "../../../../../shared/types/types";
import { TaskCard } from "../../../../tasks/components/TaskCard";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface ColumnProps {
  title: TColumnType;
  taskIDs: string[];
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

const Column: FC<ColumnProps> = ({ title, taskIDs }) => {
  const { setNodeRef } = useSortable({ id: title, data: { type: "column" } });

  return (
    <div className={style.Column}>
      <h4 className={columnTitleStyles[title]}>
        <span className={style.Dot}></span>
        {columnTitles[title]}
      </h4>
      <div className={style.List} ref={setNodeRef}>
        {taskIDs.length === 0 && <p className={style.Empty}>No tasks here</p>}
        <SortableContext items={taskIDs} strategy={verticalListSortingStrategy}>
          {taskIDs.map((id) => (
            <TaskCard key={id} taskID={id} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
