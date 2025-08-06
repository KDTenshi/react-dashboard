import type { FC } from "react";

import style from "./ProjectsList.module.css";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/appStore";
import { setIsAddProjectFormShown } from "../../../../ui/uiSlice";
import { ProjectCard } from "../../ProjectCard";

const ProjectsList: FC = () => {
  const dispatch = useAppDispatch();
  const projects = Object.values(useAppSelector((state) => state.projects.list));

  return (
    <div className={style.Projects}>
      <button className={style.Button} onClick={() => dispatch(setIsAddProjectFormShown(true))}>
        <span className="material-symbols-outlined">add</span>Create new project
      </button>
      {projects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
};

export default ProjectsList;
