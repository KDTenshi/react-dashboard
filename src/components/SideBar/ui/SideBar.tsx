import { useState, type FC } from "react";

import style from "./SideBar.module.css";
import { Logo } from "../../../shared/ui";

const SideBar: FC = () => {
  const [status, setStatus] = useState<"shown" | "hidden" | null>(null);

  const className =
    status === "shown"
      ? [style.SideBar, style.Shown].join(" ")
      : status === "hidden"
      ? [style.SideBar, style.Hidden].join(" ")
      : style.SideBar;

  return (
    <div className={className}>
      <div className={style.Logo}>
        <Logo />
        <button className={style.Button} onClick={() => setStatus("hidden")}>
          <span className="material-symbols-outlined">keyboard_double_arrow_left</span>
        </button>
        {status === "hidden" && (
          <button className={[style.Button, style.Show].join(" ")} onClick={() => setStatus("shown")}>
            <span className="material-symbols-outlined">keyboard_double_arrow_right</span>
          </button>
        )}
      </div>
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
