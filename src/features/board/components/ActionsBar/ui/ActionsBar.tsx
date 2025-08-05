import type { FC } from "react";

import style from "./ActionsBar.module.css";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { setIsAddTaskFormShown } from "../../../../ui/uiSlice";

const ActionsBar: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={style.Bar}>
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
  );
};

export default ActionsBar;
