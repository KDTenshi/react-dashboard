import { useState, type FC } from "react";

import style from "./Board.module.css";
import { Column } from "../../Column";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { setIsAddTaskFormShown } from "../../../../ui/uiSlice";

const Board: FC = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("Project title");
  const [editTitle, setEditTitle] = useState(title);

  const handleEdit = () => {
    const newTitle = editTitle.trim();

    if (newTitle) {
      setTitle(newTitle);
      setEditTitle(newTitle);
    } else {
      setEditTitle(title);
    }
  };

  return (
    <div className={style.Board}>
      <div className={style.Heading}>
        <input
          type="text"
          className={style.Input}
          placeholder="Project title..."
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleEdit}
        />
      </div>
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
      <div className={style.Columns}>
        <Column type={"todo"} />
        <Column type={"inProgress"} />
        <Column type={"done"} />
      </div>
    </div>
  );
};

export default Board;
