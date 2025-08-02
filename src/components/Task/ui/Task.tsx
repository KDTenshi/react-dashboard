import { useState, type FC } from "react";

import style from "./Task.module.css";
import { useAppDispatch } from "../../../app/store/appStore";
import { deleteTask, unsetSelectedTask } from "../../../shared/store/boardSlice";
import type { TTask } from "../../../shared/types/types";

import { ConfirmDelete } from "../../ConfirmDelete";
import { Popup } from "../../../shared/ui";
import { TaskForm } from "../../TaskForm";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTask({ selectedTask: task }));
  };

  return (
    <Popup hide={() => dispatch(unsetSelectedTask())}>
      {confirmDelete && <ConfirmDelete handleDelete={handleDelete} hidePopup={() => setConfirmDelete(false)} />}
      <button className={style.Delete} onClick={() => setConfirmDelete(true)}>
        <span className="material-symbols-outlined">delete</span>Delete
      </button>
      <TaskForm task={task} />
    </Popup>
  );
};

export default Task;
