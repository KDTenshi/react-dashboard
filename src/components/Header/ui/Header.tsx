import type { FC } from "react";

import style from "./Header.module.css";

const Header: FC = () => {
  return (
    <header className={style.Header}>
      <form className={style.SearchBar}>
        <input type="text" className={style.Input} placeholder="Search..." />
        <button className={style.Search}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
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
