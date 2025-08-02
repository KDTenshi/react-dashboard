import type { FC, InputHTMLAttributes } from "react";

import style from "./TextInput.module.css";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput: FC<TextInputProps> = ({ label, ...props }) => {
  if (props.className) delete props.className;
  if (props.type) delete props.type;

  return (
    <label className={style.Label}>
      {label}
      <input type="text" className={style.Input} {...props} />
    </label>
  );
};

export default TextInput;
