import { type FC } from "react";

import style from "./AddTask.module.css";
import { TaskForm } from "../../TaskForm";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { Popup } from "../../../../../shared/ui";
import { setIsAddTaskFormShown } from "../../../../ui/uiSlice";

const AddTask: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Popup hide={() => dispatch(setIsAddTaskFormShown(false))}>
      <h2 className={style.Title}>Add new task</h2>
      <TaskForm />
    </Popup>
  );
};

export default AddTask;
