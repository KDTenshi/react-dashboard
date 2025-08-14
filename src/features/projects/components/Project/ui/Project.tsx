import { useEffect, useRef, useState, type FC } from "react";

import style from "./Project.module.css";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/appStore";
import { DndWrapper } from "../../DndWrapper";
import { Column } from "../../Column";
import { ActionsBar } from "../../ActionsBar";
import { Loader } from "../../../../../shared/ui";
import type { TColumnType } from "../../../../../shared/types/types";
import { editLocalProjectTitle } from "../../../projectsSlice";
import { clearLocalProjectThunk } from "../../../../../services/thunks/projects";
import { AddTask } from "../../../../tasks/components/AddTask";

const Project: FC = () => {
  const dispatch = useAppDispatch();

  const localProject = useAppSelector((state) => state.projectsSlice.localProject);

  const isAddTaskFormShown = useAppSelector((state) => state.ui.isAddTaskFormShown);

  const [editTitleValue, setEditTitleValue] = useState("");

  useEffect(() => {
    if (localProject) setEditTitleValue(localProject.title);
  }, [localProject]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return () => {
      dispatch(clearLocalProjectThunk());
    };
  }, [dispatch]);

  if (!localProject) return <Loader />;

  const columns = Object.entries(localProject.columns);

  const handleTitleEdit = () => {
    const title = editTitleValue.trim();

    if (!title) setEditTitleValue(localProject.title);

    if (title) {
      dispatch(editLocalProjectTitle({ title }));
    }
  };

  return (
    <div className={style.Project}>
      {isAddTaskFormShown && <AddTask />}
      <div className={style.Heading}>
        <input
          type="text"
          className={style.Input}
          placeholder="Project title..."
          value={editTitleValue}
          onChange={(e) => setEditTitleValue(e.target.value)}
          onBlur={handleTitleEdit}
        />
      </div>
      <ActionsBar />
      <DndWrapper>
        <div className={style.Columns}>
          {columns.map(([title, taskIDs]) => (
            <Column title={title as TColumnType} taskIDs={taskIDs} key={title} />
          ))}
        </div>
      </DndWrapper>
    </div>
  );
};

export default Project;
