import { useEffect, useState, type FC } from "react";

import style from "./HomePage.module.css";
import { getDateString } from "../../../shared/utils/getDateString";
import { RecentProjectsList } from "../../../features/projects/components/RecentProjectsList";

const HomePage: FC = () => {
  const [date, setDate] = useState(getDateString(Date.now(), "long"));

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getDateString(Date.now(), "long"));
    }, 15 * 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className={style.Page}>
      <div className={style.Heading}>
        <h1 className={style.Title}>Welcome, UserName!</h1>
        <h3 className={style.Date}>{date}</h3>
      </div>
      <div className={style.Body}>
        <RecentProjectsList />
        <div className={style.Template}>Something will be added here later</div>
      </div>
    </div>
  );
};

export default HomePage;
