import type { FC } from "react";

import style from "./Header.module.css";
import { Logo } from "../../../../../shared/ui";
import { useAppDispatch } from "../../../../store/appStore";
import { switchSideBarStatus } from "../../../../../features/ui/uiSlice";

const Header: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <header className={style.Header}>
      <div className={style.Container}>
        <div className={style.Logo}>
          <button className={style.Menu} onClick={() => dispatch(switchSideBarStatus())}>
            <span className="material-symbols-outlined">menu</span>
          </button>
          <Logo />
        </div>
      </div>
      <button className={style.User}>
        <div className={style.Text}>
          <h4 className={style.Name}>User Name</h4>
          <p className={style.Info}>User Info</p>
        </div>
        <div className={style.Image}></div>
        <div className={style.Icon}>
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </div>
      </button>
    </header>
  );
};

export default Header;
