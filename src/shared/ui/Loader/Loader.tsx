import type { FC } from "react";

import style from "./Loader.module.css";

const Loader: FC = () => {
  return (
    <div className={style.Loader}>
      <div className={style.Spinner}></div>
      <h3 className={style.Title}>Loading, please wait...</h3>
    </div>
  );
};

export default Loader;
