import { useState, type FC } from "react";

import style from "./Board.module.css";
import { Column } from "../../Column";
import { DndWrapper } from "../../DndWrapper";
import { ActionsBar } from "../../ActionsBar";

const Board: FC = () => {
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
      <ActionsBar />
      <DndWrapper>
        <div className={style.Columns}>
          <Column type={"todo"} />
          <Column type={"inProgress"} />
          <Column type={"done"} />
        </div>
      </DndWrapper>
    </div>
  );
};

export default Board;
