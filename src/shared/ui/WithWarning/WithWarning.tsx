import type { FC, PropsWithChildren } from "react";

import style from "./WithWarning.module.css";
import Warning from "../Warning/Warning";

interface WithWarningProps {
  message: string;
  isShown: boolean;
  hideWarning: () => void;
}

const WithWarning: FC<PropsWithChildren<WithWarningProps>> = ({ children, message, isShown, hideWarning }) => {
  return (
    <div className={style.WithWarning}>
      {children}
      {isShown && <Warning text={message} isShown={isShown} hide={hideWarning} />}
    </div>
  );
};

export default WithWarning;
