import type { FC } from "react";

import style from "./ProjectCard.module.css";
import type { TProject, TRecentProject } from "../../../../../shared/types/types";
import { Link } from "react-router";

interface ProjectCardProps {
  project: TProject | TRecentProject;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link to={`/project?projectID=${project.id}`} className={style.Card}>
      <span className="material-symbols-outlined">table</span>
      {project.title}
    </Link>
  );
};

export default ProjectCard;
