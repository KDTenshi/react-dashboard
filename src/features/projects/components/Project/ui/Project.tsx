import { useEffect, useState, type FC } from "react";

import style from "./Project.module.css";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { editProjectTitle } from "../../../projectsSlice";
import { DndWrapper } from "../../DndWrapper";
import { Column } from "../../Column";
import { ActionsBar } from "../../ActionsBar";
import { useGetProjectByIDQuery } from "../../../projectsApi";

interface ProjectProps {
  projectID: string;
}

const Project: FC<ProjectProps> = ({ projectID }) => {
  const { data: project } = useGetProjectByIDQuery(projectID);

  const dispatch = useAppDispatch();

  const [editTitleValue, setEditTitleValue] = useState("");

  useEffect(() => {
    if (project) setEditTitleValue(project.title);
  }, [project]);

  if (!project) return;

  const columns = Object.values(project.columns);

  const handleEditTitle = () => {
    const title = editTitleValue.trim();

    if (!title) {
      setEditTitleValue(project.title);
    }

    if (title) {
      dispatch(editProjectTitle({ projectID, title }));
    }
  };

  return (
    <div className={style.Project}>
      <div className={style.Heading}>
        <input
          type="text"
          className={style.Input}
          placeholder="Project title..."
          value={editTitleValue}
          onChange={(e) => setEditTitleValue(e.target.value)}
          onBlur={handleEditTitle}
        />
      </div>
      <ActionsBar />
      <DndWrapper>
        <div className={style.Columns}>
          {columns.map((column) => (
            <Column column={column} key={column.title} />
          ))}
        </div>
      </DndWrapper>
    </div>
  );
};

export default Project;
