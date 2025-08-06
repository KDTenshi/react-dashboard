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
import type { FC, PropsWithChildren } from "react";
import { TaskCard } from "../../../../tasks/components/TaskCard";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/appStore";
import type { TColumnType } from "../../../../../shared/types/types";
import { moveTask } from "../../../../tasks/tasksThunks";
import { setSelectedTaskID } from "../../../../tasks/tasksSlice";
import { moveTaskIDInColumn } from "../../../projectsSlice";

const DndWrapper: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  const selectedTaskID = useAppSelector((state) => state.tasks.selectedTaskID);

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });

  const sensors = useSensors(mouseSensor);

  const handleDragStart = (e: DragStartEvent) => {
    const taskID = e.active.id as string;

    dispatch(setSelectedTaskID(taskID));
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!over) return;

    if (active.id === over.id) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    const activeID = active.id as string;

    if (overData.type === "task") {
      const overID = over.id as string;
      const column = overData.column;

      const isSameColumn = activeData.column === overData.column;

      if (isSameColumn) dispatch(moveTaskIDInColumn({ activeID, overID, column }));

      if (!isSameColumn) dispatch(moveTask(column, activeID));
    }

    if (overData.type === "column") {
      const overID = over.id as TColumnType;

      dispatch(moveTask(overID, activeID));
    }
  };

  const handleDragEnd = () => {
    dispatch(setSelectedTaskID(null));
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
      sensors={sensors}
    >
      {children}
      <DragOverlay>{selectedTaskID && <TaskCard taskID={selectedTaskID} />}</DragOverlay>
    </DndContext>
  );
};

export default DndWrapper;
