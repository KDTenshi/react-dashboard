import { useEffect, useState, type FC } from "react";

import style from "./SideBar.module.css";
import { useAppSelector } from "../../../../store/appStore";
import { NavLink } from "react-router";

const SideBar: FC = () => {
  const status = useAppSelector((state) => state.ui.sideBarStatus);
  const [className, setClassName] = useState(style.SideBar);

  useEffect(() => {
    if (status === "shown") setClassName([style.SideBar, style.Shown].join(" "));

    if (status === "hidden") setClassName([style.SideBar, style.Hidden].join(" "));
  }, [status]);

  return (
    <div className={className}>
      <nav className={style.Nav}>
        <NavLink to={"/"} className={style.Link}>
          <span className="material-symbols-outlined">home</span>
          Home
        </NavLink>
        <NavLink to={"projects"} className={style.Link}>
          <span className="material-symbols-outlined">table</span>
          Projects
        </NavLink>
        <NavLink to={"settings"} className={style.Link}>
          <span className="material-symbols-outlined">settings</span>
          Settings
        </NavLink>
      </nav>
      <div className={style.Future}>Here will be more in the future</div>
    </div>
  );
};

export default SideBar;
