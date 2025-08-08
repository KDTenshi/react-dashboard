import { useEffect, type FC } from "react";
import { useSearchParams } from "react-router";
import { Project } from "../../../features/projects/components/Project";
import { useAppDispatch } from "../../../app/store/appStore";
import { addRecentProject, setActiveProjectID } from "../../../features/projects/projectsSlice";

const ProjectPage: FC = () => {
  const [searchParams] = useSearchParams();
  const projectID = searchParams.get("projectID");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (projectID) {
      dispatch(setActiveProjectID(projectID));
      // dispatch(addRecentProject({ projectID }));
    }

    return () => {
      dispatch(setActiveProjectID(null));
    };
  }, []);

  if (!projectID) return;

  return <Project projectID={projectID} />;
};

export default ProjectPage;
