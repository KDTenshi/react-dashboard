import type { FC } from "react";

import style from "./ProjectsList.module.css";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { setIsAddProjectFormShown } from "../../../../ui/uiSlice";
import { ProjectCard } from "../../ProjectCard";
import { useGetProjectsQuery } from "../../../projectsApi";

const ProjectsList: FC = () => {
  const dispatch = useAppDispatch();

  const { data: projects, isLoading } = useGetProjectsQuery();

  return (
    <div className={style.Projects}>
      <button className={style.Button} onClick={() => dispatch(setIsAddProjectFormShown(true))}>
        <span className="material-symbols-outlined">add</span>Create new project
      </button>
      {isLoading && <p>Loading...</p>}
      {projects && projects.map((project) => <ProjectCard project={project} key={project.id} />)}
    </div>
  );
};

export default ProjectsList;
