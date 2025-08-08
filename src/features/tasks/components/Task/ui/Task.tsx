import { useState, type FC } from "react";

import style from "./Task.module.css";
import { TaskForm } from "../../TaskForm";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { Button, ConfirmDelete, Popup } from "../../../../../shared/ui";
import { hideTaskPopup } from "../../../../ui/uiThunks";
import { useGetTaskByIDQuery } from "../../../tasksApi";
import { deleteTaskThunk } from "../../../../../services/thunks/tasks";

interface TaskProps {
  taskID: string;
}

const Task: FC<TaskProps> = ({ taskID }) => {
  const dispatch = useAppDispatch();
  const { data: task } = useGetTaskByIDQuery(taskID);

  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!task) return;

  const handleDelete = () => {
    dispatch(deleteTaskThunk(task));
    dispatch(hideTaskPopup());
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
