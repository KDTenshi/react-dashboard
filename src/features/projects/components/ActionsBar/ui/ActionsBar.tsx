import { useState, type FC } from "react";

import style from "./ActionsBar.module.css";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/appStore";
import { setIsAddTaskFormShown } from "../../../../ui/uiSlice";
import { Button, ConfirmDelete } from "../../../../../shared/ui";
import { useNavigate } from "react-router";
import { deleteProject } from "../../../projectsSlice";

const ActionsBar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const activeProjectID = useAppSelector((state) => state.projects.activeProjectID);

  const [isDeleteShown, setIsDeleteShown] = useState(false);

  const handleDelete = async () => {
    if (!activeProjectID) return;

    navigate("/", { replace: true });

    setTimeout(() => {
      dispatch(deleteProject({ projectID: activeProjectID }));
    }, 1);
  };

  return (
    <div className={style.Bar}>
      {isDeleteShown && <ConfirmDelete handleDelete={handleDelete} hidePopup={() => setIsDeleteShown(false)} />}
      <div className={style.Actions}>
        <button className={style.Button} onClick={() => dispatch(setIsAddTaskFormShown(true))}>
          <span className="material-symbols-outlined">add</span>
          Add Task
        </button>
        <button className={style.Button}>
          <span className="material-symbols-outlined">filter_list</span>
          Filter
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </button>
      </div>
      <Button color="red" onClick={() => setIsDeleteShown(true)}>
        Delete
      </Button>
    </div>
  );
};

export default ActionsBar;
