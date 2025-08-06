import type { FC } from "react";

import style from "./RecentProjectsList.module.css";
import { useAppSelector } from "../../../../../app/store/appStore";
import { ProjectCard } from "../../ProjectCard";

const RecentProjectsList: FC = () => {
  const recentProjects = useAppSelector((state) => state.projects.recentProjects);

  return (
    <div className={style.Projects}>
      <h4 className={style.Title}>Recent projects</h4>
      {recentProjects.length === 0 && <p className={style.Empty}>No recently visited projects yet</p>}
      <div className={style.Container}>
        {recentProjects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default RecentProjectsList;
