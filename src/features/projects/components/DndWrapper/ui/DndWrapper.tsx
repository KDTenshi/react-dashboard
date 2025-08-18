import {
  DndContext,
  DragOverlay,
  MouseSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { FC, PropsWithChildren } from "react";
import { TaskCard } from "../../../../tasks/components/TaskCard";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/appStore";
import type { TColumnType } from "../../../../../shared/types/types";
import { clearSelectedTaskID, setSelectedTaskID } from "../../../../tasks/tasksSlice";
import { moveTaskToColumnThunk, updateServerDataThunk } from "../../../../../services/thunks/tasks";
import { moveTaskInLocalColumn } from "../../../projectsSlice";

const DndWrapper: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const selectedTaskID = useAppSelector((state) => state.tasksSlice.selectedTaskID);

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });

  const sensors = useSensors(mouseSensor);

  const handleDragStart = (e: DragStartEvent) => {
    const taskID = e.active.id as string;

    dispatch(setSelectedTaskID(taskID));
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!over) return;

    const activeID = active.id as string;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    if (overData.type === "task") {
      const overID = over.id as string;

      if (activeID === overID) return;

      const activeColumn = activeData.column;
      const overColumn = overData.column;

      if (activeColumn === overColumn) {
        dispatch(moveTaskInLocalColumn({ column: activeColumn, activeID, overID }));
      } else {
        dispatch(moveTaskToColumnThunk({ taskID: activeID, columnTo: overColumn }));
      }
    }

    if (overData.type === "column") {
      const overID = over.id as TColumnType;

      dispatch(moveTaskToColumnThunk({ taskID: activeID, columnTo: overID }));
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active } = e;

    const activeID = active.id as string;

    dispatch(clearSelectedTaskID());
    dispatch(updateServerDataThunk({ taskID: activeID }));
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
