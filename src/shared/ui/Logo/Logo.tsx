import type { FC } from "react";

import style from "./Logo.module.css";

interface LogoProps {
  size?: "big" | "small";
}

const Logo: FC<LogoProps> = ({ size = "big" }) => {
  return (
    <h2 className={style.Logo}>
      {size === "big" && "PDashboard"}
      {size === "small" && "PD"}
    </h2>
  );
};

export default Logo;
