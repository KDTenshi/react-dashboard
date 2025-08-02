import { type FC } from "react";

import { useAppDispatch } from "../../../app/store/appStore";
import { setIsAdding } from "../../../shared/store/boardSlice";

import style from "./AddTask.module.css";
import { Popup } from "../../../shared/ui";
import { TaskForm } from "../../TaskForm";

const AddTask: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Popup hide={() => dispatch(setIsAdding(false))}>
      <h2 className={style.Title}>Add new task</h2>
      <TaskForm />
    </Popup>
  );
};

export default AddTask;
