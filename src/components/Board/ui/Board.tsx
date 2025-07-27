import { useState, type FC } from "react";

import style from "./Board.module.css";
import { Column } from "../../Column";
import { useAppDispatch } from "../../../app/store/appStore";
import { setIsAdding } from "../../../shared/store/boardSlice";

const Board: FC = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("Project title");

  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleEdit = () => {
    setIsEdit(false);

    const newTitle = editValue.trim();

    if (newTitle) {
      setTitle(newTitle);
      setEditValue(newTitle);
    } else {
      setEditValue(title);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleEdit();
  };

  return (
    <div className={style.Board}>
      <div className={style.Heading}>
        {isEdit && (
          <form className={style.Edit} onSubmit={handleSubmit}>
            <input
              type="text"
              className={style.Input}
              placeholder="Project title..."
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
              onBlur={handleEdit}
            />
          </form>
        )}
        {!isEdit && (
          <>
            <h1 className={style.Title}>{title}</h1>
            <button className={style.Button} onClick={() => setIsEdit(true)}>
              <span className="material-symbols-outlined">edit</span>
            </button>
          </>
        )}
      </div>
      <div className={style.Actions}>
        <button className={style.Button} onClick={() => dispatch(setIsAdding(true))}>
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
