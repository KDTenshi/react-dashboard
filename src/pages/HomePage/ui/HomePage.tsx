import type { FC } from "react";

import style from "./HomePage.module.css";
import { getDateString } from "../../../shared/utils/getDateString";
import { RecentProjectsList } from "../../../features/projects/components/RecentProjectsList";

const HomePage: FC = () => {
  return (
    <div className={style.Page}>
      <div className={style.Heading}>
        <h1 className={style.Title}>Welcome, UserName!</h1>
        <h3 className={style.Date}>{getDateString(Date.now(), "long")}</h3>
      </div>
      <div className={style.Body}>
        <RecentProjectsList />
        <div className={style.Template}>Something will be added here later</div>
      </div>
    </div>
  );
};

export default HomePage;
