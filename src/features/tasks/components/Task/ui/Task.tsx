import { useState, type FC } from "react";

import style from "./Task.module.css";
import { TaskForm } from "../../TaskForm";
import type { TTask } from "../../../../../shared/types/types";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { Button, ConfirmDelete, Popup } from "../../../../../shared/ui";
import { setSelectedTask } from "../../../tasksSlice";
import { deleteTask } from "../../../tasksThunks";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTask());
  };

  return (
    <Popup hide={() => dispatch(setSelectedTask(null))}>
      {confirmDelete && <ConfirmDelete handleDelete={handleDelete} hidePopup={() => setConfirmDelete(false)} />}
      <div className={style.Heading}>
        <Button color={"red"} onClick={() => setConfirmDelete(true)}>
          <span className="material-symbols-outlined">delete</span>Delete
        </Button>
      </div>
      <TaskForm task={task} />
    </Popup>
  );
};

export default Task;
