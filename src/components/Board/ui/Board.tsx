import type { FC } from "react";

import style from "./Board.module.css";
import { Column } from "../../Column";

const Board: FC = () => {
  return (
    <div className={style.Board}>
      <h1 className={style.Title}>Project Title</h1>
      <div className={style.Columns}>
        <Column type={"todo"} />
        <Column type={"inProgress"} />
        <Column type={"done"} />
      </div>
    </div>
  );
};

export default Board;
