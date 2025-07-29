import { useEffect, type FC } from "react";

import style from "./Warning.module.css";

interface WarningProps {
  text?: string;
  isShown: boolean;
  hide: () => void;
}

const Warning: FC<WarningProps> = ({ text = "Warning!", isShown, hide }) => {
  useEffect(() => {
    if (isShown) {
      setTimeout(() => hide(), 2000);
    }
  }, [isShown, hide]);

  return <div className={style.Warning}>{text}</div>;
};

export default Warning;
