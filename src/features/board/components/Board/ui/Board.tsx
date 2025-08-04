import { useState, type FC } from "react";

import style from "./Board.module.css";
import { Column } from "../../Column";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/appStore";
import { setIsAddTaskFormShown } from "../../../../ui/uiSlice";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { moveTask } from "../../../../tasks/tasksThunks";
import type { TColumnType } from "../../../../../shared/types/types";
import { setDraggingTaskID } from "../../../../tasks/tasksSlice";
import { TaskCard } from "../../../../tasks/components/TaskCard";
import { moveTaskInColumn } from "../../../boardSlice";

const Board: FC = () => {
  const dispatch = useAppDispatch();

  const draggingTaskID = useAppSelector((state) => state.tasks.draggingTaskID);

  const [title, setTitle] = useState("Project title");
  const [editTitle, setEditTitle] = useState(title);

  const handleEdit = () => {
    const newTitle = editTitle.trim();

    if (newTitle) {
      setTitle(newTitle);
      setEditTitle(newTitle);
    } else {
      setEditTitle(title);
    }
  };

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });

  const sensors = useSensors(mouseSensor);

  const handleDragStart = (e: DragStartEvent) => {
    const taskID = e.active.id as string;

    dispatch(setDraggingTaskID(taskID));
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    const taskID = active.id as string;
    const overID = over.id as TColumnType;

    if (taskID === overID) return;

    if (overData.type === "task") {
      const activeColumn: TColumnType = activeData.column;
      const overColumn: TColumnType = overData.column;

      if (activeColumn !== overColumn) {
        dispatch(moveTask(overColumn, taskID));
      } else {
        dispatch(moveTaskInColumn({ activeID: taskID, overID, column: overColumn }));
      }
    }

    if (overData.type === "column") {
      dispatch(moveTask(overID, taskID));
    }
  };

  const handleDragEnd = () => {
    dispatch(setDraggingTaskID(null));
  };

  return (
    <div className={style.Board}>
      <div className={style.Heading}>
        <input
          type="text"
          className={style.Input}
          placeholder="Project title..."
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleEdit}
        />
      </div>
      <div className={style.Actions}>
        <button className={style.Button} onClick={() => dispatch(setIsAddTaskFormShown(true))}>
          <span className="material-symbols-outlined">add</span>
          Add Task
        </button>
        <button className={style.Button}>
          <span className="material-symbols-outlined">filter_list</span>
          Filter
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </button>
      </div>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
        sensors={sensors}
      >
        <div className={style.Columns}>
          <Column type={"todo"} />
          <Column type={"inProgress"} />
          <Column type={"done"} />
        </div>
        <DragOverlay>{draggingTaskID && <TaskCard taskID={draggingTaskID} />}</DragOverlay>
      </DndContext>
    </div>
  );
};

export default Board;
