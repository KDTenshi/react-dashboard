import { type FC, type InputHTMLAttributes } from "react";

import style from "./InputWithWarning.module.css";
import { TextInput, Warning } from "./../";

interface InputWithWarningProps extends InputHTMLAttributes<HTMLInputElement> {
  isWarningShown: boolean;
  hideWarning: () => void;
  warningMessage: string;
  label?: string;
}

const InputWithWarning: FC<InputWithWarningProps> = ({
  isWarningShown,
  hideWarning,
  warningMessage,
  label,
  ...props
}) => {
  return (
    <div className={style.Wrapper}>
      <TextInput label={label} {...props} />
      {isWarningShown && <Warning message={warningMessage} isShown={isWarningShown} hideWarning={hideWarning} />}
    </div>
  );
};

export default InputWithWarning;
