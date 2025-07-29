import type { FC, PropsWithChildren } from "react";

import style from "./Popup.module.css";

interface PopupProps {
  hide: () => void;
}

const Popup: FC<PropsWithChildren<PopupProps>> = ({ children, hide }) => {
  const handleWrapperClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) hide();
  };

  return (
    <div className={style.Wrapper} onClick={handleWrapperClick}>
      <div className={style.Body}>{children}</div>
    </div>
  );
};

export default Popup;
