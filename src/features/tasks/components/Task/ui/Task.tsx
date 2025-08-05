import { useState, type FC } from "react";

import style from "./Task.module.css";
import { TaskForm } from "../../TaskForm";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/appStore";
import { Button, ConfirmDelete, Popup } from "../../../../../shared/ui";
import { deleteTask } from "../../../tasksThunks";
import { hideTaskPopup } from "../../../../ui/uiThunks";

interface TaskProps {
  taskID: string;
}

const Task: FC<TaskProps> = ({ taskID }) => {
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.tasks.list[taskID]);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTask());
  };

  return (
    <Popup hidePopup={() => dispatch(hideTaskPopup())}>
      {confirmDelete && <ConfirmDelete handleDelete={handleDelete} hidePopup={() => setConfirmDelete(false)} />}
      <div className={style.Heading}>
        <Button color={"red"} onClick={() => setConfirmDelete(true)}>
          <span className="material-symbols-outlined">delete</span>Delete
        </Button>
      </div>
      <TaskForm task={task} hideForm={() => dispatch(hideTaskPopup())} />
    </Popup>
  );
};

export default Task;
