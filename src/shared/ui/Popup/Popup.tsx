import type { FC, PropsWithChildren } from "react";

import style from "./Popup.module.css";

interface PopupProps {
  hidePopup: () => void;
}

const Popup: FC<PropsWithChildren<PopupProps>> = ({ children, hidePopup }) => {
  const handleWrapperClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) hidePopup();
  };

  return (
    <div className={style.Wrapper} onClick={handleWrapperClick}>
      <div className={style.Body}>{children}</div>
    </div>
  );
};

export default Popup;
