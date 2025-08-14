import { useState, type FC } from "react";

import style from "./AddProject.module.css";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { setIsAddProjectFormShown } from "../../../../ui/uiSlice";
import { Button, InputWithWarning } from "../../../../../shared/ui";
import { createNewProject } from "../../../../../shared/utils/createNewProject";
import { useAddProjectMutation } from "../../../projectsApi";

const AddProject: FC = () => {
  const dispatch = useAppDispatch();

  const [addProject] = useAddProjectMutation();

  const [titleValue, setTitleValue] = useState("");
  const [isTitleWarning, setIsTitleWarning] = useState(false);

  const handleWrapperClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) {
      dispatch(setIsAddProjectFormShown(false));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleValue.trim();

    if (!title) {
      setIsTitleWarning(true);
      return;
    }

    if (title) {
      const project = createNewProject(title);

      addProject(project);
      dispatch(setIsAddProjectFormShown(false));
    }
  };

  return (
    <div className={style.Wrapper} onClick={handleWrapperClick}>
      <form className={style.Form} onSubmit={handleSubmit}>
        <h3 className={style.Title}>Add new project</h3>
        <InputWithWarning
          warningMessage="Invalid title"
          isWarningShown={isTitleWarning}
          hideWarning={() => setIsTitleWarning(false)}
          placeholder="Project title..."
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <div className={style.Buttons}>
          <Button onClick={() => dispatch(setIsAddProjectFormShown(false))}>Cancel</Button>
          <Button type="submit" color="dark">
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
