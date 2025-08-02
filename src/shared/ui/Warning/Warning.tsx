import { useEffect, type FC } from "react";

import style from "./Warning.module.css";

interface WarningProps {
  message: string;
  isShown: boolean;
  hideWarning: () => void;
}

const Warning: FC<WarningProps> = ({ message, isShown, hideWarning }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isShown) hideWarning();
    }, 2000);

    return () => clearTimeout(timeout);
  });

  return <div className={style.Warning}>{message}</div>;
};

export default Warning;
