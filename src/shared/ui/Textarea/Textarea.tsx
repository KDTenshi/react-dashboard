import type { FC, TextareaHTMLAttributes } from "react";

import style from "./Textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: FC<TextareaProps> = ({ label, ...props }) => {
  if (props.className) delete props.className;

  return (
    <label className={style.Label}>
      {label}
      <textarea className={style.Textarea} {...props}></textarea>
    </label>
  );
};

export default Textarea;
