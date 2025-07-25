import type { FC } from "react";

import style from "./Board.module.css";
import { Column } from "../../Column";

const Board: FC = () => {
  return (
    <div className={style.Board}>
      <div className={style.Heading}>
        <h1 className={style.Title}>Project Title</h1>
        <button className={style.Edit}>
          <span className="material-symbols-outlined">edit</span>
        </button>
      </div>
      <div className={style.Filters}>
        <button className={style.Filter}>
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
