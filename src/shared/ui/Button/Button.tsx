import type { ButtonHTMLAttributes, FC } from "react";

import style from "./Button.module.css";

type ButtonColor = "light" | "dark" | "red";
type ButtonSize = "big" | "medium" | "small";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  color?: ButtonColor;
  size?: ButtonSize;
}

const buttonColors: { [key in ButtonColor]: string } = {
  light: style.Light,
  dark: style.Dark,
  red: style.Red,
};

const buttonSizes: { [key in ButtonSize]: string } = {
  big: style.Big,
  medium: style.Medium,
  small: style.Small,
};

const Button: FC<ButtonProps> = ({ color = "light", size = "medium", children, type = "button", ...props }) => {
  const className = [buttonColors[color], buttonSizes[size]].join(" ");

  return (
    <button className={className} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
