import { type FC } from "react";
import { useSearchParams } from "react-router";
import { Project } from "../../../features/projects/components/Project";
import { useAppDispatch } from "../../../app/store/appStore";
import { getProjectByIDThunk } from "../../../services/thunks/projects";

const ProjectPage: FC = () => {
  const [searchParams] = useSearchParams();
  const projectID = searchParams.get("projectID");

  const dispatch = useAppDispatch();

  if (!projectID) return;

  dispatch(getProjectByIDThunk(projectID));

  return <Project />;
};

export default ProjectPage;
