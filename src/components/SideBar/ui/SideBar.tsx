import { useEffect, useState, type FC } from "react";

import style from "./SideBar.module.css";
import { useAppSelector } from "../../../app/store/appStore";

const SideBar: FC = () => {
  const status = useAppSelector((state) => state.board.sideBarStatus);
  const [className, setClassName] = useState(style.SideBar);

  useEffect(() => {
    console.log(status);

    if (status === "shown") setClassName([style.SideBar, style.Shown].join(" "));

    if (status === "hidden") setClassName([style.SideBar, style.Hidden].join(" "));
  }, [status]);

  return (
    <div className={className}>
      <nav className={style.Nav}>
        <a href="/" className={style.Link}>
          <span className="material-symbols-outlined">home</span>
          Home
        </a>
        <a href="/" className={style.Link}>
          <span className="material-symbols-outlined">table</span>
          Projects
        </a>
        <a href="/" className={style.Link}>
          <span className="material-symbols-outlined">settings</span>
          Settings
        </a>
      </nav>
      <div className={style.Future}>Here will be more in the future</div>
    </div>
  );
};

export default SideBar;
