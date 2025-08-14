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
// import { moveLocalTaskThunk, updateServerDataThunk } from "../../../../../services/thunks/tasks";
import type { TColumnType } from "../../../../../shared/types/types";
// import { changeLocalTaskPosition } from "../../../projectsSlice";

const DndWrapper: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  // const selectedTaskID = useAppSelector((state) => state.tasks.selectedTaskID);

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });

  const sensors = useSensors(mouseSensor);

  const handleDragStart = (e: DragStartEvent) => {
    const taskID = e.active.id as string;

    // dispatch(setSelectedTaskID(taskID));
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!over) return;

    const activeID = active.id as string;
    const overID = over.id;

    if (activeID === overID) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    const overType = overData.type;

    if (overType === "column") {
      // dispatch(moveLocalTaskThunk({ taskID: activeID, columnTo: overID as TColumnType }));
    }

    if (overType === "task" && activeData.column === overData.column) {
      const column = activeData.column;

      // dispatch(changeLocalTaskPosition({ activeID, overID: overID as string, column }));
    }

    if (overType === "task" && activeData.column !== overData.column) {
      // dispatch(moveLocalTaskThunk({ taskID: activeID, columnTo: overData.column }));
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active } = e;

    // dispatch(updateServerDataThunk(active.id as string));
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
      {/* <DragOverlay>{selectedTaskID && <TaskCard taskID={selectedTaskID} />}</DragOverlay> */}
    </DndContext>
  );
};

export default DndWrapper;
