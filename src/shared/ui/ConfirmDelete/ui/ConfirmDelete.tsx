import type { FC } from "react";

import style from "./ConfirmDelete.module.css";
import { Button } from "../../";

interface ConfrimDeleteProps {
  handleDelete: () => void;
  hidePopup: () => void;
}

const ConfirmDelete: FC<ConfrimDeleteProps> = ({ handleDelete, hidePopup }) => {
  const handleWrapperClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) hidePopup();
  };

  return (
    <div className={style.Wrapper} onClick={handleWrapperClick}>
      <div className={style.Body}>
        <h3 className={style.Title}>Confirm delete?</h3>
        <div className={style.Buttons}>
          <Button onClick={hidePopup} color="light">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="red">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
