import type { FC } from "react";

import style from "./ProjectsPage.module.css";
import { ProjectsList } from "../../../features/projects/components/ProjectsList";

const ProjectsPage: FC = () => {
  return (
    <div className={style.Page}>
      <h2 className={style.Title}>Your projects</h2>
      <ProjectsList />
    </div>
  );
};

export default ProjectsPage;
